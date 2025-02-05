const fs = require('fs');
const path = require('path');

// Get arguments from the command line
const args = process.argv.slice(2);
const components = args;

if (components.length === 0) {
  console.log('Please specify component names.');
  process.exit(1);
}

const componentsDir = path.join(__dirname, 'components');
const appJsPath = path.join(__dirname, 'js', 'app.js');
const styleCssPath = path.join(__dirname, 'css', 'style.css');

// Function to create directories and files
function createComponent(name) {
  const componentDir = path.join(componentsDir, name);

  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
    console.log(`Directory created: ${componentDir}`);
  }

  const cssFile = path.join(componentDir, `${name}.css`);
  const jsFile = path.join(componentDir, `${name}.js`);

  if (!fs.existsSync(cssFile)) {
    fs.writeFileSync(cssFile, `/* Styles for ${name} */\n`);
    console.log(`File created: ${cssFile}`);
  }

  if (!fs.existsSync(jsFile)) {
    fs.writeFileSync(jsFile, `// Logic for ${name}\n`);
    console.log(`File created: ${jsFile}`);
  }

  return { cssFile, jsFile };
}

// Update app.js file
function updateAppJs(imports) {
  let content = '';
  if (fs.existsSync(appJsPath)) {
    content = fs.readFileSync(appJsPath, 'utf-8');
  }

  imports.forEach(({ jsFile }) => {
    const relativePathJs = `../components/${path.basename(path.dirname(jsFile))}/${path.basename(jsFile)}`;
    const importStatementJs = `import '${relativePathJs.replace(/\\/g, '/')}';`;
    if (!content.includes(importStatementJs)) {
      content = `${importStatementJs}\n${content}`;
    }

    const relativePathCss = `../components/${path.basename(path.dirname(jsFile))}/${path.basename(jsFile)}`;
    const importStatementCss = `import '${relativePathCss.replace(/\\/g, '/')}';`.replace('.js', '.css');
    if (!content.includes(importStatementCss)) {
      content = `${importStatementCss}\n${content}`;
    }
  });

  fs.writeFileSync(appJsPath, content.trim() + '\n');
  console.log('app.js updated');
}

// Update style.css file
function updateStyleCss(imports) {
  let content = '';
  if (fs.existsSync(styleCssPath)) {
    content = fs.readFileSync(styleCssPath, 'utf-8');
  }

  imports.forEach(({ cssFile }) => {
    const relativePath = `../components/${path.basename(path.dirname(cssFile))}/${path.basename(cssFile)}`;
    const importStatement = `@import '${relativePath.replace(/\\/g, '/')}';`;
    if (!content.includes(importStatement)) {
      content = `${importStatement}\n${content}`;
    }
  });

  fs.writeFileSync(styleCssPath, content.trim() + '\n');
  console.log('style.css updated');
}

// Main process
const imports = components.map(createComponent);
updateAppJs(imports);
updateStyleCss(imports);
