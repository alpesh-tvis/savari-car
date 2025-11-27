-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_id TEXT NOT NULL,
  vehicle_name TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  pickup_location TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  return_date DATE NOT NULL,
  rental_days INTEGER NOT NULL,
  price_per_day DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Check-in phase data
  checkin_fuel_level INTEGER,
  checkin_mileage INTEGER,
  checkin_signature TEXT,
  checkin_completed_at TIMESTAMPTZ,
  
  -- Check-out phase data
  checkout_fuel_level INTEGER,
  checkout_mileage INTEGER,
  checkout_signature TEXT,
  checkout_completed_at TIMESTAMPTZ
);

-- Create booking_photos table for vehicle inspection photos
CREATE TABLE public.booking_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  phase TEXT NOT NULL CHECK (phase IN ('checkin', 'checkout')),
  photo_type TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_photos ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for booking_photos
CREATE POLICY "Users can view their own booking photos"
  ON public.booking_photos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.bookings
      WHERE bookings.id = booking_photos.booking_id
      AND bookings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own booking photos"
  ON public.booking_photos FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.bookings
      WHERE bookings.id = booking_photos.booking_id
      AND bookings.user_id = auth.uid()
    )
  );

-- Create storage bucket for booking photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('booking-photos', 'booking-photos', false);

-- Storage policies
CREATE POLICY "Users can upload their own booking photos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'booking-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own booking photos"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'booking-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Update function for bookings
CREATE OR REPLACE FUNCTION public.update_booking_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for automatic timestamp updates
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_booking_updated_at();