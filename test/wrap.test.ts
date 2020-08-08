import { wrap } from '../src/wrap';

describe('wrap function', () => {
  it('Should return a function that when called returns a promise', async () => {
    const someFunction = (a: number, b: number): number => {
      return a + b;
    };

    const wrappedFunction = wrap(someFunction);
    expect(wrappedFunction(1, 2)).toBeInstanceOf(Promise);
    await expect(wrappedFunction(1, 2)).resolves.toBe(3);
  });

  it('Should return a function that when invoked will also reject', async () => {
    const errorMsg = 'always rejects';
    const alwaysReject = (): ErrorEvent => {
      throw new Error(errorMsg);
    };

    const wrappedFunction = wrap(alwaysReject);

    await expect(wrappedFunction()).rejects.toThrowError(errorMsg);
  });
});
