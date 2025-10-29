#!/usr/bin/env node

import { downloadTemplate } from 'giget';
import { existsSync, readFileSync, writeFileSync, cpSync } from 'fs';
import { join, resolve } from 'path';
import pc from 'picocolors';

// Allow local template for testing via environment variable
const TEMPLATE_REPO = process.env.PROTOBOX_TEMPLATE || 'github:toddmoy/protobox';

async function main() {
  const args = process.argv.slice(2);

  // Get project name from arguments or default
  let projectName = args[0];

  if (!projectName) {
    console.log(pc.red('✖'), 'Project name is required');
    console.log();
    console.log('Usage:', pc.cyan('npm create protobox@latest'), pc.green('<project-name>'));
    console.log();
    console.log('Example:', pc.cyan('npm create protobox@latest'), pc.green('my-app'));
    process.exit(1);
  }

  // Resolve target directory
  const targetDir = resolve(process.cwd(), projectName);

  // Check if directory already exists
  if (existsSync(targetDir)) {
    console.log(pc.red('✖'), `Directory ${pc.cyan(projectName)} already exists`);
    process.exit(1);
  }

  console.log();
  console.log(pc.cyan('◆'), 'Creating a new Protobox project in', pc.green(projectName));
  console.log();

  try {
    // Check if using local template (for testing)
    const isLocal = TEMPLATE_REPO.startsWith('/') || TEMPLATE_REPO.startsWith('file://');

    if (isLocal) {
      // Use simple copy for local template
      console.log(pc.gray('  Copying template...'));
      const templatePath = TEMPLATE_REPO.replace('file://', '');
      cpSync(templatePath, targetDir, {
        recursive: true,
        filter: (src) => {
          // Skip node_modules, .git, and build artifacts
          const skip = ['node_modules', '.git', 'dist', '.DS_Store'];
          return !skip.some(dir => src.includes(dir));
        }
      });
    } else {
      // Download template using giget
      console.log(pc.gray('  Downloading template...'));
      await downloadTemplate(TEMPLATE_REPO, {
        dir: targetDir,
        offline: false,
        preferOffline: false,
      });
    }

    // Update package.json with new project name
    console.log(pc.gray('  Updating package.json...'));
    const packageJsonPath = join(targetDir, 'package.json');
    if (existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      packageJson.name = projectName;
      writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    }

    console.log();
    console.log(pc.green('✔'), 'Project created successfully!');
    console.log();
    console.log('Next steps:');
    console.log();
    console.log('  1. Navigate to your project:');
    console.log(pc.cyan(`     cd ${projectName}`));
    console.log();
    console.log('  2. Install dependencies:');
    console.log(pc.cyan('     pnpm install'));
    console.log();
    console.log('  3. Start the development server:');
    console.log(pc.cyan('     pnpm dev'));
    console.log();
    console.log(pc.dim('  Happy prototyping! 🚀'));
    console.log();

  } catch (error) {
    console.log();
    console.log(pc.red('✖'), 'Failed to create project');
    console.error(pc.red(error.message));
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
