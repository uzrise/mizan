# Project Structure

This document describes the project structure following senior Frontend developer best practices.

## 📁 Folder Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout with TranslationProvider
│   ├── page.js            # Home page
│   └── globals.css        # Global styles
│
├── components/            # React components
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── sections/         # Page sections (Hero, ProjectShowcase, etc.)
│   ├── ui/               # Reusable UI components (Button, etc.)
│   └── common/           # Common/shared components (IntroAnimation, etc.)
│
├── contexts/             # React contexts
│   └── TranslationContext.jsx
│
├── translations/         # i18n translation files
│   ├── ru.js            # Russian translations
│   ├── en.js            # English translations
│   ├── uz.js            # Uzbek translations
│   ├── tr.js            # Turkish translations
│   └── index.js         # Translation utilities
│
├── hooks/               # Custom React hooks
│   └── index.js         # Hook exports
│
├── utils/               # Utility functions
│   └── index.js         # Helper functions
│
├── constants/           # Application constants
│   └── index.js         # Constants (colors, breakpoints, etc.)
│
└── public/              # Static assets
    └── images/          # Image files
```

## 🎯 Best Practices Implemented

### 1. **Component Organization**
- **Layout components** (`components/layout/`): Components that appear on every page (Navbar, Footer)
- **Section components** (`components/sections/`): Page-specific sections (Hero, ProjectShowcase, etc.)
- **UI components** (`components/ui/`): Reusable, generic UI components (Button, etc.)
- **Common components** (`components/common/`): Shared components used across the app

### 2. **Internationalization (i18n)**
- All translations are centralized in `translations/` folder
- Support for 4 languages: RU, EN, UZ, TR
- Translation context provides `t()` function for easy access
- Language preference is saved in localStorage

### 3. **Code Organization**
- **Constants**: Centralized in `constants/` folder
- **Utilities**: Reusable functions in `utils/` folder
- **Hooks**: Custom hooks in `hooks/` folder
- **Contexts**: React contexts in `contexts/` folder

### 4. **Scalability**
- Easy to add new pages: Create new route in `app/` folder
- Easy to add new sections: Add to `components/sections/`
- Easy to add new translations: Update files in `translations/`
- Easy to add new languages: Add new translation file and update constants

## 📝 Adding New Pages

To add a new page (e.g., `/about`):

1. Create `app/about/page.js`:
```javascript
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      {/* Your content */}
      <Footer />
    </main>
  );
}
```

2. Add translations to `translations/*.js`:
```javascript
// translations/ru.js
export const ru = {
  // ... existing
  about: {
    title: 'О нас',
    // ...
  },
};
```

## 🔧 Adding New Components

1. **Layout component**: Add to `components/layout/`
2. **Section component**: Add to `components/sections/`
3. **UI component**: Add to `components/ui/`
4. **Common component**: Add to `components/common/`

## 🌍 Adding New Languages

1. Create new translation file: `translations/[lang].js`
2. Export translations object
3. Add language code to `constants/index.js` → `LANGUAGES` array
4. Update `translations/index.js` to include new language

## 📦 Import Paths

Use absolute imports with `@/` prefix:
- `@/components/layout/Navbar`
- `@/components/sections/Hero`
- `@/components/ui/Button`
- `@/contexts/TranslationContext`
- `@/translations`
- `@/utils`
- `@/constants`
- `@/hooks`

## 🎨 Styling

- Use Tailwind CSS only (no inline styles)
- Global styles in `app/globals.css`
- Component-specific styles using Tailwind classes

## 🚀 Performance

- Components are optimized for performance
- Images use Next.js Image component
- Code splitting handled by Next.js automatically
- Translations are loaded on-demand

