import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  name: string;
  description: string;
  status: string;
  price: string;
  discount?: string;
  created_at: string;
}

interface ServiceManagerProps {
  onServiceAdded: () => void;
  service?: Service | null;
  mode?: 'add' | 'edit';
}

const ServiceManager = ({ onServiceAdded, service = null, mode = 'add' }: ServiceManagerProps) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(
    service?.created_at ? new Date(service.created_at) : new Date()
  );
  const [formData, setFormData] = useState({
    name: service?.name || "",
    description: service?.description || "",
    status: service?.status || "نشط",
    price: service?.price || "",
    discount: service?.discount || "0",
  });
  const [loading, setLoading] = useState(false);

  // Update form data when service prop changes
  useState(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        status: service.status,
        price: service.price,
        discount: service.discount || "0",
      });
      setSelectedDate(new Date(service.created_at));
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSave = {
        ...formData,
        created_at: selectedDate.toISOString(),
      };

      if (mode === 'edit' && service) {
        const { error } = await supabase
          .from("services")
          .update(dataToSave)
          .eq('id', service.id);

        if (error) throw error;
        toast.success("تم تعديل الخدمة بنجاح");
      } else {
        const { error } = await supabase.from("services").insert([dataToSave]);
        if (error) throw error;
        toast.success("تم إضافة الخدمة بنجاح");
      }

      setFormData({ name: "", description: "", status: "نشط", price: "", discount: "0" });
      setSelectedDate(new Date());
      setOpen(false);
      onServiceAdded();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === 'edit' ? (
          <Button variant="ghost" size="sm">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            إضافة خدمة
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">اسم الخدمة</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">الوصف</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">الحالة</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="نشط">نشط</SelectItem>
                <SelectItem value="قيد التطوير">قيد التطوير</SelectItem>
                <SelectItem value="مكتمل">مكتمل</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">السعر</Label>
            <Input
              id="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              placeholder="مثال: 15,000 جنيه"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount">الخصم</Label>
            <Input
              id="discount"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
              placeholder="مثال: 10% أو 1000 جنيه"
            />
          </div>

          <div className="space-y-2">
            <Label>التاريخ</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP", { locale: ar }) : "اختر التاريخ"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                  locale={ar}
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">
              💡 نصيحة: الحالة "مكتمل" = مبلغ مصروف، الحالة "نشط" = مبلغ متاح
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (mode === 'edit' ? "جاري التعديل..." : "جاري الإضافة...") : (mode === 'edit' ? "تعديل الخدمة" : "إضافة الخدمة")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceManager;
