# AERI - Applied Engineering Research Institute

A modern web application built with React, TypeScript, and Vite, featuring a comprehensive UI component library and real-time capabilities.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: Supabase Auth integration
- **Routing**: React Router with lazy loading
- **State Management**: React Query for server state
- **Real-time**: Supabase real-time subscriptions
- **Responsive**: Mobile-first design approach
- **Accessibility**: WCAG compliant components

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd aeri-wave-forge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080/aeri-wave-forge/`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── forms/          # Form components
│   └── ...             # Other components
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── App.tsx             # Main app component
├── Routes.tsx          # Routing configuration
└── main.tsx            # Application entry point
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### GitHub Pages (Current Setup)

The project is configured for GitHub Pages deployment with automatic builds on push to main branch.

1. **Set up GitHub Secrets**:
   - `supabase_url`: Your Supabase project URL
   - `supabase_anon_key`: Your Supabase anonymous key

2. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

### Coolify Deployment

1. **Connect your repository** to Coolify
2. **Set environment variables** in Coolify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `BASE_URL` (if deploying to a subdirectory)
3. **Configure build settings**:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node version: 18+

### Other Platforms

The project can be deployed to any static hosting platform:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Firebase Hosting

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `BASE_URL` | Base URL for deployment | No (defaults to `/aeri-wave-forge/`) |

### Customization

- **Theme**: Modify `src/components/theme-provider.tsx`
- **Styling**: Update `tailwind.config.ts`
- **Components**: Add new components in `src/components/`
- **Pages**: Create new pages in `src/pages/`

## 🐛 Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Ensure `.env.local` file exists in root directory
   - Restart development server after adding variables

2. **Build errors**
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npm run lint`

3. **Routing issues**
   - Ensure `BASE_URL` is correctly set for your deployment
   - Check that all routes are properly defined in `Routes.tsx`

### Development Tips

- Use the browser's developer tools to debug
- Check the console for error messages
- Use React Developer Tools extension
- Monitor network requests in browser dev tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm run lint`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ using modern web technologies**
