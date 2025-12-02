"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Users, Mail, BarChart3, FileText, Trash2, LogOut, TrendingDown, Wallet, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Header from "@/components/Header";
import ServiceManager from "@/components/ServiceManager";
import ExpenseManager from "@/components/ExpenseManager";
import BudgetManager from "@/components/BudgetManager";
import PortfolioManager from "@/components/PortfolioManager";
import type { User } from "@supabase/supabase-js";

interface Service {
  id: string;
  name: string;
  description: string;
  status: string;
  price: string;
  discount?: string;
  created_at: string;
}

interface TrainingApplication {
  id: string;
  user_name: string;
  phone_number: string;
  position: string;
  created_at: string;
}

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  expense_date: string;
  created_at: string;
}

interface Budget {
  id: string;
  total_budget: number;
  updated_at: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  link: string;
  image_url?: string;
  display_order: number;
}

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [applications, setApplications] = useState<TrainingApplication[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push("/auth");
      return;
    }

    // Check if user has admin role
    const { data: roles, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .eq('role', 'admin')
      .single();

    if (error || !roles) {
      toast.error("ليس لديك صلاحيات الوصول إلى لوحة التحكم");
      await supabase.auth.signOut();
      router.push('/auth');
      return;
    }

    setUser(session.user);
    await loadData();
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [servicesRes, applicationsRes, expensesRes, budgetRes, portfolioRes] = await Promise.all([
        supabase.from("services").select("*").order("created_at", { ascending: false }),
        supabase.from("training_applications").select("*").order("created_at", { ascending: false }),
        supabase.from("expenses").select("*").order("expense_date", { ascending: false }),
        supabase.from("budget").select("*").single(),
        supabase.from("portfolio").select("*").order("display_order", { ascending: true }),
      ]);

      if (servicesRes.error) throw servicesRes.error;
      if (applicationsRes.error) throw applicationsRes.error;
      if (expensesRes.error) throw expensesRes.error;

      setServices(servicesRes.data || []);
      setApplications(applicationsRes.data || []);
      setExpenses(expensesRes.data || []);
      setBudget(budgetRes.data);
      setPortfolioItems(portfolioRes.data || []);
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
      toast.success("تم حذف الخدمة بنجاح");
      loadData();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ في الحذف");
    }
  };

  const handleDeleteApplication = async (id: string) => {
    try {
      const { error } = await supabase.from("training_applications").delete().eq("id", id);
      if (error) throw error;
      toast.success("تم حذف الطلب بنجاح");
      loadData();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ في الحذف");
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      const { error } = await supabase.from("expenses").delete().eq("id", id);
      if (error) throw error;
      toast.success("تم حذف المصروف بنجاح");
      loadData();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ في الحذف");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "نشط": return "bg-green-600";
      case "قيد التطوير": return "bg-yellow-500";
      case "مكتمل": return "bg-primary";
      default: return "bg-muted";
    }
  };

  const getPositionLabel = (position: string) => {
    switch (position) {
      case "frontend": return "Frontend";
      case "backend": return "Backend";
      case "fullstack": return "Fullstack";
      default: return position;
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const availableBudget = (budget?.total_budget || 0) - totalExpenses;

  const topCategories = expenses.reduce((acc: { [key: string]: number }, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const topThreeCategories = Object.entries(topCategories)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">لوحة التحكم</h1>
              <p className="text-muted-foreground">إدارة الخدمات والطلبات</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              تسجيل الخروج
            </Button>
          </div>

          {/* Financial Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">الميزانية الإجمالية</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {(budget?.total_budget || 0).toLocaleString()} ج
                </div>
                <div className="mt-2">
                  <BudgetManager
                    currentBudget={budget?.total_budget || 0}
                    onBudgetUpdated={loadData}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي المصروفات</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  {totalExpenses.toLocaleString()} ج
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {expenses.length} عملية صرف
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المبالغ المتاحة</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${availableBudget >= 0 ? 'text-green-600' : 'text-destructive'}`}>
                  {availableBudget.toLocaleString()} ج
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {availableBudget >= 0 ? 'متاح للصرف' : 'تجاوز الميزانية'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">نسبة الإنفاق</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {budget?.total_budget ? Math.round((totalExpenses / budget.total_budget) * 100) : 0}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  من الميزانية المخصصة
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Top 3 Categories */}
          {topThreeCategories.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">أكثر 3 بنود إنفاقاً</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topThreeCategories.map(([category, amount], index) => (
                    <div key={category} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-yellow-500 text-primary-foreground' :
                          index === 1 ? 'bg-muted text-primary-foreground' :
                          'bg-orange-600 text-primary-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="font-medium">{category}</span>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">{amount.toLocaleString()} ج</div>
                        <div className="text-xs text-muted-foreground">
                          {budget?.total_budget ? Math.round((amount / budget.total_budget) * 100) : 0}% من الميزانية
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي الخدمات</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{services.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">الخدمات النشطة</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {services.filter(s => s.status === "نشط").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">طلبات التدريب</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Expenses Management */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">إدارة المصروفات</CardTitle>
                <ExpenseManager onExpenseAdded={loadData} />
              </div>
            </CardHeader>
            <CardContent>
              {expenses.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  لا توجد مصروفات مسجلة. ابدأ بإضافة مصروف جديد!
                </p>
              ) : (
                <div className="space-y-4">
                  {expenses.map((expense) => (
                    <div key={expense.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge>{expense.category}</Badge>
                            <span className="font-bold text-lg text-red-600">
                              {expense.amount.toLocaleString()} ج
                            </span>
                          </div>
                          {expense.description && (
                            <p className="text-sm text-muted-foreground">{expense.description}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteExpense(expense.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        تاريخ الصرف: {new Date(expense.expense_date).toLocaleDateString("ar-EG")}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Services Management */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">إدارة الخدمات</CardTitle>
                <ServiceManager onServiceAdded={loadData} />
              </div>
            </CardHeader>
            <CardContent>
              {services.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  لا توجد خدمات حالياً. ابدأ بإضافة خدمة جديدة!
                </p>
              ) : (
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStatusColor(service.status)} text-white`}>
                            {service.status}
                          </Badge>
                          <ServiceManager
                            mode="edit"
                            service={service}
                            onServiceAdded={loadData}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-2">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-primary">{service.price}</span>
                          {service.discount && service.discount !== "0" && (
                            <span className="text-sm text-green-600 mr-2">
                              (خصم: {service.discount})
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(service.created_at).toLocaleDateString("ar-EG")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Training Applications */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">طلبات التدريب</CardTitle>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  لا توجد طلبات تدريب حالياً
                </p>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{app.user_name}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteApplication(app.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">الهاتف: </span>
                          <span dir="ltr">{app.phone_number}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">التخصص: </span>
                          <Badge variant="outline">{getPositionLabel(app.position)}</Badge>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">تاريخ التقديم: </span>
                          <span>{new Date(app.created_at).toLocaleDateString("ar-EG")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Portfolio Management */}
          <PortfolioManager
            portfolioItems={portfolioItems}
            onUpdate={loadData}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;