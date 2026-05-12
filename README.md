# AuraCards — Premium anime trading card storefront

A demo **Next.js (App Router)** e-commerce front for anime trading cards: dark neon UI, **Tailwind CSS**, **Framer Motion** animations, client-side cart with **localStorage**, and static product data you can later replace with an API, payment gateway, and admin panel.

## Stack

- [Next.js](https://nextjs.org/) App Router (JavaScript)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Development server       |
| `npm run build` | Production build       |
| `npm run start` | Run production server  |
| `npm run lint`  | ESLint (Next.js rules) |

## Project structure (high level)

- `src/app/` — routes: home, shop, `cards/[id]`, cart, about, contact, `not-found`
- `src/components/` — reusable UI (`Navbar`, `Footer`, `Hero`, `ProductCard`, …)
- `src/data/products.js` — sample catalog (replace with CMS/API later)
- `src/context/CartContext.js` — cart state + `localStorage` persistence
- `public/cards/` — placeholder PNGs; **swap for real card art**

## Extending later

- **Payments:** add API routes or Server Actions and replace the “Checkout (coming soon)” button on the cart page.
- **Admin:** point product CRUD at your database; keep the same product shape (`id`, `name`, `anime`, `rarity`, `tier`, `wave`, `price`, `image`, `description`, `stockStatus`) to avoid UI changes.
- **Auth:** wrap `CartProvider` or cart mutations with your session layer when moving cart off `localStorage`.

## Notes

- TypeScript is intentionally not used, per project requirements.
- There is **no backend** in this repo; all data is static/demo.
