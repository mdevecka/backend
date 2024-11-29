import { urlCombine } from './utils';

describe('utils', () => {

  it('urlCombine', () => {
    expect(urlCombine('test/something')).toBe('test/something');
    expect(urlCombine('test', 'something')).toBe('test/something');
    expect(urlCombine('test', '/something')).toBe('test/something');
    expect(urlCombine('/test', '/something')).toBe('/test/something');
    expect(urlCombine('/test/', '/something/')).toBe('/test/something/');
    expect(urlCombine('/test/', '/something/', 'else')).toBe('/test/something/else');
  });

});
