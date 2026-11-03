// Usage: PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs FFMPEG_PATH=/path/to/ffmpeg node scripts/render-equipment-loops.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { drawEquipment } from './equipment-animation.mjs';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const out = 'public/assets/tradeshow/motion/explainers';
await mkdir(out, { recursive: true });
try {
for (const kind of (process.env.KINDS ? process.env.KINDS.split(',') : ['softener', 'filter', 'pressure', 'dosing'])) {
  const page=await browser.newPage({viewport:{width:960,height:960}});
  await page.setContent('<canvas width="960" height="960"></canvas>');
  await page.evaluate(`window.drawEquipment=${drawEquipment.toString()}`);
  const ffmpeg=spawn(process.env.FFMPEG_PATH || 'ffmpeg', ['-y','-f','image2pipe','-vcodec','mjpeg','-framerate','24','-i','pipe:0','-an','-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',`${out}/${kind}.mp4`], {stdio:['pipe','ignore','pipe']});
  let log='';ffmpeg.stderr.on('data',x=>{log+=x;});
  const done=new Promise((resolve,reject)=>{ffmpeg.once('error',reject);ffmpeg.once('close',code=>code===0?resolve():reject(new Error(log)));});
  for(let frame=0;frame<192;frame++){
    const data=await page.evaluate(({kind,t})=>{const c=document.querySelector('canvas');window.drawEquipment(c.getContext('2d'),kind,t);return c.toDataURL('image/jpeg',.94).split(',')[1];},{kind,t:frame/24});
    if(frame===48) await writeFile(`${out}/${kind}.jpg`,Buffer.from(data,'base64'));
    if(!ffmpeg.stdin.write(Buffer.from(data,'base64')))await once(ffmpeg.stdin,'drain');
  }
  ffmpeg.stdin.end();await done;await page.close();console.log(`Rendered ${kind}: 8 s, 960 × 960, 24 fps`);
}
} finally { await browser.close(); }
