const fs = require('fs');
const path = require('path');

const dir = '/Users/rockwu/Projects/github-rockkiwis';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !['index.html', 'tugofwar.html'].includes(f));

const patternsToRemove = [
    /:root\s*\{[^}]*\}/g,
    /\*\s*\{[^}]*\}/g,
    /body,\s*html\s*\{[^}]*\}/g,
    /body\s*\{[^}]*\}/g,
    /\.sound-toggle\s*\{[^}]*\}/g,
    /\.exit-btn\s*\{[^}]*\}/g,
    /#ui-layer\s*\{[^}]*\}/g,
    /\.hud-box\s*\{[^}]*\}/g,
    /#score-display\s*\{[^}]*\}/g,
    /#lives-display\s*\{[^}]*\}/g,
    /#combo-hud\s*\{[^}]*\}/g,
    /\.combo-active\s*\{[^}]*\}/g,
    /#level-hud\s*\{[^}]*\}/g,
    /#question-board\s*\{[^}]*\}/g,
    /\.blank-space\s*\{[^}]*\}/g,
    /#start-overlay,\s*#end-msg\s*\{[^}]*\}/g,
    /#start-overlay\s*\{[^}]*\}/g,
    /#end-msg\s*\{[^}]*\}/g,
    /\.name-input\s*\{[^}]*\}/g,
    /\.start-btn\s*\{[^}]*\}/g,
    /\.start-btn:active\s*\{[^}]*\}/g,
    /select\.theme-select\s*\{[^}]*\}/g,
    /select\.theme-select option,\s*select\.theme-select optgroup\s*\{[^}]*\}/g,
    /\.result-panel\s*\{[^}]*\}/g,
    /\.board-row\s*\{[^}]*\}/g,
    /#error-flash\s*\{[^}]*\}/g,
    /#error-msg\s*\{[^}]*\}/g,
    // Catch single line media queries from older files
    /@media[^{]+\{\s*\.sound-toggle[^}]+\}\s*\.exit-btn[^}]+\}[^}]+\}/g,
];

let totalModifications = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // We only want to clean inside <style>...</style>
    const styleRegex = /<style>([\s\S]*?)<\/style>/i;
    const match = html.match(styleRegex);
    
    if (match) {
        let styleContent = match[1];
        
        patternsToRemove.forEach(pattern => {
            styleContent = styleContent.replace(pattern, '');
        });

        // Clean up empty lines
        styleContent = styleContent.replace(/^\s*[\r\n]/gm, '');

        html = html.replace(styleRegex, `<style>\n${styleContent}\n    </style>`);
        
        // Ensure body has the with-ambient-bg class if it doesn't have a canvas
        // Wait, most games have canvas, but some don't.
        // Let's just add it to all, canvas will cover it anyway if it's z-index: 10 and opaque.
        // But let's just let common.css handle it. I added body.with-ambient-bg in common.css
        
        fs.writeFileSync(filePath, html);
        totalModifications++;
        console.log(`Cleaned ${file}`);
    }
}

console.log(`Finished processing ${totalModifications} files.`);
