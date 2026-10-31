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

The site is served under the `/about-me` base path, so build internal links from `import.meta.env.BASE_URL` instead of hard-coding `/`.

## Deployment

- Pushes to `main` build and deploy via `.github/workflows/main.yml` (`withastro/action`).
- Pull requests into `redesign` run a type check and build via `.github/workflows/build-check.yml`.

## License

See [LICENSE](LICENSE).
