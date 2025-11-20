# create-protobox

Scaffold a new [Protobox](https://github.com/toddmoy/protobox) project with one command.

Protobox is a React prototyping boilerplate built with Vite, shadcn/ui, Tailwind CSS, React Router, and TypeScript. Perfect for rapid prototyping and experimentation.

## Usage

Create a new Protobox project:

```bash
npm create protobox@latest my-app
```

Or with other package managers:

```bash
# pnpm
pnpm create protobox my-app

# yarn
yarn create protobox my-app

# bun
bunx create-protobox my-app
```

Then follow the prompts to set up your project:

```bash
cd my-app
pnpm install
pnpm dev
```

## What's Included

Your new Protobox project comes with:

- **Vite** - Lightning-fast build tooling and HMR
- **React 18** with TypeScript (strict mode)
- **React Router v6** - Pre-configured client-side routing
- **shadcn/ui** - 34 pre-installed accessible components
- **Tailwind CSS** - Utility-first styling with dark mode support
- **Framer Motion** - Production-ready animations
- **React Icons & Lucide** - Comprehensive icon libraries
- **Custom hooks** - usePosition, useHotkeys, and more
- **@dnd-kit** - Modern drag-and-drop functionality
- **@faker-js/faker** - Mock data generation

## Project Structure

```
my-app/
├── src/
│   ├── components/     # Custom components + shadcn/ui library
│   ├── pages/          # Route page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities (cn function, etc.)
│   ├── styles/         # Global styles and easing curves
│   ├── App.tsx         # Router configuration
│   └── main.tsx        # Application entry point
├── public/             # Static assets
├── CLAUDE.md           # AI assistant instructions
└── package.json
```

## Development Commands

```bash
pnpm dev      # Start dev server
pnpm build    # Build for production
pnpm preview  # Preview production build
pnpm lint     # Run ESLint
pnpm format   # Format with Prettier
```

## Features

### Component Library
34 shadcn/ui components ready to use: buttons, cards, dialogs, forms, navigation, data display, and more. Add more with:

```bash
npx shadcn-ui@latest add <component-name>
```

### Dark Mode
Built-in dark mode support using Tailwind's class-based system:

```tsx
<div className="bg-white dark:bg-zinc-900">
  Content
</div>
```

### Custom Hooks
- **usePosition** - Position elements relative to targets (tooltips, popovers)
- **useHotkeys** - Keyboard shortcuts (from react-hotkeys-hook)
- **useToast** - Toast notifications (shadcn)

### Path Aliases
Clean imports with `@/` alias:

```tsx
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
```

## Learn More

- [Protobox Repository](https://github.com/toddmoy/protobox)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)

## Publishing (Maintainer Notes)

### Prerequisites

1. Ensure you have an npm account and are logged in:
   ```bash
   npm login
   ```

2. Verify the package name is available:
   ```bash
   npm search create-protobox
   ```

### Publishing Steps

1. Update version in `package.json` (follow [semver](https://semver.org/)):
   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   npm version minor  # 1.0.0 -> 1.1.0
   npm version major  # 1.0.0 -> 2.0.0
   ```

2. Publish to npm:
   ```bash
   npm publish
   ```

3. Tag releases on GitHub:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

### Testing Locally Before Publishing

1. Link the package globally:
   ```bash
   cd create-protobox
   npm link
   ```

2. Test in a different directory:
   ```bash
   cd ~/Desktop
   npm create protobox test-project
   ```

3. Verify the generated project works:
   ```bash
   cd test-project
   pnpm install
   pnpm dev
   ```

4. Unlink when done:
   ```bash
   npm unlink -g create-protobox
   ```

### Automated Publishing with GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Updating the Template

When the Protobox template is updated:

1. Users automatically get the latest template (giget pulls from GitHub)
2. Only republish create-protobox if CLI logic changes
3. Version the package to indicate CLI changes, not template changes

### Notes

- The package uses `giget` to download the template from `github:toddmoy/protobox`
- No need to include template files in the npm package
- Template is always fresh from the GitHub repository
- Keep the package lightweight (only CLI logic)

## License

MIT

## Author

Todd Moy
