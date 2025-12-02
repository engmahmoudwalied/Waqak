import { supabase } from "@/integrations/supabase/client";

/**
 * Auto-assign admin role to the currently logged-in user if no admins exist
 * This is useful for the first user signup
 */
export const autoAssignFirstAdmin = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    // Check if any admin exists
    const { data: existingAdmins, error: checkError } = await supabase
      .from('user_roles')
      .select('id')
      .eq('role', 'admin')
      .limit(1);

    if (checkError) throw checkError;

    // If no admins exist, make this user an admin
    if (!existingAdmins || existingAdmins.length === 0) {
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({ 
          user_id: user.id, 
          role: 'admin' 
        });

      if (insertError) throw insertError;
      
      console.log("First admin assigned successfully");
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error auto-assigning admin:", error);
    return false;
  }
};
