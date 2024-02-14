import { test } from 'vitest';
import { readFile } from 'fs/promises';
import sharp from 'sharp';

test('svg-flattening', async () => {
  const numberOfImages = 100;
  const range = [...Array(numberOfImages).keys()];

  let pngTimeTotal = 0;
  let resizeTimeTotal = 0;
  let saveTimeTotal = 0;
  

  for (const id of range) {
    const svgString = await readFile('public/customNameAlignment.svg', 'utf-8');

    const newSvgString = svgString.replaceAll("{ customerFirstName }", `customer${id}`);
    const svgBuffer = Buffer.from(newSvgString);

    const startTime = performance.now();

    const png = sharp(svgBuffer).png();
    const pngTime = performance.now();
    pngTimeTotal += (pngTime - startTime);

    const resize = png.resize(900, 1600);
    const resizeTime = performance.now();
    resizeTimeTotal += (resizeTime - pngTime);

    await resize.toFile(`screenshots/svg2png-customer${id}.png`);
    const saveTime = performance.now();

    saveTimeTotal += (saveTime-resizeTime);
  }

  console.log(`Average SVG to PNG conversion: ${pngTimeTotal / 100}ms`);
  console.log(`Average resize: ${resizeTimeTotal / 100}ms`);
  console.log(`Average save to file: ${saveTimeTotal / 100}ms`);
}, 60*60*1000);
