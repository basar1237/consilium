import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const WIDTH = 1200
const HEIGHT = 630

const logoBuffer = readFileSync(join(publicDir, 'logo.png'))
const logoMeta = await sharp(logoBuffer).metadata()

const targetLogoWidth = 820
const scale = targetLogoWidth / logoMeta.width
const targetLogoHeight = Math.round(logoMeta.height * scale)

const resizedLogo = await sharp(logoBuffer)
  .resize(targetLogoWidth, targetLogoHeight, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png()
  .toBuffer()

const logoLeft = Math.round((WIDTH - targetLogoWidth) / 2)
const logoTop = Math.round((HEIGHT - targetLogoHeight) / 2) - 20

const accentBarSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="#ffffff"/>
  <rect x="0" y="${HEIGHT - 8}" width="${WIDTH}" height="8" fill="#2B7DE9"/>
  <text x="${WIDTH / 2}" y="${HEIGHT - 70}"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="28"
        fill="#1A1A2E"
        text-anchor="middle"
        letter-spacing="2">
    UK Risk Management Experts
  </text>
</svg>`

await sharp(Buffer.from(accentBarSvg))
  .composite([{ input: resizedLogo, left: logoLeft, top: logoTop }])
  .webp({ quality: 92 })
  .toFile(join(publicDir, 'og-image.webp'))

console.log('og-image.webp generated at', join(publicDir, 'og-image.webp'))
