# E2E Testing with Playwright

This directory contains comprehensive end-to-end tests for the Lyric Music application using Playwright.

## Test Structure

### 📁 Test Files

- **`basic-functionality.spec.ts`** - Core features testing
  - Band loading from JSON
  - Search functionality
  - Genre filtering
  - Combined filters
  - Image fallbacks

- **`responsive-design.spec.ts`** - Responsive layout testing
  - Mobile sidebar behavior
  - Tablet/desktop layouts
  - Breakpoint transitions
  - Grid responsiveness

- **`right-panel.spec.ts`** - Right panel functionality
  - Open/close behavior
  - Content expansion
  - State persistence
  - Keyboard navigation

- **`navigation.spec.ts`** - Page navigation testing
  - Band detail navigation
  - Back button functionality
  - Filter state preservation
  - Browser history

- **`persistence.spec.ts`** - State persistence testing
  - localStorage functionality
  - Cross-tab synchronization
  - Data corruption handling
  - Mobile sidebar persistence

## 🚀 Running Tests

### Prerequisites

```bash
# Install dependencies (if not already done)
npm install

# Install Playwright browsers (if not already done)
npx playwright install
```

### Test Commands

```bash
# Run all tests headlessly
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests step by step
npm run test:e2e:debug

# Run specific test file
npx playwright test basic-functionality.spec.ts

# Run tests on specific browser
npx playwright test --project=chromium
npx playwright test --project=webkit
npx playwright test --project=firefox
```

## 🎯 Test Coverage

### ✅ Core Features

- [x] Band data loading and display
- [x] Real-time search functionality
- [x] Genre filtering system
- [x] Combined search + genre filters
- [x] Image loading with fallbacks
- [x] Error handling

### 📱 Responsive Design

- [x] Mobile sidebar with hamburger menu
- [x] Desktop genre pills visibility
- [x] Tablet breakpoint behavior
- [x] Grid layout responsiveness
- [x] Action icons visibility rules

### 🔄 User Interactions

- [x] Right panel open/close functionality
- [x] Content area expansion
- [x] Navigation to band details
- [x] Back button behavior
- [x] Keyboard accessibility

### 💾 State Management

- [x] Filter persistence in localStorage
- [x] UI state persistence
- [x] Cross-tab synchronization
- [x] Graceful error handling
- [x] Hydration flash prevention

## 🌐 Browser Support

Tests run on multiple browsers and devices:

- **Desktop**: Chrome, Firefox, Safari
- **Mobile**: Chrome (Pixel 5), Safari (iPhone 12)

## 📊 Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

## 🔧 Configuration

Test configuration is in `playwright.config.ts`:

- **Base URL**: `http://localhost:3000`
- **Timeout**: 30 seconds per test
- **Retries**: 2 on CI, 0 locally
- **Screenshots**: On failure only
- **Videos**: Retained on failure
- **Traces**: On first retry

## 🎨 Test Data Attributes

Components use `data-testid` attributes for reliable element selection:

```typescript
// Examples
'[data-testid="band-card"]';
'[data-testid="genre-pills"]';
'[data-testid="mobile-sidebar"]';
'[data-testid="right-panel"]';
'[data-testid="action-icons"]';
```

## 🚨 Troubleshooting

### Common Issues

1. **Tests timing out**
   - Ensure dev server is running (`npm run dev`)
   - Check network connectivity
   - Increase timeout in test if needed

2. **Element not found**
   - Verify `data-testid` attributes exist
   - Check if element is conditionally rendered
   - Wait for proper loading states

3. **Flaky tests**
   - Add proper wait conditions
   - Use `page.waitForSelector()` for dynamic content
   - Avoid hard-coded timeouts

### Debug Mode

Use debug mode to step through tests:

```bash
npm run test:e2e:debug
```

This opens the Playwright Inspector where you can:

- Step through each action
- Inspect page state
- Modify selectors
- View console logs

## 📈 Best Practices

1. **Wait for Elements**: Always wait for elements to be visible before interacting
2. **Unique Selectors**: Use `data-testid` for reliable element selection
3. **Realistic User Flows**: Test actual user scenarios, not just technical functionality
4. **Cross-Browser Testing**: Ensure tests pass on all supported browsers
5. **Mobile Testing**: Include mobile-specific test scenarios

## 🎯 Future Enhancements

Potential areas for additional testing:

- [ ] Visual regression testing with screenshots
- [ ] Performance testing (Core Web Vitals)
- [ ] Accessibility testing (a11y)
- [ ] API mocking for edge cases
- [ ] CI/CD integration
- [ ] Parallel test execution optimization
