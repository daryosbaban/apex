import type { Metadata } from 'next';
import { Phone, MessageCircle, Mail, Instagram, Facebook, MapPin } from 'lucide-react';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the CAATG LTD team — phone, WhatsApp, email and social channels.',
};

const CHANNELS = [
  { icon: Phone, label: 'Phone', value: '+44 7348 258677' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+44 7348 258677' },
  { icon: Mail, label: 'Email', value: 'support@caatgltd.com' },
  { icon: Instagram, label: 'Instagram', value: '@caatgltd' },
  { icon: Facebook, label: 'Facebook', value: '/caatgltd' },
  { icon: MapPin, label: 'Location', value: '174 Cartmell Drive, Leeds, LS15 0AS, UK' },
];

export default function ContactPage() {
  return (
    <div className="container-apex py-16">
      <div className="mb-12 text-center">
        <span className="eyebrow">We&rsquo;d Love to Hear From You</span>
        <h1 className="section-heading mt-3">Contact CAATG LTD</h1>
        <p className="mx-auto mt-4 max-w-lg text-sm text-silver-500">
          Questions about an order, a product, or a partnership? Reach out through the form below or any of our
          direct channels.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_420px]">
        <div className="card-elevated p-7 sm:p-9">
          <h2 className="mb-6 font-display text-lg font-semibold text-white">Send Us a Message</h2>
          <ContactForm />
        </div>

        <div className="flex flex-col gap-4">
          {CHANNELS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 border border-white/10 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-700/30 text-gold-400">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest2 text-silver-500">{label}</p>
                <p className="mt-0.5 text-sm text-white">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
