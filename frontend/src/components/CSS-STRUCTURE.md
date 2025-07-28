# CSS Structure Documentation

## Overview
The CSS files have been organized for better maintainability and easier handling as requested.

## File Structure

### 📁 **Shared CSS Files**

#### `/components/shared-layout.css`
- **Purpose**: Contains styles for Navbar and Footer components
- **Used by**: `Navbar.js`, `Footer.js`
- **Why**: These are layout components that appear on every page and share similar styling patterns

#### `/components/common/common-components.css`
- **Purpose**: Contains styles for utility components (Loading, ErrorMessage, Layout components)
- **Used by**: Components in `/components/common/` folder
- **Why**: These are reusable utility components that appear across different pages

### 📁 **Individual Component CSS Files**

#### Page/Section Components (Each has its own CSS file):
- `Hero.css` → `Hero.js`
- `Features.css` → `Features.js`
- `Testimonials.css` → `Testimonials.js`
- `Community.css` → `Community.js`
- `WhatsHappening.css` → `WhatsHappening.js`

#### Why Individual Files:
- Each represents a distinct page section with unique styling
- Easier to maintain and modify individual sections
- Better for component-based development
- Allows for easier debugging and updates

## Import Structure

### Navbar and Footer:
```javascript
import './shared-layout.css';
```

### Utility Components:
```javascript
import './common/common-components.css';
```

### Individual Components:
```javascript
import './ComponentName.css';
```

## Benefits of This Structure

1. **Easy Maintenance**: Related styles are grouped together
2. **Better Organization**: Clear separation between layout, utility, and component styles
3. **Reduced Duplication**: Shared styles are in one place
4. **Scalability**: Easy to add new components with their own CSS files
5. **Team Development**: Multiple developers can work on different components without conflicts

## Guidelines for Adding New Components

1. **Layout Components** (Navbar, Footer, Sidebar): Add to `shared-layout.css`
2. **Utility Components** (Loading, Modals, Alerts): Add to `common-components.css`
3. **Page/Section Components**: Create individual CSS files
4. **Form Components**: Can have individual CSS files or be grouped if similar

## File Status

### ✅ **Active CSS Files**:
- `shared-layout.css` (Navbar + Footer)
- `common/common-components.css` (Utilities)
- `Hero.css`
- `Features.css`
- `Testimonials.css`
- `Community.css`
- `WhatsHappening.css`

### ❌ **Removed Files**:
- `Navbar.css` (merged into shared-layout.css)
- `Footer.css` (merged into shared-layout.css)
- `Stats.css` (component removed)
- `Stats.js` (replaced with WhatsHappening.js)
