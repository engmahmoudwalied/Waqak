-- Add discount column to services table
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS discount text DEFAULT '0';

-- Add comment for clarity
COMMENT ON COLUMN public.services.discount IS 'Discount amount or percentage for the service';