import os
from PIL import Image

source_path = r"E:\Projects\Movo New\movo.png"
res_path = r"E:\Projects\Movo New\movo-app\android\app\src\main\res"

# Densities and their base sizes for 48dp (launcher icon)
# mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192
launcher_sizes = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192,
}

# Adaptive icons foreground is 108dp
# mdpi: 108, hdpi: 162, xhdpi: 216, xxhdpi: 324, xxxhdpi: 432
foreground_sizes = {
    "mipmap-mdpi": 108,
    "mipmap-hdpi": 162,
    "mipmap-xhdpi": 216,
    "mipmap-xxhdpi": 324,
    "mipmap-xxxhdpi": 432,
}

def generate_icons():
    img = Image.open(source_path).convert("RGBA")

    for folder, size in launcher_sizes.items():
        out_dir = os.path.join(res_path, folder)
        if not os.path.exists(out_dir):
            os.makedirs(out_dir)

        # ic_launcher.png
        icon = img.resize((size, size), Image.Resampling.LANCZOS)
        icon.save(os.path.join(out_dir, "ic_launcher.png"))

        # ic_launcher_round.png
        # For simplicity, we use the same image, but Android Studio often rounds it via mask
        icon.save(os.path.join(out_dir, "ic_launcher_round.png"))

    for folder, size in foreground_sizes.items():
        out_dir = os.path.join(res_path, folder)
        # Adaptive foreground: often we want some padding.
        # Source logo is typically the full mark.
        # For 108dp, the safe zone is the center 66dp.
        # We'll scale the logo to fit nicely.
        fg_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        logo_size = int(size * 0.65) # Scale logo to 65% of the total area
        logo_resized = img.resize((logo_size, logo_size), Image.Resampling.LANCZOS)

        offset = (size - logo_size) // 2
        fg_img.paste(logo_resized, (offset, offset), logo_resized)
        fg_img.save(os.path.join(out_dir, "ic_launcher_foreground.png"))

if __name__ == "__main__":
    generate_icons()
    print("Icons generated successfully")
