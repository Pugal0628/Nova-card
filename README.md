# NovaCart — GitHub-ready e-commerce storefront

A responsive, gradient-glassmorphism storefront made with plain HTML, CSS and JavaScript. No build tools or package installation required.

## Features
- Responsive desktop and mobile layout
- Product grid with category filters, search and sorting
- Add-to-bag interactions, quantity controls and subtotal
- Cart saved in browser `localStorage`
- Glass-style panels, gradients and animated hover states
- GitHub Pages compatible

## Run locally
Open `index.html` in a browser. For a local development server, you can use the VS Code Live Server extension.

## Publish with GitHub Pages
1. Create a new repository on GitHub.
2. Upload **all files and folders inside this ZIP** to the repository root. Keep `index.html` at the root.
3. Open the repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for GitHub Pages to publish. Your site URL will appear in the Pages section.

## Important demo notes
- This is a front-end demo. It does not include a backend, user accounts, inventory, order management, or a real payment gateway.
- The checkout button intentionally displays a demo notice. Do not collect real payment details with this template.
- Product artwork uses emoji illustrations and the page loads Google Fonts from the internet. A network connection is needed for those external fonts; the site itself still works without them.
- The cart is stored only in the visitor's browser.

## Customize
- Edit the `products` array in `script.js` to change names, categories, prices, badges and product icons.
- Edit colors, spacing and layout in `style.css`.
- Update the title, description and page content in `index.html`.
