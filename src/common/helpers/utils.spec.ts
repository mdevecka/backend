import { ImageData, urlCombine, delayExecution, sleep, resizeToLimit } from './utils';
import { Subject } from 'rxjs';
import * as sharp from 'sharp';

describe('utils', () => {

  it('urlCombine', () => {
    expect(urlCombine('test/something')).toBe('test/something');
    expect(urlCombine('test', 'something')).toBe('test/something');
    expect(urlCombine('test', '/something')).toBe('test/something');
    expect(urlCombine('/test', '/something')).toBe('/test/something');
    expect(urlCombine('/test/', '/something/')).toBe('/test/something/');
    expect(urlCombine('/test/', '/something/', 'else')).toBe('/test/something/else');
  });

  it('delayExecution', async () => {
    const sub = new Subject<number>();
    const result: number[] = [];
    sub.pipe(delayExecution(async (value) => {
      await sleep(30);
      result.push(value);
    })).subscribe();
    sub.next(1);
    sub.next(2);
    sub.next(3);
    await sleep(100);
    expect(result).toStrictEqual([1, 3]);
    sub.next(4);
    sub.next(5);
    await sleep(100);
    sub.complete();
    expect(result).toStrictEqual([1, 3, 4, 5]);
  });

  it('resizeToLimit', async () => {
    const buffer = await sharp({
      create: {
        width: 200,
        height: 100,
        channels: 4,
        background: { r: 255, g: 0, b: 0, alpha: 0.5 }
      }
    })
      .png()
      .toBuffer();
    const image: ImageData = { buffer: buffer, mimeType: "image/png" };
    const output = await resizeToLimit(image, 20000);
    expect(output).toEqual(image);
    const output2 = await resizeToLimit(image, 30000);
    expect(output2).toEqual(image);
    const output3 = await resizeToLimit(image, 15000);
    expect(output3).not.toEqual(image);
    const meta = await sharp(output3.buffer).metadata();
    expect(meta.width * meta.height).toBeLessThanOrEqual(15000);
    expect(meta.width / meta.height).toBeCloseTo(200 / 100, 1);
  });

});
