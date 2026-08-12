import { ShieldCheck, Tag, Lock, Truck, Headset } from 'lucide-react';

const ITEMS = [
  { icon: ShieldCheck, label: 'Authentic Products', desc: '100% genuine, sourced from authorized distributors' },
  { icon: Tag, label: 'Competitive Prices', desc: 'Transparent pricing with regular exclusive deals' },
  { icon: Lock, label: 'Secure Shopping', desc: 'Encrypted checkout and protected transactions' },
  { icon: Truck, label: 'Fast Delivery', desc: 'Express shipping across the country' },
  { icon: Headset, label: 'Customer Support', desc: 'Dedicated support team, ready to help' },
];

export function TrustBar() {
  return (
    <section className="border-y border-white/[0.06] bg-charcoal/60">
      <div className="container-apex grid grid-cols-2 gap-8 py-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {ITEMS.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex flex-col items-center gap-3 text-center lg:flex-row lg:items-start lg:text-left">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-700/30 text-gold-400">
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="mt-0.5 hidden text-xs text-silver-500 lg:block">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
