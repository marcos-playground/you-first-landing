# Astro with Tailwind

```sh
pnpm create astro@latest -- --template with-tailwindcss
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/with-tailwindcss)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/with-tailwindcss)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/with-tailwindcss/devcontainer.json)

Astro comes with [Tailwind](https://tailwindcss.com) support out of the box. This example showcases how to style your Astro project with Tailwind.

For complete setup instructions, please see our [Tailwind Styling Guide](https://docs.astro.build/en/guides/styling/#tailwind).

## Sanity CMS

This site uses Sanity as the headless CMS for the five public pages:

- Home
- Services
- Projects
- About
- Contact

The embedded Sanity Studio is available at `/studio` during local development and after deployment.

If Studio reports a failed dynamic import from `node_modules/.vite/deps`, stop the dev server and restart it with:

```sh
pnpm run dev -- --force
```

Then hard-refresh `/studio`. This clears Vite's optimized dependency graph after Sanity/Astro dependency changes.

If Studio loads but Sanity API calls are blocked by CORS, add your local origin with credentials:

```sh
pnpm exec sanity cors add http://localhost:4321 --credentials
```

Use the actual dev server origin if Astro starts on a different port.
