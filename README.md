# Divyapriya S – Portfolio Website

A responsive, single-page portfolio built with plain **HTML, CSS and JavaScript** (no frameworks, no build step). All content comes from my resume.

## Features
- Sections: Home, About Me, Technical Skills, Projects, Education, Certifications, Contact
- Dark / light theme toggle (remembers your choice)
- Typing animation, scroll-reveal animations, scroll progress bar, back-to-top button
- Filterable skills grid with AWS skills highlighted
- Project cards, GitHub and LinkedIn links, Download Resume button
- Contact form that opens your email app (works on GitHub Pages with no backend)
- Fully responsive: desktop, tablet and mobile (hamburger menu)

## Folder structure
```
portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── assets/Divyapriya_S_Resume.pdf
├── .nojekyll
└── README.md
```

## Run locally
Just double-click `index.html`, or serve the folder:
```bash
python -m http.server 8000
# open http://localhost:8000
```

## Deploy on GitHub Pages
1. Sign in to GitHub and create a **new public repository**, e.g. `portfolio`
   (or name it `DivyaPriya250413.github.io` for a root URL).
2. Upload the **contents** of this folder (so `index.html` is at the repo root):
   - Easiest: on the repo page choose **Add file → Upload files**, drag everything in (including the `css`, `js`, `assets` folders), then **Commit changes**.
   - Or with Git:
     ```bash
     git init
     git add .
     git commit -m "Add portfolio website"
     git branch -M main
     git remote add origin https://github.com/DivyaPriya250413/portfolio.git
     git push -u origin main
     ```
3. Open the repo **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/ (root)**, then click **Save**.
6. Wait 1–2 minutes. Your site will be live at:
   - `https://divyapriya250413.github.io/portfolio/` (project repo), or
   - `https://divyapriya250413.github.io/` (if the repo is named `DivyaPriya250413.github.io`).

## Customising
- **Project links:** each project card currently links to your GitHub profile. Once a project has its own repository, replace the `href` of its "View on GitHub →" link in `index.html` with the repo URL.
- **Resume:** replace `assets/Divyapriya_S_Resume.pdf` with a newer PDF using the same filename.
- **Colours:** edit the CSS variables at the top of `css/style.css`.
