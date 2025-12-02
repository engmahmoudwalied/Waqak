import { useState, useEffect } from "react";
import { Wallet, Edit } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface BudgetManagerProps {
  currentBudget: number;
  onBudgetUpdated: () => void;
}

const BudgetManager = ({ currentBudget, onBudgetUpdated }: BudgetManagerProps) => {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [budget, setBudget] = useState(currentBudget.toString());

  useEffect(() => {
    setBudget(currentBudget.toString());
  }, [currentBudget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get the first budget record
      const { data: existingBudget } = await supabase
        .from("budget")
        .select("id")
        .single();

      if (existingBudget) {
        const { error } = await supabase
          .from("budget")
          .update({ total_budget: parseFloat(budget) })
          .eq("id", existingBudget.id);

        if (error) throw error;
      }

      toast.success(language === 'ar' ? "تم تحديث الميزانية بنجاح" : "Budget updated successfully");
      setOpen(false);
      onBudgetUpdated();
    } catch (error: any) {
      toast.error(error.message || (language === 'ar' ? "حدث خطأ في التحديث" : "Error updating budget"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          {language === 'ar' ? "تحديث الميزانية" : "Update Budget"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            {language === 'ar' ? "تحديث الميزانية الإجمالية" : "Update Total Budget"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="budget">{language === 'ar' ? "الميزانية الإجمالية (جنيه)" : "Total Budget (EGP)"}</Label>
            <Input
              id="budget"
              type="number"
              step="0.01"
              min="0"
              placeholder={language === 'ar' ? "أدخل الميزانية" : "Enter budget"}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {language === 'ar' ? "إلغاء" : "Cancel"}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (language === 'ar' ? "جاري التحديث..." : "Updating...") : (language === 'ar' ? "تحديث" : "Update")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetManager;
