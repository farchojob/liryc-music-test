# 🎵 Lyric Music - Frontend Challenge

A modern, responsive music band discovery application built with Next.js 15, TypeScript, and TailwindCSS. Features a high-fidelity design implementation, advanced filtering, and comprehensive E2E testing.

## 🚀 Features

- **🎨 High-Fidelity Design**: Closely follows the provided Sketch design with accurate dimensions and styling
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop with smooth transitions
- **🔍 Advanced Search & Filtering**: Real-time search with genre filters and localStorage persistence
- **🎭 Dynamic Content**: Band data fetched from JSON with fallback handling
- **🎨 Modern UI**: Professional components with shadcn/ui design system
- **⚡ Performance Optimized**: Built with Next.js 15 App Router and optimized images
- **🧪 Comprehensive Testing**: 220 E2E tests covering all functionality across multiple browsers and devices

## 🛠️ Tech Stack

### Core Technologies

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[TailwindCSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Professional UI components

### State Management & Data

- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching
- **[Zod](https://zod.dev/)** - Runtime type validation

### Testing & Quality

- **[Playwright](https://playwright.dev/)** - End-to-end testing framework
- **[Prettier](https://prettier.io/)** - Code formatting with import sorting
- **[ESLint](https://eslint.org/)** - Code linting
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

## 📦 Installation

**Prerequisites:**

- Node.js 18+
- npm 9+ (recommended package manager)

```bash
# Clone the repository
git clone https://github.com/farchojob/liryc-music-test.git
cd liryc-music-test

# Install dependencies (uses npm exclusively)
npm install

# Install Playwright browsers (for testing)
npx playwright install
```

> **Note:** This project uses **npm** as the package manager. Please avoid mixing with yarn or pnpm to prevent dependency conflicts.

## 🏃‍♂️ Getting Started

### Development Server

```bash
# Start the development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm run start
```

## 🎨 Code Formatting

This project uses Prettier for consistent code formatting with automatic import sorting and Tailwind class organization.

### Available Commands

```bash
# Format all files
npm run format

# Check formatting without making changes
npm run format:check

# Format specific files (used by git hooks)
npm run format:staged
```

### Editor Integration

The project includes VS Code settings for automatic formatting on save. Install the Prettier extension for the best experience.

## 🧪 Testing

### E2E Testing with Playwright

I have implemented comprehensive end-to-end testing with **220 tests** covering all functionality across multiple browsers and devices:

#### Test Suites

**43 unique test scenarios** running across **5 browsers/devices** = **220 total test executions**

1. **Basic Functionality (6 tests)**
   - Band loading from JSON
   - Real-time search functionality
   - Genre filtering system
   - Combined search + genre filters
   - Image loading with fallbacks
   - Search state maintenance

2. **Responsive Design (8 tests)**
   - Mobile sidebar with hamburger menu
   - Desktop genre pills visibility
   - Tablet breakpoint behavior
   - Grid layout responsiveness
   - Action icons visibility rules

3. **Right Panel (10 tests)**
   - Open/close functionality
   - Content area expansion
   - State persistence during navigation
   - Promo section display
   - Keyboard accessibility

4. **Navigation (10 tests)**
   - Band detail page navigation
   - Back button functionality
   - Filter state preservation
   - Browser history handling
   - Direct URL access

5. **State Persistence (9 tests)**
   - Filter persistence in localStorage
   - Search query persistence
   - Combined filters persistence
   - Data corruption handling
   - Cross-tab synchronization

#### Running Tests

```bash
# Run all tests headlessly
npm run test:e2e

# Run tests with interactive UI
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests step by step
npm run test:e2e:debug

# Run specific test file
npx playwright test basic-functionality.spec.ts

# Run tests on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

#### Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

#### Browser Support

Tests run on multiple browsers and devices:

- **Desktop**: Chrome, Firefox, Safari
- **Mobile**: Chrome (Pixel 5), Safari (iPhone 12)

## 📁 Project Structure

```
liryc-music/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── api/              # API routes for band data
│   │   ├── band/[id]/        # Dynamic band detail pages
│   │   ├── globals.css       # Global styles and CSS variables
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/           # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── AppLayout.tsx     # Main layout wrapper
│   │   ├── BandCard.tsx      # Individual band card
│   │   ├── BandGrid.tsx      # Band grid container
│   │   ├── BrandMark.tsx     # Logo component
│   │   ├── ClientOnly.tsx    # Hydration helper
│   │   ├── GenrePill.tsx     # Genre filter pills
│   │   ├── HeaderBar.tsx     # Top navigation
│   │   ├── MobileSidebar.tsx # Mobile navigation
│   │   └── RightPanel.tsx    # Side panel
│   ├── hooks/                # Custom React hooks
│   ├── store/                # Zustand stores
│   │   ├── filters.ts        # Filter state management
│   │   └── ui.ts             # UI state management
│   └── types/                # TypeScript type definitions
├── tests/                    # Playwright E2E tests
│   ├── basic-functionality.spec.ts
│   ├── responsive-design.spec.ts
│   ├── right-panel.spec.ts
│   ├── navigation.spec.ts
│   ├── persistence.spec.ts
│   └── README.md            # Test documentation
├── mock_data/               # JSON data files
├── sources/                 # Image assets
└── public/                  # Static assets
```

## 🎨 Design System

### Colors

- **Primary**: `rgba(0, 114, 100, 1)` - Accent color for active states
- **Background**: Dark theme with professional contrast
- **Text**: Hierarchical with muted variants (`#9c9c9c` for secondary text)
- **Panel**: `rgba(15, 15, 15, 1)` for cards and panels

### Typography

- **Font Family**: Inter (Regular 400, Bold 700) loaded via Next.js font optimization
- **Band Names**: Inter-Bold for emphasis
- **Album Names & Body Text**: Inter-Regular for readability
- **Genre Pills**: Inter-Regular with 18px font size
- **Responsive Scaling**: CSS variables for consistent sizing

### Spacing & Layout

- **Grid**: Responsive CSS Grid with breakpoints
- **Breakpoints**: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- **Border Radius**: Consistent 10px for cards, 18px for inputs

## 📱 Responsive Behavior

### Mobile (< 1024px)

- Hamburger menu with sidebar navigation
- Single column band grid
- Simplified header layout
- Touch-optimized interactions

### Tablet (1024px - 1279px)

- Genre pills visible
- Two-column band grid
- Responsive right panel

### Desktop (≥ 1280px)

- Full feature set visible
- Three-column band grid
- Action icons in header
- Optimal layout spacing

## 🚀 Performance Features

- **Image Optimization**: Next.js Image component with fallbacks
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components and images loaded on demand
- **Caching**: TanStack Query for data caching
- **Bundle Optimization**: Tree shaking and minification

## 🧩 Key Components

### BandCard

Individual band display with image, name, album, and description.

### HeaderBar

Top navigation with logo, search, genre filters, and action icons.

### MobileSidebar

Collapsible sidebar for mobile navigation with genre filters.

### RightPanel

Side panel with welcome content and promotional section.

### BandGrid

Responsive grid container for band cards with filtering logic.

## 🔄 State Management

### Filters Store (Zustand + localStorage)

- Genre selection
- Search query
- Persistent across sessions

### UI Store (Zustand)

- Right panel visibility
- Responsive behavior state

## 🐛 Troubleshooting

### Common Issues

1. **Tests failing**
   - Ensure dev server is running: `npm run dev`
   - Check browser installation: `npx playwright install`

2. **Images not loading**
   - Verify image files exist in `/sources/` directory
   - Check fallback to `default.png`

3. **Hydration errors**
   - Components using localStorage are wrapped in `ClientOnly`
   - Zustand stores handle SSR properly

### Debug Mode

```bash
# Run specific test in debug mode
npm run test:e2e:debug -- basic-functionality.spec.ts

# Enable verbose logging
DEBUG=pw:api npm run test:e2e
```

## 🎯 Challenge Requirements Met

✅ **Layout Structure**: Left band list, search bar, filters, right panel
✅ **Data Fetching**: Dynamic loading from JSON with fallbacks
✅ **Search & Filters**: Real-time filtering with genre selection
✅ **Responsive Design**: Mobile, tablet, and desktop optimized
✅ **Image Handling**: ID-based mapping with fallback system
✅ **Icons**: Professional icon set with consistent styling
✅ **Static Content**: Right panel with placeholder content
✅ **Stretch Goals**: Panel toggle, state persistence, navigation
✅ **Plus**: Comprehensive E2E testing with Playwright
