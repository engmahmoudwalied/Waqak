"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { autoAssignFirstAdmin } from "@/utils/assignAdminRole";
import { z } from "zod";

const passwordSchema = z.string()
  .min(8, { message: "كلمة المرور يجب أن تتكون من 8 أحرف على الأقل" })
  .regex(/[A-Z]/, { message: "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل" })
  .regex(/[a-z]/, { message: "كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل" })
  .regex(/[0-9]/, { message: "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل" });

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Check if user has admin role before navigating
        checkAdminAndNavigate();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && event === 'SIGNED_IN') {
        // Don't auto-navigate here, let the login handler do it
        return;
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const checkAdminAndNavigate = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id as any)
      .eq('role', 'admin' as any)
      .maybeSingle();

    if (roles) {
      router.push("/dashboard");
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    // Validate password strength for signup
    if (!isLogin) {
      const validation = passwordSchema.safeParse(password);
      if (!validation.success) {
        setPasswordError(validation.error.errors[0].message);
        return;
      }
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        // Auto-assign admin role if no admin exists
        const wasAssigned = await autoAssignFirstAdmin();

        // Wait a moment to ensure role is committed to database
        if (wasAssigned) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        toast.success("تم تسجيل الدخول بنجاح");

        // Navigate to dashboard after role assignment
        router.push("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });
        if (error) throw error;

        // Auto-assign admin role to first user
        const wasAssigned = await autoAssignFirstAdmin();

        // Wait a moment to ensure role is committed to database
        if (wasAssigned) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        toast.success("تم إنشاء الحساب بنجاح");

        // Navigate to dashboard after role assignment
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin ? "أدخل بياناتك للوصول إلى لوحة التحكم" : "أدخل بياناتك لإنشاء حساب جديد"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-sm text-destructive">{passwordError}</p>
              )}
              {!isLogin && !passwordError && (
                <p className="text-xs text-muted-foreground">
                  يجب أن تحتوي على 8 أحرف، حرف كبير، حرف صغير، ورقم
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "جاري التحميل..." : isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline"
            >
              {isLogin ? "ليس لديك حساب؟ إنشاء حساب جديد" : "لديك حساب؟ تسجيل الدخول"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}