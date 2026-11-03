// Renders public/og-default.png (1200x630). Re-run with `node scripts/generate-og-image.mjs`
// after changing the copy or colors below; these mirror the tokens in src/styles/tokens.css.
import sharp from 'sharp';

const colors = { bg: '#0b1a24', home: '#004c54', away: '#041e42', gold: '#ffb81c', text: '#f4f6f7', muted: '#a9b6bd' };

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${colors.bg}"/>
  <rect width="600" height="24" fill="${colors.home}"/>
  <rect x="600" width="600" height="24" fill="${colors.away}"/>
  <text x="80" y="250" font-family="Impact, 'Arial Narrow', sans-serif" font-size="150" fill="${colors.text}" letter-spacing="2">JIMMY KANE</text>
  <text x="80" y="330" font-family="'Arial Narrow', Arial, sans-serif" font-weight="700" font-size="40" fill="${colors.gold}" letter-spacing="6">IOS DEVELOPER · TECHNICAL PROJECT MANAGER</text>
  <rect x="80" y="380" width="160" height="6" fill="${colors.gold}"/>
  <text x="80" y="450" font-family="Arial, sans-serif" font-size="32" fill="${colors.muted}">Home: Philly · Away: State College</text>
  <rect y="606" width="1200" height="24" fill="${colors.home}"/>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(new URL('../public/og-default.png', import.meta.url).pathname);
