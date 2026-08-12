import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <div className="container-apex py-16">
      <div className="mb-10">
        <span className="eyebrow">Legal</span>
        <h1 className="section-heading mt-3">Privacy Policy</h1>
        <p className="mt-2 text-xs text-silver-600">Last updated: August 2026</p>
      </div>
      <div className="max-w-2xl space-y-6 text-sm leading-relaxed text-silver-400">
        <p>
          APEX LTD (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy
          outlines how we collect, use and protect your information when you use our website and services.
        </p>
        <p>
          <strong className="text-white">Information We Collect:</strong> Contact details you provide (name, email,
          phone), order and shipping information, and basic usage data such as pages visited.
        </p>
        <p>
          <strong className="text-white">How We Use It:</strong> To process orders, provide customer support,
          improve our services and, where you&rsquo;ve opted in, send updates about new products and promotions.
        </p>
        <p>
          <strong className="text-white">Data Protection:</strong> We use industry-standard security practices to
          protect your information. We do not sell your personal data to third parties.
        </p>
        <p>
          This is a demonstration storefront; no real customer data is processed or stored on external servers as
          part of this experience.
        </p>
      </div>
    </div>
  );
}
