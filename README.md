# Ndlinks website (React + Vite)
Run: `npm install` then `npm run dev`. Build: `npm run build` (output in `dist/`).
Business details: `src/config/business.js`. Services: `src/data/services.js` (delete an object to remove a service).
Photos: copy to `public/images/projects/`, then in `src/data/projects.js` set `image:'/images/projects/file.jpg'` and `placeholder:false`. Resize to about 1200px wide and compress first.
Deploy (Cloudflare Pages, free): push to GitHub > Workers & Pages > Create > Pages > Connect to Git; build command `npm run build`, output directory `dist`.
The free URL is a *.pages.dev address; a .com or .com.ng domain is a separate purchase. Replace YOUR-SITE-URL in public/robots.txt and public/sitemap.xml.
Pre-launch: add real photos, engineer name and portrait, remove services not offered, confirm phone number, update sitemap URL, test on a phone.

Water animation: ripple canvas in the carousel (App.jsx, Carousel), layered waves (Wave component), styles at the end of main.css. All stop when the visitor has reduced motion on.
Camera investigation is included as a service and as a portfolio category.

TEST PHOTOS: public/images/samples/ holds 5 temporary test images (not Ndlinks work). Before launch, replace them with real photos in src/data/projects.js and delete the samples folder.

Solar Panel Installation is a service and a portfolio category. Filters only show categories that have at least one project. Service cards show a photo only when 'image' is set in services.js.

MEDIA: real photos are in public/images/projects/ and public/images/brand/engineer.jpg; silent videos are in public/videos/ (each has a *-poster.jpg). Entries live in src/data/projects.js (first 5 = top carousel). To add more: copy a v(...) or i(...) line, add the files, done. Keep videos short (under ~30s), silent, and about 1-2 MB each.
