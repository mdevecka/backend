import { urlCombine, delayExecution, sleep } from './utils';
import { Subject } from 'rxjs';

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

});
