from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

output = Path('public/images')
output.mkdir(parents=True, exist_ok=True)
files = {
    'rolex-submariner.jpg': 'Rolex Submariner',
    'rolex-daytona.jpg': 'Rolex Daytona',
    'rolex-gmt.jpg': 'Rolex GMT-Master II',
    'ap-royal-oak.jpg': 'Audemars Piguet Royal Oak',
    'ap-offshore.jpg': 'Audemars Piguet Offshore',
    'ap-code.jpg': 'Audemars Piguet Code 11.59',
    'patek-nautilus.jpg': 'Patek Philippe Nautilus',
    'patek-aquanaut.jpg': 'Patek Philippe Aquanaut',
    'patek-calatrava.jpg': 'Patek Philippe Calatrava',
    'omega-seamaster.jpg': 'Omega Seamaster',
    'omega-speedmaster.jpg': 'Omega Speedmaster',
    'tag-carrera.jpg': 'Tag Heuer Carrera',
    'tag-monaco.jpg': 'Tag Heuer Monaco',
    'default-watch.jpg': 'Default Watch',
}

font = None
for f in ['arial.ttf', 'DejaVuSans.ttf']:
    try:
        font = ImageFont.truetype(f, 42)
        break
    except Exception:
        continue
if font is None:
    font = ImageFont.load_default()

for name, text in files.items():
    path = output / name
    img = Image.new('RGB', (800, 800), (24, 32, 46))
    draw = ImageDraw.Draw(img)
    draw.rectangle([20, 20, 780, 780], outline=(59, 130, 246), width=12)
    lines = []
    for word in text.split(' '):
        if not lines or len(lines[-1]) + len(word) + 1 > 16:
            lines.append(word)
        else:
            lines[-1] += ' ' + word
    y = 250
    for line in lines:
        if hasattr(draw, 'textbbox'):
            bbox = draw.textbbox((0, 0), line, font=font)
            w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
        else:
            w, h = font.getsize(line)
        draw.text(((800-w)/2, y), line, font=font, fill=(241, 245, 249))
        y += h + 10
    if hasattr(draw, 'textbbox'):
        bbox = draw.textbbox((0, 0), 'Watch', font=font)
        w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    else:
        w, h = font.getsize('Watch')
    draw.text(((800-w)/2, 650), 'Watch', font=font, fill=(148, 163, 184))
    img.save(path, quality=90)
print('created', len(files), 'images')
