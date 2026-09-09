from PIL import Image
import os

img_path = "src/assets/sliit/sliit_logo_raw.jpg"
os.makedirs("public/sliit", exist_ok=True)
out_public = "public/sliit/sliit_logo.png"
out_asset = "src/assets/sliit/sliit_logo.png"

img = Image.open(img_path).convert("RGBA")

# Find bounding box of non-white content
width, height = img.size
pixels = img.load()

min_x, min_y, max_x, max_y = width, height, 0, 0

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        # not pure white
        if r < 240 or g < 240 or b < 240:
            if x < min_x: min_x = x
            if x > max_x: max_x = x
            if y < min_y: min_y = y
            if y > max_y: max_y = y

pad = 8
min_x = max(0, min_x - pad)
min_y = max(0, min_y - pad)
max_x = min(width, max_x + pad)
max_y = min(height, max_y + pad)

cropped = img.crop((min_x, min_y, max_x, max_y))

# Make background white transparent
c_pixels = cropped.load()
c_w, c_h = cropped.size

for y in range(c_h):
    for x in range(c_w):
        r, g, b, a = c_pixels[x, y]
        # If pixel is close to pure white, make transparent with anti-aliasing
        if r > 245 and g > 245 and b > 245:
            c_pixels[x, y] = (r, g, b, 0)
        elif r > 215 and g > 215 and b > 215:
            # Smooth edge
            brightness = (r + g + b) / 3.0
            alpha = int((255 - brightness) * (255 / 40.0))
            c_pixels[x, y] = (r, g, b, min(255, max(0, alpha)))

cropped.save(out_public, "PNG")
cropped.save(out_asset, "PNG")
print(f"Processed SLIIT official logo ({c_w}x{c_h}) saved to {out_public} and {out_asset}")
