# about-me

Personal site for Jimmy Kane, built with [Astro](https://astro.build/) and TypeScript (strict). It is a fully static site deployed to GitHub Pages at <https://liljimmyk99.github.io/about-me>.

The redesign plan lives in [docs/redesign-spec.md](docs/redesign-spec.md).

## Requirements

- Node.js 22 or newer
- npm

## Commands

Run from the repo root:

| Command           | What it does                                                     |
| ----------------- | ---------------------------------------------------------------- |
| `npm install`     | Install dependencies                                             |
| `npm run dev`     | Start the dev server at <http://localhost:4321/about-me/>        |
| `npm run build`   | Build the production site to `./dist/`                           |
| `npm run preview` | Serve the built site locally (run `npm run build` first)         |
| `npm run check`   | Type-check the project and content schemas with `astro check`    |
| `npm run check:links` | Check every internal link, asset and `#fragment` in `dist/` (run `npm run build` first) |

The site is served under the `/about-me` base path, so build internal links from `import.meta.env.BASE_URL` instead of hard-coding `/`.

## Deployment

- Pushes to `main` build and deploy via `.github/workflows/main.yml` (`withastro/action`).
- Pull requests into `redesign` run `.github/workflows/build-check.yml`: type check, build, internal link check and Lighthouse CI (mobile, 95+ in Performance, Accessibility, Best Practices and SEO on the home page and one post; config in `lighthouserc.json`).

## License

See [LICENSE](LICENSE).
