# Cameron Grindle — author website

Official static website for Cameron Grindle, published by Copper Button Books.

## Pages
- `index.html` — author homepage, both book series
- `georgia-adventures.html` — The Georgia Adventures
- `grace-and-byte.html` — Grace & Byte
- `style.css` — shared responsive design
- `CNAME` — GitHub Pages custom domain: `camerongrindle.com`

## Approved image files to upload
The HTML is designed to reveal the following files automatically when placed in the **root** of the repository. Until then, each page uses a simple title-card fallback rather than a broken image.

- `The_Last_Map_of_Cleopatra_Corrected_Front_Cover_Web.jpg` — optimised web copy of the approved, published `The_Last_Map_of_Cleopatra_Front_Cover.jpg`
- `grace-byte-cover.jpg` — web-optimised approved full-colour cover of **Grace & Byte: The Map in the Drone**, supplied 16 Nov 2026

Only upload approved public-facing images. Do not upload draft manuscripts, personal photographs, or private metadata.

## Deploy
GitHub Pages: Settings → Pages → deploy `main` from `/(root)`. GitHub Pages will redeploy on commits.

Custom domain and VentraIP DNS are managed separately. Wait for certificate provisioning before enabling Enforce HTTPS.

## Current content status
- The Last Map of Cleopatra: published; direct paperback link to Amazon Australia (only upload a canon-accurate approved front cover)
- Grace & Byte: The Map in the Drone: coming soon; no retail link until released
- Future series books: add only after approved titles and artwork

## Amazon purchase link
- `amazon-links.js` routes readers to Amazon.com.au when Australian browser timezones are detected and to Amazon.com for US browser timezones, with language fallback and a manually selectable store. The user's selection is remembered locally when browser storage is available.
- The site has one compact **View on Amazon** link per Georgia purchase section. The Amazon product page supplies the available paperback and Kindle choices rather than duplicating format buttons.
- The live paperback listing identifier is `1763934322`. The retired identifier `1763934314` must not be used.
- Browser timezones and languages are approximate, not IP geolocation. The HTML fallback link points to Amazon Australia if scripts are disabled.
