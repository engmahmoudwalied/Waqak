import { useState } from "react";
import { Plus, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface ExpenseManagerProps {
  onExpenseAdded: () => void;
}

const ExpenseManager = ({ onExpenseAdded }: ExpenseManagerProps) => {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    expense_date: new Date().toISOString().split('T')[0],
  });

  const categories = [
    { value: "برمجة", label: language === 'ar' ? "برمجة" : "Programming" },
    { value: "تدريب", label: language === 'ar' ? "تدريب" : "Training" },
    { value: "تسويق", label: language === 'ar' ? "تسويق" : "Marketing" },
    { value: "اشتراكات", label: language === 'ar' ? "اشتراكات" : "Subscriptions" },
    { value: "رواتب", label: language === 'ar' ? "رواتب" : "Salaries" },
    { value: "مصروفات إدارية", label: language === 'ar' ? "مصروفات إدارية" : "Administrative" },
    { value: "أخرى", label: language === 'ar' ? "أخرى" : "Other" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("expenses").insert([
        {
          amount: parseFloat(formData.amount),
          category: formData.category,
          description: formData.description,
          expense_date: new Date(formData.expense_date).toISOString(),
        },
      ]);

      if (error) throw error;

      toast.success(language === 'ar' ? "تم إضافة المصروف بنجاح" : "Expense added successfully");
      setFormData({
        amount: "",
        category: "",
        description: "",
        expense_date: new Date().toISOString().split('T')[0],
      });
      setOpen(false);
      onExpenseAdded();
    } catch (error: any) {
      toast.error(error.message || (language === 'ar' ? "حدث خطأ في الإضافة" : "Error adding expense"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {language === 'ar' ? "إضافة مصروف" : "Add Expense"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            {language === 'ar' ? "إضافة مصروف جديد" : "Add New Expense"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">{language === 'ar' ? "المبلغ (جنيه)" : "Amount (EGP)"}</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder={language === 'ar' ? "أدخل المبلغ" : "Enter amount"}
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">{language === 'ar' ? "التصنيف" : "Category"}</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder={language === 'ar' ? "اختر التصنيف" : "Select category"} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense_date">{language === 'ar' ? "تاريخ الصرف" : "Expense Date"}</Label>
            <Input
              id="expense_date"
              type="date"
              value={formData.expense_date}
              onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{language === 'ar' ? "الوصف" : "Description"}</Label>
            <Textarea
              id="description"
              placeholder={language === 'ar' ? "اكتب وصف المصروف..." : "Enter expense description..."}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {language === 'ar' ? "إلغاء" : "Cancel"}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (language === 'ar' ? "جاري الإضافة..." : "Adding...") : (language === 'ar' ? "إضافة" : "Add")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseManager;
