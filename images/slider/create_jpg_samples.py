#!/usr/bin/env python3
"""
Create sample JPG images for slider
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_slider_jpg(filename, bg_color, text, text_color=(255, 255, 255)):
    """Create a simple JPG slider image"""
    width, height = 1200, 500
    
    # Create image
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Try to use a nice font, fallback to default
    try:
        font_large = ImageFont.truetype("arial.ttf", 60)
        font_small = ImageFont.truetype("arial.ttf", 30)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # Draw text
    # Main text
    bbox = draw.textbbox((0, 0), text, font=font_large)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (width - text_width) // 2
    y = (height - text_height) // 2 - 50
    draw.text((x, y), text, fill=text_color, font=font_large)
    
    # Subtitle
    subtitle = "Amit Misthan Bhandar • Chirawa"
    bbox2 = draw.textbbox((0, 0), subtitle, font=font_small)
    sub_width = bbox2[2] - bbox2[0]
    x2 = (width - sub_width) // 2
    y2 = y + text_height + 40
    draw.text((x2, y2), subtitle, fill=(255, 248, 220), font=font_small)
    
    # Add decorative border
    border_color = (255, 215, 0)  # Gold
    draw.rectangle([10, 10, width-10, height-10], outline=border_color, width=5)
    
    # Save as JPG
    img.save(filename, 'JPEG', quality=95)
    print(f"Created: {filename}")

# Create sample images
if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Image 1: Saffron/Orange theme
    create_slider_jpg(
        os.path.join(script_dir, "banner1.jpg"),
        (255, 153, 51),  # Saffron
        "🙏 Ram Ram Ji 🙏"
    )
    
    # Image 2: Golden theme
    create_slider_jpg(
        os.path.join(script_dir, "banner2.jpg"),
        (255, 191, 0),  # Amber/Gold
        "Premium Sweets"
    )
    
    # Image 3: Red theme
    create_slider_jpg(
        os.path.join(script_dir, "image1.jpg"),
        (220, 20, 60),  # Crimson
        "Order Now!"
    )
    
    print("\n✅ All JPG samples created successfully!")
    print("📝 Note: Replace these with your actual product photos")
