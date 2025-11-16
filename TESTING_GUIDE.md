# Mobile Responsive Testing Guide

## Quick Test Checklist

### 1. **Desktop Testing (Chrome/Firefox/Edge)**
Open browser DevTools (F12) and toggle Device Toolbar (Ctrl+Shift+M)

**Test on these device presets:**
- [ ] iPhone SE (375 x 667)
- [ ] iPhone 12 Pro (390 x 844)
- [ ] Samsung Galaxy S20 Ultra (412 x 915)
- [ ] iPad (768 x 1024)
- [ ] iPad Pro (1024 x 1366)

### 2. **Things to Check on Mobile**

#### Header & Navigation
- [ ] Logo displays properly sized
- [ ] Call buttons are visible and clickable
- [ ] Menu toggle (hamburger) button works
- [ ] Menu slides in from left smoothly
- [ ] Dark overlay appears behind menu
- [ ] Menu closes when clicking overlay
- [ ] Menu closes when clicking a link
- [ ] Theme toggle button is accessible
- [ ] Music player button is accessible

#### Content Layout
- [ ] All text is readable without zooming
- [ ] Images scale properly
- [ ] Image slider works with touch swipes
- [ ] Product/menu cards stack in single column
- [ ] Spacing between elements is adequate
- [ ] No horizontal scrolling

#### Interactive Elements
- [ ] All buttons are easy to tap (min 44x44px)
- [ ] Links have enough spacing
- [ ] Forms are easy to fill out
- [ ] WhatsApp button is accessible
- [ ] Call buttons work correctly
- [ ] Image zoom works on tap

#### Footer
- [ ] Footer sections stack properly
- [ ] All footer links are tappable
- [ ] Contact information is readable

### 3. **Actual Device Testing**

**If you have real devices, test on:**
- [ ] Your personal smartphone
- [ ] A tablet if available
- [ ] Different orientations (portrait/landscape)

### 4. **Functionality Testing**

#### Navigation
1. Tap hamburger menu → Should slide in from left
2. Tap outside menu → Should close
3. Tap a menu link → Should navigate and close menu
4. Press ESC key → Should close menu

#### WhatsApp Integration
1. Tap WhatsApp float button → Should open WhatsApp
2. Tap "Order Now" on products → Should open WhatsApp with product name
3. Submit order form → Should open WhatsApp with details

#### Forms
1. Fill out contact form → All fields should be accessible
2. Try submitting empty form → Should show validation
3. Submit valid form → Should open WhatsApp

#### Theme Toggle
1. Tap Sun icon (☀️) → Light theme
2. Tap Moon icon (🌙) → Dark theme  
3. Tap Om icon (🕉️) → Spiritual theme with background
4. Check that theme persists on page reload

#### Image Slider
1. Swipe left/right → Should change slides
2. Tap arrow buttons → Should navigate
3. Tap dots → Should jump to slide
4. Auto-play → Should work (changes every 3 seconds)

### 5. **Performance Testing**

- [ ] Page loads quickly on 3G network simulation
- [ ] Images load progressively (lazy loading)
- [ ] No layout shifts during loading
- [ ] Smooth scrolling and animations
- [ ] No lag when opening/closing menu

### 6. **Cross-Browser Mobile Testing**

Test on mobile browsers:
- [ ] Chrome Mobile
- [ ] Safari iOS (if available)
- [ ] Firefox Mobile
- [ ] Samsung Internet

### 7. **Common Issues to Look For**

❌ **Issues that should NOT happen:**
- Horizontal scrolling on any page
- Text too small to read
- Buttons too small to tap
- Overlapping elements
- Content cut off
- Menu not closing
- Images not loading
- Broken links

✅ **Expected behavior:**
- Single column layout on mobile
- Easy to read text
- Large, tappable buttons
- Smooth menu animations
- Properly scaled images
- All functionality works

### 8. **Browser DevTools Testing Steps**

1. Open website in Chrome
2. Press F12 to open DevTools
3. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
4. Select a mobile device from dropdown
5. Reload page (Ctrl+R)
6. Test all functionality
7. Try both portrait and landscape orientations
8. Check different zoom levels

### 9. **Responsive Design Breakpoints**

The website adapts at these screen widths:
- **0-480px**: Extra small mobile (portrait)
- **481-768px**: Small mobile/large mobile (landscape)
- **769-1024px**: Tablets
- **1025px+**: Desktop

### 10. **Quick Visual Check**

On mobile screens, you should see:
- ✅ Logo in top left
- ✅ Hamburger menu in top right  
- ✅ Call buttons below logo
- ✅ Theme toggle in top right corner
- ✅ Music player near bottom right
- ✅ WhatsApp button in bottom right
- ✅ Single column product/menu cards
- ✅ Full-width buttons
- ✅ Properly sized images

---

## How to Report Issues

If you find any problems:

1. **Screenshot** the issue
2. Note the **device/screen size**
3. Note the **browser** being used
4. Describe **what you expected** vs **what happened**
5. List the **steps to reproduce**

---

## Mobile Optimization Features

✅ **Implemented:**
- Responsive grid layouts
- Mobile-friendly navigation
- Touch-optimized buttons
- Proper font scaling
- Image optimization
- Smooth animations
- Form validation
- WhatsApp integration
- Theme switching
- Lazy loading

---

**Last Updated:** November 16, 2025
