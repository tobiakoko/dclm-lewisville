# DCLM Lewisville Website

Modern church website built with Next.js 14, Sanity CMS, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17.0 or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/dclm-lewisville.git
cd dclm-lewisville
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

4. Run development servers
```bash
# Terminal 1 - Next.js
npm run dev

# Terminal 2 - Sanity Studio
npm run sanity
```

5. Open your browser
- Website: http://localhost:3000
- Sanity Studio: http://localhost:3333

## 📁 Project Structure

```
dclm-lewisville/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utility functions
├── sanity/                 # Sanity CMS configuration
├── public/                 # Static assets
└── ...config files
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **CMS**: Sanity.io
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Email**: Resend
- **Forms**: React Hook Form + Zod

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run sanity` - Start Sanity Studio
- `npm run sanity:deploy` - Deploy Sanity Studio

## 🚢 Deployment

### Deploy to Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Deploy Sanity Studio
```bash
npm run sanity:deploy
```

## 📖 Documentation

For detailed implementation guide, see the implementation artifacts.

## 📧 Contact

For questions or support, contact: info@dclmlewisville.org

## 📄 License

Copyright © 2025 DCLM Lewisville. All rights reserved.