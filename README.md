# Sahil Ambegaonkar Portfolio

A premium static personal portfolio focused on engineering, entrepreneurship, product building, and leadership. The project uses only HTML, CSS, and JavaScript, so it is fast, portable, and ready for GitHub Pages.

## Project Structure

```text
.
|-- index.html
|-- styles.css
|-- script.js
|-- assets
|   |-- documents
|   |-- icons
|   |   `-- .gitkeep
|   `-- images
|       `-- .gitkeep
`-- README.md
```

## Customize

- Add a real profile photo to `assets/images/` and update the hero image markup if desired.
- Update project links if Navio Pathways or future apps have public URLs.
- Update the Resume button URL in `index.html` if the resume moves.

## GitHub Pages Deployment

1. Push this folder to a GitHub repository.
2. Open the repository on GitHub.
3. Go to **Settings**.
4. Open **Pages** in the sidebar.
5. Under **Build and deployment**, set the source to **Deploy from a branch**.
6. Choose the `main` branch and `/root` folder.
7. Save the settings.

GitHub will publish the website at:

```text
https://your-username.github.io/your-repository-name/
```

## Local Preview

Because this is a static site, you can open `index.html` directly in a browser. For a local server, run:

```bash
python -m http.server 8080
```

Then visit:

```text
http://localhost:8080
```
