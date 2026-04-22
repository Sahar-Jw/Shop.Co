
## Shop.Co - Modern E-Commerce Clothing Store

### Overview
Shop.Co is a fully responsive e-commerce website built for browsing, shopping, and purchasing clothing items from international brands like Versace, Zara, Gucci, Prada, and more. It features a modern, user-friendly interface with product catalogs, filtering, shopping cart functionality, user authentication, and multi-language support. Data is fetched from the [Fake Store API](https://fakestoreapi.com/) for products and categories, making it ideal for demos or portfolio projects.

### Key Features
- **Product Browsing**: Home page showcases New Arrivals, Top Rated, and Top Selling products with skeleton loading states.
- **Shop & Filtering**: Category-based browsing (e.g., men's clothing, jewelry), price range, rating filters, and mobile-friendly filter drawer.
- **Product Cards**: Detailed cards with images, prices, ratings (stars), and quick links to individual products.
- **Shopping Cart**: Add/remove items, update quantities, calculate totals, and checkout simulation.
- **User Authentication**: Sign In / Sign Up pages with AuthContext integration.
- **Multi-Language Support**: i18next-powered internationalization via LanguageContext.
- **Testimonials & Brands**: Customer reviews slider and brand logos showcase.
- **Responsive Design**: Mobile-first with Tailwind CSS, works on all devices.
- **Fast Loading**: Skeleton loaders for smooth UX during data fetching.
- **Pages**: Home, Shop, Product Details, Cart, About, Contact, Sign In, Sign Up.

### Tech Stack & Libraries
- **Frontend**: React 19 + React Router 7 (SPA routing)
- **Build Tool**: Vite (fast dev server & builds)
- **Styling**: Tailwind CSS 4 + Tailwind Vite plugin
- **State Management**: React Context API (Products, Cart, Auth)
- **UI Components**: Swiper (sliders), React Icons, React Loading Skeleton, React Toastify (notifications)
- **Linting**: ESLint 9 with React hooks rules
- **Other**: FakeStoreAPI integration, custom React hooks

### Quick Start
1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
3. Build for production: `npm run build`
4. Preview build: `npm run preview`

This project demonstrates modern React best practices, context-based state management, API integration, and responsive e-commerce UI patterns. Star it on GitHub if you find it useful! 🚀
