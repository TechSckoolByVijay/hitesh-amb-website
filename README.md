# Amit Mishtan Bhandar Website

Complete static website for **Amit Mishtan Bhandar** — a traditional sweets shop in Chidava (Chirawa), Jhunjhunu, Rajasthan, specializing in authentic Laddu, Peda, Swamini packs, and Prasad items.

## 🎯 Features

- **100% Static HTML/CSS/JS** — No build tools, no frameworks, no dependencies
- **SEO Optimized** — Complete meta tags, JSON-LD schemas, sitemap, and robots.txt
- **Mobile Responsive** — Mobile-first design with smooth navigation
- **WhatsApp Integration** — Direct ordering via WhatsApp
- **Beautiful SVG Graphics** — All product images generated as inline SVG
- **80+ Years Legacy** — Showcasing traditional Rajasthan sweets

## 📁 Project Structure

```
/
├── index.html              # Home page
├── about.html              # About page with 80-year history
├── menu.html               # Complete menu with categories
├── gallery.html            # Image gallery
├── order.html              # Order form with WhatsApp integration
├── contact.html            # Contact page with map
├── css/
│   └── styles.css          # Single stylesheet (mobile-first)
├── js/
│   └── main.js             # All JavaScript functionality
├── images/
│   ├── generated/          # SVG product images
│   │   ├── laddu.svg
│   │   ├── peda.svg
│   │   ├── swamini-pack.svg
│   │   ├── prasad-plate.svg
│   │   ├── khatushyam-placeholder.svg
│   │   └── hanuman-salasar-placeholder.svg
│   ├── products/           # Placeholder for JPG product photos
│   │   └── sample-product.jpg
│   └── social/             # Social media images
│       └── og-home.png
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine instructions
└── README.md               # This file
```

## 🚀 Deployment Instructions (Hostinger)

### Step 1: Prepare Files

1. Download all files from this repository
2. Ensure the folder structure matches the above
3. Replace placeholder images in `/images/products/` and `/images/social/` with actual photos

### Step 2: Upload to Hostinger

1. Log in to your **Hostinger** control panel (hPanel)
2. Navigate to **Files** → **File Manager**
3. Open the `public_html` directory
4. Delete any existing files in `public_html` (if this is a new site)
5. Upload all website files to `public_html`:
   - Upload all HTML files to the root of `public_html`
   - Upload the `css/` folder
   - Upload the `js/` folder
   - Upload the `images/` folder
   - Upload `sitemap.xml` and `robots.txt`

### Step 3: Verify File Structure

After upload, your `public_html` should look like this:

```
public_html/
├── index.html
├── about.html
├── menu.html
├── gallery.html
├── order.html
├── contact.html
├── css/
├── js/
├── images/
├── sitemap.xml
└── robots.txt
```

### Step 4: Update Domain Settings

1. In Hostinger, go to **Domains**
2. Ensure your domain (e.g., `amitmisthan.com`) points to `public_html`
3. Enable **SSL Certificate** for HTTPS (free with Hostinger)

### Step 5: Test the Website

1. Visit your domain: `https://yourdomain.com`
2. Test all pages: Home, About, Menu, Gallery, Order, Contact
3. Test mobile responsiveness
4. Test WhatsApp buttons
5. Verify all images load correctly

## 🔧 Customization Guide

### Update Business Information

**Phone Numbers** (appears in footer and contact page):
- Primary WhatsApp: `+91 9694018427`
- Alternate: `63756356`

To change, search and replace in all HTML files.

### Update Domain/URLs

Replace `https://www.amitmisthan.com` with your actual domain in:
- All HTML files (canonical links, OG tags)
- `sitemap.xml`

### Add Real Product Images

1. Take high-quality photos of your sweets
2. Resize to 800x600px (recommended)
3. Upload to `/images/products/`
4. Update image `src` attributes in HTML files

### Add Social Media Image

1. Create a 1200x630px image for social sharing
2. Save as `og-home.png`
3. Upload to `/images/social/`

### Update Google Maps

In `contact.html`, replace the Google Maps embed URL with your actual shop location:
1. Go to Google Maps
2. Search for your shop address
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the existing iframe in `contact.html`

## 📱 WhatsApp Integration

All WhatsApp links use this format:
```
https://wa.me/919694018427?text=Your%20Message%20Here
```

- Primary number: `919694018427` (include country code, no + or spaces)
- Message is URL-encoded

## 🎨 Color Scheme

The website uses warm Rajasthani colors:
- **Primary Saffron**: `#FF9933`
- **Secondary Amber**: `#FFBF00`
- **Cream**: `#FFF8DC`
- **Warm Orange**: `#FF8C00`
- **Deep Red**: `#DC143C`
- **Gold**: `#FFD700`

To change colors, edit CSS variables in `css/styles.css`:

```css
:root {
  --primary-saffron: #FF9933;
  --secondary-amber: #FFBF00;
  /* ... etc */
}
```

## 🔍 SEO Features

### Keywords Targeted

- Laddu
- Peda
- Swamini
- Prasad
- Chidava / Chirawa

These keywords appear naturally in:
- Page titles
- Meta descriptions
- Headings (H1, H2, H3)
- Image alt text
- Body content
- URLs/filenames

### Structured Data

Each page includes:
- **JSON-LD LocalBusiness schema** with address, phone, services
- **Breadcrumb navigation schema**
- **Open Graph tags** for social media
- **Twitter Card tags**

### Performance

- No external dependencies (all CSS/JS inline or local)
- SVG images (small file size)
- Lazy loading for images
- Mobile-first responsive design

## 📞 Contact Information

**Shop Name**: Amit Mishtan Bhandar  
**Location**: Chirawa (Chidava), Jhunjhunu, Rajasthan  
**Phone 1 (WhatsApp)**: +91 9694018427  
**Phone 2 (Alternate)**: 63756356  

**Service Areas**: Chidava, Chirawa, Khatu, Salasar, Jhunjhunu, Pilani, Sikar

## 🛠️ Technical Details

- **HTML5** semantic markup
- **CSS3** with Flexbox and Grid
- **Vanilla JavaScript** (no libraries)
- **Mobile-first responsive** design
- **Accessibility** features (ARIA labels, semantic HTML)
- **No build process** required
- **No npm/Node.js** dependencies

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Page-Specific Features

### Home (index.html)
- Hero section with CTA buttons
- Popular products showcase
- Service areas
- Divine blessings section

### About (about.html)
- 80-year legacy story
- What makes sweets special
- Values and specialties
- Cultural significance

### Menu (menu.html)
- Laddu varieties
- Peda varieties
- Swamini Packs
- Prasad Items
- Each with WhatsApp order button

### Gallery (gallery.html)
- Grid layout
- All products showcased
- Keyword-rich alt text

### Order (order.html)
- HTML form with WhatsApp submission
- Quick order combos
- Delivery information

### Contact (contact.html)
- Contact information cards
- Contact form
- Google Maps embed
- FAQ section

## 🔐 Security Notes

- No backend/database (static site = secure)
- HTTPS recommended (free with Hostinger)
- No user data stored

## 📝 License

This website is proprietary to **Amit Mishtan Bhandar**.

## 🆘 Support

For technical issues with the website, contact your web developer.  
For business inquiries, contact Amit Mishtan Bhandar:
- WhatsApp: +91 9694018427
- Phone: 63756356

---

**Built with tradition, served with devotion** 🙏

*Best Laddu & Peda Shop in Chidava — Authentic Rajasthan sweets delivered to Khatu and Salasar*
