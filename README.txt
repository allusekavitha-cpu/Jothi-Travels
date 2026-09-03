# Simple Project Jothi Travels

A plain **HTML / CSS / JavaScript** version of the Jothi Travels & Tours
website — same look, feel, branding, real photos and booking actions as the
Next.js version, but with **zero build tools, zero dependencies, and zero
installation**. Just open a file in a browser.

## How to Open

**Option 1 — Just double-click:**
Open `index.html` directly in any browser (Chrome, Edge, Firefox). Everything
works: navigation, hero slider, galleries, forms, WhatsApp booking.

**Option 2 — Serve locally (recommended, avoids browser file:// restrictions
on some setups):**
```bash
# Python 3 (usually pre-installed on macOS/Linux, or via python.org on Windows)
python -m http.server 8080

# OR Node.js (if installed)
npx serve .
```
Then open http://localhost:8080.

## Pages
- `index.html` — Home (hero slider, why choose us, featured destinations, fleet preview, testimonials, callback form)
- `booking.html` — Cab booking form (opens WhatsApp with trip details) + callback form
- `fleet.html` — Vehicle fleet & pricing (Sedan, SUV, Innova, Crysta, Ertiga, Tempo Traveller, Luxury Van)
- `destinations.html` — All destinations across Tirunelveli, Tenkasi, Achan Kovil, Kanyakumari & Madurai, filterable by region
- `ayyappa-pilgrimage.html` — Ayyappa pilgrimage packages, circuit route, gallery
- `gallery.html` — Full photo gallery, filterable by category, with lightbox
- `contact.html` — Contact details, map, callback form

## How It Works
- All "Book Now"/"Submit Booking" and "Request a Callback" buttons build a
  pre-filled WhatsApp message and open `https://wa.me/919443486717?text=...`
  — no backend/server required.
- The WhatsApp number and phone number are set in `js/main.js`
  (`PHONE_NUMBER`, `WHATSAPP_NUMBER` constants) — edit there to change them
  everywhere at once.
- All photos are local, under `images/destinations`, `images/fleet` and
  `images/ayyappa-pilgrimage`.

## Editing
- **Styling:** `css/style.css` — CSS variables at the top (`--royal-blue`,
  `--gold`, `--sunset-orange`, etc.) control the whole colour palette.
- **Behaviour:** `js/main.js` — hero slider, mobile nav, gallery filters,
  lightbox, and form → WhatsApp logic.
- **Content:** each `.html` page — no templating, just edit the HTML
  directly (header/footer markup is duplicated across pages since this is a
  plain multi-page site with no build step).

## Deploying
Since this is 100% static files, you can deploy it anywhere with zero
configuration:
- **Any web host / shared hosting:** upload the whole folder via FTP.
- **Google Cloud Storage static hosting / Firebase Hosting / Netlify /
  GitHub Pages:** just point them at this folder — no build command needed.

## Relationship to the Next.js Version
This is a simplified, framework-free companion to the full
`jothi-travels` Next.js project (same repo root, sibling folder) — same
brand, colours, real photos, pages and booking actions, but without React,
Firebase, or a build step. Use this version if you want the simplest
possible hosting, and the Next.js version if you want the Admin Dashboard,
Firestore storage, and richer interactivity.
