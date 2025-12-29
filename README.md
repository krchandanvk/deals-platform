# DealsHub - All-in-One Deals & Affiliate Platform

A modern, full-stack deals and affiliate platform built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

- **Product Catalog**: Browse deals across multiple categories
- **Category Organization**: Electronics, Software, Digital Tools, Fashion, Food, Services
- **Featured Deals**: Highlight the best offers
- **Product Details**: Detailed view with images, descriptions, and pricing
- **Affiliate Links**: Track clicks and redirect to partner websites
- **Responsive Design**: Mobile-first, works on all devices
- **Modern UI**: Clean, professional interface with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Hosting**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone or Setup the Project

The project has been created in the `deals-platform` directory.

### 2. Install Dependencies

```bash
cd deals-platform
npm install
```

### 3. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Navigate to the SQL Editor in your Supabase dashboard
3. Run the migration file located at `supabase/migrations/001_initial_schema.sql`
4. This will create all necessary tables and insert sample data
5. Get your project URL and anon key from Settings → API

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can use the `.env.local.example` file as a template.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
deals-platform/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── about/           # About page
│   │   ├── best-deals-today/# Best deals page
│   │   ├── categories/      # Categories listing
│   │   ├── category/[slug]/ # Category detail page
│   │   ├── contact/         # Contact page
│   │   ├── product/[slug]/  # Product detail page
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── CategoryCard.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── ProductCard.tsx
│   ├── lib/                 # Utilities
│   │   └── supabase.ts      # Supabase client
│   └── types/               # TypeScript types
│       └── index.ts
├── supabase/
│   └── migrations/          # Database migrations
│       └── 001_initial_schema.sql
└── public/                  # Static assets
```

## 🗄️ Database Schema

### Categories
- `id`: UUID (Primary Key)
- `name`: Category name
- `slug`: URL-friendly slug
- `icon`: Icon identifier
- `description`: Category description

### Products
- `id`: UUID (Primary Key)
- `title`: Product title
- `slug`: URL-friendly slug
- `category_id`: Foreign key to categories
- `description`: Product description
- `image_url`: Product image URL
- `original_price`: Original price
- `discount_price`: Discounted price
- `link_url`: Affiliate/buy link
- `link_type`: 'affiliate' or 'buy'
- `is_featured`: Featured flag
- `status`: 'active', 'inactive', or 'expired'
- `expiry_date`: Deal expiration date

### Clicks
- `id`: UUID (Primary Key)
- `product_id`: Foreign key to products
- `clicked_at`: Timestamp
- `source`: Traffic source
- `user_agent`: User agent string
- `ip_address`: Visitor IP address

## 🎨 Features Overview

### User Features
- Browse products by category
- View product details with images and pricing
- See discount percentages and savings
- Click to visit affiliate/partner websites
- Filter and sort deals
- Responsive mobile-friendly design

### Pages
- **Home**: Featured deals, categories, and latest offers
- **Categories**: Browse all categories with deal counts
- **Category Detail**: View all deals in a specific category
- **Product Detail**: Full product information and CTA
- **Best Deals Today**: Deals sorted by discount percentage
- **About**: Information about the platform
- **Contact**: Contact form and information

## 🔧 Future Enhancements

- [ ] Admin Dashboard for content management
- [ ] Click tracking and analytics
- [ ] Search functionality
- [ ] Advanced filtering and sorting
- [ ] Google Sheets integration for bulk uploads
- [ ] User authentication and favorites
- [ ] Email notifications for new deals
- [ ] Social sharing features
- [ ] SEO optimization (sitemap, meta tags)
- [ ] Performance optimization

## 📱 Responsive Design

The platform is fully responsive and works on:
- Desktop (1280px+)
- Tablet (768px - 1279px)
- Mobile (320px - 767px)

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your project in Vercel
3. Add environment variables
4. Deploy!

The platform is optimized for Vercel with automatic builds and deployments.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📧 Support

For questions or support, please contact:
- Email: contact@dealshub.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/deals-platform/issues)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database by [Supabase](https://supabase.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**Happy Deal Hunting! 🎉**