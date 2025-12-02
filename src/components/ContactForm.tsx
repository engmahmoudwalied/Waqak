"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "الاسم يجب أن يكون أكثر من حرفين" }).max(100, { message: "الاسم يجب أن يكون أقل من 100 حرف" }),
  email: z.string().trim().email({ message: "البريد الإلكتروني غير صحيح" }).max(255, { message: "البريد الإلكتروني طويل جداً" }),
  phone: z.string().trim().min(10, { message: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل" }).max(15, { message: "رقم الهاتف طويل جداً" }),
  service: z.string().min(1, { message: "يرجى اختيار نوع الخدمة" }),
  budget: z.string().min(1, { message: "يرجى اختيار الميزانية" }),
  message: z.string().trim().min(10, { message: "الرسالة يجب أن تكون 10 أحرف على الأقل" }).max(1000, { message: "الرسالة طويلة جداً" })
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      budget: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Create WhatsApp message
      const whatsappMessage = `
🌟 طلب جديد من موقع واقعك 🌟

👤 الاسم: ${data.name}
📧 البريد الإلكتروني: ${data.email}
📱 رقم الهاتف: ${data.phone}
🛠️ نوع الخدمة: ${data.service}
💰 الميزانية: ${data.budget}

💬 الرسالة:
${data.message}

تم الإرسال من موقع واقعك للبرمجة والحاسوب
      `.trim();

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/201200186404?text=${encodedMessage}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: t('messageSent'),
        description: t('willContactSoon'),
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: t('sendError'),
        description: t('tryAgain'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('contactUs')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contactIntro')}
          </p>
        </div>

        {/* Why Contact Us Section */}
        <div className="max-w-5xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">{t('whyContactUs')}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-card rounded-lg border border-border hover:shadow-elegant transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h4 className="font-semibold text-card-foreground mb-2">{t('contactBenefit1')}</h4>
            </div>
            <div className="text-center p-6 bg-card rounded-lg border border-border hover:shadow-elegant transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="font-semibold text-card-foreground mb-2">{t('contactBenefit2')}</h4>
            </div>
            <div className="text-center p-6 bg-card rounded-lg border border-border hover:shadow-elegant transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-card-foreground mb-2">{t('contactBenefit3')}</h4>
            </div>
            <div className="text-center p-6 bg-card rounded-lg border border-border hover:shadow-elegant transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="font-semibold text-card-foreground mb-2">{t('contactBenefit4')}</h4>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {/* Google Maps */}
          <div className="h-[400px] rounded-lg overflow-hidden shadow-elegant">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220257.4209777908!2d31.0570!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Egypt!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع واقعك للبرمجة والحاسوب - القاهرة، مصر"
              aria-label="خريطة Google لموقع واقعك في القاهرة، مصر"
            />
          </div>

          {/* Contact Card */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl text-primary text-center flex items-center justify-center gap-2">
                <Send className="h-6 w-6" />
                {t('sendMessage')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('name')} *</FormLabel>
                          <FormControl>
                            <Input placeholder={t('fullName')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('phone')} *</FormLabel>
                          <FormControl>
                            <Input placeholder="01XXXXXXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('email')} *</FormLabel>
                        <FormControl>
                          <Input placeholder="example@email.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('serviceType')} *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('selectService')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="website">{t('website')}</SelectItem>
                              <SelectItem value="mobile-app">{t('mobileApp')}</SelectItem>
                              <SelectItem value="ecommerce">{t('ecommerceStore')}</SelectItem>
                              <SelectItem value="system">{t('managementSystem')}</SelectItem>
                              <SelectItem value="maintenance">{t('maintenance')}</SelectItem>
                              <SelectItem value="consultation">{t('consultation')}</SelectItem>
                              <SelectItem value="other">{t('other')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('budget')} *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('selectBudget')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="under-5k">{t('under5k')}</SelectItem>
                              <SelectItem value="5k-15k">{t('budget5k15k')}</SelectItem>
                              <SelectItem value="15k-30k">{t('budget15k30k')}</SelectItem>
                              <SelectItem value="30k-50k">{t('budget30k50k')}</SelectItem>
                              <SelectItem value="over-50k">{t('over50k')}</SelectItem>
                              <SelectItem value="discuss">{t('discuss')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('projectDetails')} *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t('projectDetailsPlaceholder')}
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full shadow-glow"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('sendingMessage') : t('sendMessageBtn')}
                    <Phone className="mr-2 h-5 w-5" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Company NAP Info for Local SEO */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="font-semibold text-primary mb-2">{t('companyFullName')}</h3>
              <p className="text-sm text-muted-foreground">Waquek - Waqak Programming Company</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="font-semibold text-primary mb-2">{t('address')}</h3>
              <p className="text-sm text-muted-foreground">{t('addressValue')}</p>
              <p className="text-xs text-muted-foreground">Cairo, Egypt 11511</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="font-semibold text-primary mb-2">{t('contactInfo')}</h3>
              <p className="text-sm text-muted-foreground">
                <a href="tel:+201200186404" className="hover:text-primary">+20 120 018 6404</a>
              </p>
              <p className="text-xs text-muted-foreground">
                <a href="mailto:info@waqeak.com" className="hover:text-primary">info@waqeak.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;