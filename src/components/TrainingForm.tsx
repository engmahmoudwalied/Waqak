"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { GraduationCap } from "lucide-react";
import { z } from "zod";

const trainingSchema = z.object({
  user_name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name too long" }),
  phone_number: z.string().trim().regex(/^01[0-2,5]{1}[0-9]{8}$/, { message: "Invalid Egyptian phone number" }),
  position: z.string().min(1, { message: "Position is required" }),
});

const TrainingForm = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    user_name: "",
    phone_number: "",
    position: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const validation = trainingSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: { [key: string]: string } = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error(language === "ar" ? "يرجى التحقق من البيانات المدخلة" : "Please check your input");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("training_applications")
        .insert([formData]);

      if (error) throw error;

      toast.success(language === "ar" ? "تم إرسال طلبك بنجاح!" : "Your application has been submitted successfully!");
      setFormData({ user_name: "", phone_number: "", position: "" });
    } catch (error: any) {
      toast.error(error.message || (language === "ar" ? "حدث خطأ ما" : "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="training" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {language === "ar" ? "برنامج التدريب" : "Training Program"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "ar"
              ? "انضم إلى برنامج التدريب لدينا وطور مهاراتك في البرمجة"
              : "Join our training program and develop your programming skills"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === "ar" ? "نموذج التقديم للتدريب" : "Training Application Form"}
            </CardTitle>
            <CardDescription>
              {language === "ar"
                ? "املأ النموذج وسنتواصل معك قريباً"
                : "Fill out the form and we'll contact you soon"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="user_name">
                  {language === "ar" ? "الاسم الكامل" : "Full Name"}
                </Label>
                <Input
                  id="user_name"
                  value={formData.user_name}
                  onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                  required
                  placeholder={language === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
                />
                {errors.user_name && (
                  <p className="text-sm text-destructive mt-1">{errors.user_name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number">
                  {language === "ar" ? "رقم الهاتف" : "Phone Number"}
                </Label>
                <Input
                  id="phone_number"
                  type="tel"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  required
                  placeholder={language === "ar" ? "أدخل رقم هاتفك" : "Enter your phone number"}
                  dir="ltr"
                />
                {errors.phone_number && (
                  <p className="text-sm text-destructive mt-1">
                    {language === "ar" ? "رقم الهاتف يجب أن يبدأ بـ 01 ويتكون من 11 رقم" : "Phone must start with 01 and be 11 digits"}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">
                  {language === "ar" ? "التخصص المطلوب" : "Position"}
                </Label>
                <Select
                  value={formData.position}
                  onValueChange={(value) => setFormData({ ...formData, position: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={language === "ar" ? "اختر التخصص" : "Select position"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">
                      {language === "ar" ? "تطوير الواجهات الأمامية (Frontend)" : "Frontend Development"}
                    </SelectItem>
                    <SelectItem value="backend">
                      {language === "ar" ? "تطوير الخلفية (Backend)" : "Backend Development"}
                    </SelectItem>
                    <SelectItem value="fullstack">
                      {language === "ar" ? "تطوير متكامل (Fullstack)" : "Fullstack Development"}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.position && (
                  <p className="text-sm text-destructive mt-1">{errors.position}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading
                  ? (language === "ar" ? "جاري الإرسال..." : "Submitting...")
                  : (language === "ar" ? "إرسال الطلب" : "Submit Application")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TrainingForm;
