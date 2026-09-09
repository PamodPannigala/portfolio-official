import pymupdf
import os

pdf_path = "C:/Users/Pamod Pannigala/Downloads/Pamod_InternshipLetter_SLIIT.pdf"
doc = pymupdf.open(pdf_path)
for i, img_info in enumerate(doc[0].get_images()):
    xref = img_info[0]
    base = doc.extract_image(xref)
    ext = base["ext"]
    w, h = base["width"], base["height"]
    out_file = f"src/assets/sliit/extracted_letter_{i}.{ext}"
    with open(out_file, "wb") as f:
        f.write(base["image"])
    print(f"Extracted image {i}: {w}x{h} ({ext}) -> {out_file}")
