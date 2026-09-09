import pymupdf
import os

pdf_path = os.path.abspath("src/assets/certificates/IT23762886_Mongo_Certificate.pdf")
out_assets = os.path.abspath("src/assets/certificates/mongodb-java-developer-certificate.png")
os.makedirs("public/certificates", exist_ok=True)
out_public = os.path.abspath("public/certificates/mongodb-java-developer-certificate.png")
out_public_pdf = os.path.abspath("public/certificates/IT23762886_Mongo_Certificate.pdf")

doc = pymupdf.open(pdf_path)
page = doc.load_page(0)
# 150 dpi is ~5600x4300, perfect high-res and fast loading (~1-2MB)
pix = page.get_pixmap(dpi=150)
pix.save(out_assets)
pix.save(out_public)

import shutil
shutil.copyfile(pdf_path, out_public_pdf)

print(f"Optimized certificate ({pix.width}x{pix.height}) saved successfully!")
