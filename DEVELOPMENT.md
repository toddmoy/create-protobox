# Development Guide for create-protobox

## Project Structure

```
create-protobox/
├── index.js              # Main CLI entry point with shebang
├── package.json          # NPM package configuration
├── README.md             # User-facing documentation
├── LICENSE               # MIT license
├── .gitignore            # Git ignore patterns
└── DEVELOPMENT.md        # This file
```

## How It Works

When a user runs `npm create protobox@latest my-app`:

1. npm automatically installs `create-protobox` (because of the `create-` prefix convention)
2. npm executes the script defined in the `bin` field of package.json
3. The CLI script (`index.js`) receives "my-app" as an argument
4. The script uses `giget` to download the protobox template from GitHub
5. It updates the project's `package.json` with the specified name
6. It displays next steps for the user

## Local Development & Testing

### Install Dependencies
```bash
npm install
```

### Link Globally for Testing
```bash
npm link
```

This creates a global symlink to the package, allowing you to test the command locally.

### Test with Local Template
For testing before the GitHub repo is public, use the environment variable:

```bash
PROTOBOX_TEMPLATE=/path/to/your/protobox create-protobox test-project
```

### Test with Published Template
Once the protobox repo is on GitHub:

```bash
create-protobox test-project
```

### Unlink After Testing
```bash
npm unlink -g create-protobox
```

## Testing Checklist

- [x] Creates project with valid name
- [x] Error when no name provided
- [x] Error when directory already exists
- [x] Updates package.json with project name
- [x] Copies all necessary files (excluding node_modules, .git, etc.)
- [x] Works with local template (via PROTOBOX_TEMPLATE env var)
- [ ] Works with GitHub template (requires published repo)

## Publishing to npm

### Prerequisites

1. Create npm account: https://www.npmjs.com/signup
2. Login locally:
   ```bash
   npm login
   ```

3. Verify package name is available:
   ```bash
   npm search create-protobox
   ```

### First Time Publishing

1. Ensure the protobox repository is pushed to GitHub at `github.com/toddmoy/protobox`

2. Review package.json:
   - Check version (start with 1.0.0)
   - Verify repository URL
   - Confirm all metadata is correct

3. Test one final time with GitHub template:
   ```bash
   # Temporarily change TEMPLATE_REPO in index.js to test
   # Or wait until after publishing to test
   ```

4. Publish:
   ```bash
   npm publish
   ```

5. Test the published package:
   ```bash
   cd /tmp
   npm create protobox@latest test-from-npm
   ```

### Subsequent Updates

1. Make your changes to index.js or other files

2. Update version:
   ```bash
   npm version patch   # 1.0.0 -> 1.0.1
   npm version minor   # 1.0.0 -> 1.1.0
   npm version major   # 1.0.0 -> 2.0.0
   ```

3. Publish:
   ```bash
   npm publish
   ```

4. Push tags to GitHub:
   ```bash
   git push --follow-tags
   ```

## Important Notes

### Template Source
- The package downloads the template from `github:toddmoy/protobox` by default
- The template repository must be public for giget to access it
- The npm package itself is very lightweight (~10kb) - it doesn't include the template files
- Users always get the latest template from GitHub when they run the command

### Version Strategy
- Only bump the version when the CLI tool changes (index.js, package.json)
- Template updates automatically propagate to users (giget pulls from GitHub)
- This keeps the npm package small and allows template improvements without republishing

### Environment Variables
- `PROTOBOX_TEMPLATE` - Override template source for testing (supports local paths)
- Example: `PROTOBOX_TEMPLATE=/path/to/local/template`

### File Filtering
When copying locally (for testing), the tool automatically excludes:
- `node_modules/`
- `.git/`
- `dist/`
- `.DS_Store`

When using giget (production), it handles filtering automatically.

## Troubleshooting

### "404 Not Found" from GitHub
- Ensure the protobox repository exists at `github.com/toddmoy/protobox`
- Verify the repository is public (giget can't access private repos without auth)
- Check the repository has a default branch (main or master)

### "Permission denied" when linking
```bash
sudo npm link
```

### Changes not reflected after linking
```bash
npm unlink -g create-protobox
npm link
```

### Testing alternate template sources
```bash
# Test with different GitHub repo
PROTOBOX_TEMPLATE=github:username/repo-name create-protobox test

# Test with specific branch
PROTOBOX_TEMPLATE=github:toddmoy/protobox#dev create-protobox test

# Test with local directory
PROTOBOX_TEMPLATE=/Users/you/projects/protobox create-protobox test
```

## Maintenance

### Monitoring
- Check npm download stats: https://www.npmjs.com/package/create-protobox
- Monitor GitHub issues in both repos (protobox template and create-protobox)

### Updates to Consider
- Add progress indicators for slow network connections
- Add options/flags (e.g., `--template custom-template`)
- Add interactive prompts (using `prompts` package)
- Add post-install script to auto-run `pnpm install`

## Related Repositories

- **Template**: https://github.com/toddmoy/protobox
- **CLI Package**: https://github.com/toddmoy/create-protobox
- **NPM Package**: https://www.npmjs.com/package/create-protobox (after publishing)
