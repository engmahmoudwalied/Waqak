-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'نشط',
  price TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create training applications table
CREATE TABLE public.training_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  position TEXT NOT NULL CHECK (position IN ('frontend', 'backend', 'fullstack')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_applications ENABLE ROW LEVEL SECURITY;

-- Services policies - allow public read, but only authenticated users can manage
CREATE POLICY "Anyone can view services"
ON public.services
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert services"
ON public.services
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update services"
ON public.services
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete services"
ON public.services
FOR DELETE
TO authenticated
USING (true);

-- Training applications policies - allow public insert, authenticated can view and delete
CREATE POLICY "Anyone can submit training application"
ON public.training_applications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can view training applications"
ON public.training_applications
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete training applications"
ON public.training_applications
FOR DELETE
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();