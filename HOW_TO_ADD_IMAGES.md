# How to Add Your Product Images

## Quick Guide

You provided several beautiful product images. Here's how to integrate them into your website:

## Step 1: Save Your Images

Copy all your product images to: `images/products/`

Suggested naming:
- `namkeen-variety.jpg` (for the namkeen/mixture boxes image)
- `motibundi-laddu.jpg` (for the boondi laddu balls)
- `peda-boxes.jpg` (for the peda in boxes)
- `kaju-katli.jpg` (for kaju katli pieces)
- `dryfruit-laddu.jpg` (for the meva laddu image)
- `burfi-boxes.jpg` (for various burfi)
- `swamini-pack.jpg` (for the variety pack with boxes)
- `shop-front.jpg` (storefront image)
- `shop-counter.jpg` (counter display image)
- `shop-logo.jpg` (branded logo image)
- `bundi-laddu-box.jpg` (laddu in boxes)
- `peda-display.jpg` (peda display)

## Step 2: Update menu.html

Find lines like this:
```html
<img src="images/products/sample-product.jpg" alt="..." width="150" height="150">
```

Replace with your actual image names:
```html
<img src="images/products/kaju-katli.jpg" alt="..." width="150" height="150">
```

## Step 3: Update gallery.html

Same process - replace placeholder images with real ones.

## Step 4: Add Deity Photos (Optional)

If you want real deity photos instead of SVG:

1. Save deity images to `images/generated/`:
   - `khatu-shyam-ji.jpg`
   - `salasar-balaji.jpg`
   - `jeen-mata.jpg`

2. In index.html, replace:
```html
<img src="images/generated/khatushyam-placeholder.svg" ...>
```

With:
```html
<img src="images/generated/khatu-shyam-ji.jpg" ...>
```

## Example Image Replacements

### For Kaju Katli in menu.html:
**Find:**
```html
<div class="menu-item">
  <div class="menu-item-image">
    <img src="images/products/sample-product.jpg" alt="Kaju Katli" ...>
  </div>
```

**Replace with:**
```html
<div class="menu-item">
  <div class="menu-item-image">
    <img src="images/products/kaju-katli.jpg" alt="Kaju Katli" ...>
  </div>
```

## Tips:

1. **Image Size**: Keep images under 500KB for fast loading
2. **Format**: JPG for photos, PNG for logos
3. **Dimensions**: 800x800px is ideal for product images
4. **Naming**: Use lowercase, hyphens instead of spaces

## Your Attached Images Suggested Usage:

Based on the 19 images you attached:

1. **Variety box image** → Use for Swamini packs and variety sections
2. **Peda boxes** → Use for all peda varieties in menu
3. **Boondi laddu** → Use for laddu section
4. **Kaju katli close-up** → Perfect for kaju katli products
5. **Burfi varieties** → Use for burfi section
6. **Shop exterior** → Add to About page or Contact page
7. **Shop interior/counter** → Perfect for gallery
8. **Namkeen boxes** → Use for namkeen section
9. **Logo/branding** → Can be used in header or footer

## Quick Test:

After adding images:
1. Open index.html in browser
2. Check if images load correctly
3. Verify they look good on mobile (resize browser window)

That's it! Your website will look even more professional with real product photos!
