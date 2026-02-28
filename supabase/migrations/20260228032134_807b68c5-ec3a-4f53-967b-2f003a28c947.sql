
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_mn TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_mn TEXT NOT NULL DEFAULT '',
    description_en TEXT NOT NULL DEFAULT '',
    icon_url TEXT,
    image_url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Team members table
CREATE TABLE public.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    position_mn TEXT NOT NULL DEFAULT '',
    position_en TEXT NOT NULL DEFAULT '',
    description_mn TEXT NOT NULL DEFAULT '',
    description_en TEXT NOT NULL DEFAULT '',
    image_url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active team members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Admins can manage team members" ON public.team_members FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Partners table
CREATE TABLE public.partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_mn TEXT NOT NULL,
    name_en TEXT NOT NULL,
    logo_url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active partners" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Admins can manage partners" ON public.partners FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON public.partners FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_members;
ALTER PUBLICATION supabase_realtime ADD TABLE public.partners;

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('services', 'services', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('team', 'team', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('partners', 'partners', true);

-- Storage policies
CREATE POLICY "Public read access for services" ON storage.objects FOR SELECT USING (bucket_id = 'services');
CREATE POLICY "Admin upload for services" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'services' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update for services" ON storage.objects FOR UPDATE USING (bucket_id = 'services' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete for services" ON storage.objects FOR DELETE USING (bucket_id = 'services' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public read access for team" ON storage.objects FOR SELECT USING (bucket_id = 'team');
CREATE POLICY "Admin upload for team" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'team' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update for team" ON storage.objects FOR UPDATE USING (bucket_id = 'team' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete for team" ON storage.objects FOR DELETE USING (bucket_id = 'team' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public read access for partners" ON storage.objects FOR SELECT USING (bucket_id = 'partners');
CREATE POLICY "Admin upload for partners" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'partners' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update for partners" ON storage.objects FOR UPDATE USING (bucket_id = 'partners' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete for partners" ON storage.objects FOR DELETE USING (bucket_id = 'partners' AND public.has_role(auth.uid(), 'admin'));

-- Seed initial services data
INSERT INTO public.services (name_mn, name_en, description_mn, description_en, sort_order) VALUES
('Card Processing', 'Card Processing', 'Картын процессинг нь санхүүгийн байгууллагуудад зориулсан цогц төлбөрийн карт боловсруулах платформ юм. Бид олон улсын стандартад нийцсэн, найдвартай, хурдан процессинг системийг санал болгодог.', 'Card processing is a comprehensive payment card processing platform for financial institutions. We offer reliable, fast processing systems that comply with international standards.', 1),
('Card Issuing', 'Card Issuing', 'Санхүүгийн байгууллагуудад зориулсан цогц, үр ашигтай төлбөрийн карт гаргах болон удирдах платформ. Виртуал болон физик карт гаргах, карт удирдлагын бүрэн шийдэл.', 'A comprehensive and efficient platform to issue and manage payment cards for financial institutions. Complete solution for virtual and physical card issuance and card management.', 2),
('Card Acquiring', 'Card Acquiring', 'Худалдааны цэгүүдэд зориулсан дэвшилтэт төлбөр хүлээн авах үйлчилгээ. POS терминал, e-commerce интеграци, QR төлбөр зэрэг олон төрлийн төлбөр хүлээн авах шийдлүүд.', 'Advanced merchant acquiring service for retail points. Multiple payment acceptance solutions including POS terminals, e-commerce integration, and QR payments.', 3),
('Fraud Analyzer', 'Fraud Analyzer', 'Санхүүгийн байгууллагуудыг залилангаас хамгаалах цогц end-to-end fraud management шийдэл. Real-time мониторинг, machine learning дээр суурилсан залилан илрүүлэлт, эрсдэлийн үнэлгээ.', 'Comprehensive end-to-end fraud management solutions to protect cardholders from fraudulent activity and minimize losses. Real-time monitoring, machine learning-based fraud detection, risk assessment.', 4),
('Loyalty', 'Loyalty', 'Бизнесүүдэд хэрэглэгчидтэй бат бөх харилцаа бий болгоход зориулсан loyalty програмын шийдэл. Оноо цуглуулах, урамшуулал, хөнгөлөлтийн менежмент.', 'Build strong customer relationships through customizable loyalty programs, member management, personalized offers, and multi-channel engagement. Points collection, rewards, discount management.', 5);

-- Seed initial team members
INSERT INTO public.team_members (name, position_mn, position_en, description_mn, description_en, sort_order) VALUES
('Б. Батбаяр', 'Гүйцэтгэх захирал', 'CEO', 'Санхүүгийн технологийн салбарт 15+ жилийн туршлагатай.', '15+ years of experience in financial technology.', 1),
('Д. Дэлгэрмаа', 'Технологийн захирал', 'CTO', 'Програм хангамжийн архитектур, системийн дизайны мэргэжилтэн.', 'Expert in software architecture and system design.', 2),
('Г. Ганболд', 'Бизнес хөгжлийн захирал', 'Business Development Director', 'Банк, санхүүгийн салбарт 10+ жилийн туршлагатай.', '10+ years in banking and finance sector.', 3),
('Э. Энхжин', 'Маркетингийн менежер', 'Marketing Manager', 'Дижитал маркетинг, брэнд стратегийн мэргэжилтэн.', 'Specialist in digital marketing and brand strategy.', 4);
