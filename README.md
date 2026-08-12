# APEX LTD

Premium technology and electronics e-commerce storefront, built with Next.js 14 (App Router), TypeScript and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling, with a custom obsidian / charcoal / silver / gold theme
- **React Context** for cart, wishlist, recently viewed and quick view state, persisted to `localStorage`
- **lucide-react** for iconography

## Notable implementation details

- All product imagery is original vector artwork (`ProductArt` component) rather than hotlinked stock photography, so the storefront renders reliably with zero external image dependencies. Swap in real photography by extending `Product` with an `image` field and rendering it inside `ProductArt`/`ProductCard` when present.
- Checkout, account and payment flows are fully designed but simulated — no real payment processor is wired up.
- 58 realistic products across all 10 categories live in `src/lib/products.ts`.

## Structure

- `src/app` — routes (home, shop, product detail, cart, checkout, deals, search, wishlist, about, contact, account, and policy pages)
- `src/components` — shared UI (Navbar, Footer, ProductCard, CartDrawer, QuickViewModal, SearchOverlay, etc.)
- `src/contexts` — Cart / Wishlist / RecentlyViewed / QuickView / Toast providers
- `src/lib` — product/category data and helpers
