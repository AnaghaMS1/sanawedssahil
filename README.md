# Wedding invitation

Open `index.html` in a browser to preview the blush, cream and navy invitation theme.

## Personalise it

Edit the `WEDDING` object at the top of `script.js`:

- Names, families, date, time, venue, address and map URL are grouped in the `WEDDING` object.
- Set `dateISO` as `YYYY-MM-DDTHH:mm:ss` in the venue's local time. Scratching the hero foil reveals the day, full month and year in separate round badges, followed by a petal burst. The live countdown appears before the closing blessing.
- `assets/venue-qr.png` encodes the exact Google Maps link in `mapUrl` and is displayed in the venue section. Update both if the location changes.
- Replace the photo URLs in `index.html` with your own couple photos. Keep the descriptive `alt` text accurate.
- The supplied background track is included at `assets/music.mp3`. The music control starts only after the visitor taps it.
- When hosted, set `og:image` in `index.html` to an absolute URL for a square or landscape share-preview image. Social apps need a public URL to create a link preview.

Your invitation card and QR code are saved at `assets/invitation-card.jpeg` and `assets/venue-qr.png`. The auditorium photo, groom portrait, bride portrait and couple photo are saved locally as `assets/venue-auditorium.jpg`, `assets/sahil-portrait.jpg`, `assets/sana-portrait.jpg` and `assets/couple-portrait.jpg`. The earlier couple photos remain in the gallery. Names and event details are editable in the `WEDDING` object in `script.js`; section text and captions are editable in `index.html`.
