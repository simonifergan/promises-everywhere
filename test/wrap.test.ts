import { wrap } from '../src/wrap';

describe('wrap function', () => {
  const ERROR_MESSAGE_DIVIDE_BY_ZERO: string = 'cannot divide by zero';
  const someCallbackBaseFunction = (
    a: number,
    b: number,
    cb: Function
  ): void => {
    try {
      if (b === 0) throw new Error(ERROR_MESSAGE_DIVIDE_BY_ZERO);
      let result = a / b;
      cb(null, result);
    } catch (e) {
      cb(e);
    }
  };

  it('callback base function should have error-first params', async () => {
    someCallbackBaseFunction(6, 2, (err: any, data: any) => {
      expect(err).toEqual(null);
      expect(data).toEqual(3);
    });
    someCallbackBaseFunction(6, 0, (err: any) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toEqual(ERROR_MESSAGE_DIVIDE_BY_ZERO);
    });
  });

  it('Should return a function that when called returns a promise', async () => {
    const wrappedFunction = wrap(someCallbackBaseFunction);
    const promise = wrappedFunction(10, 5);
    expect(promise).toBeInstanceOf(Promise);
    const response = await promise;
    await expect(response).toBe(2);
  });

  it('Should reject when error', async () => {
    const wrappedFunction = wrap(someCallbackBaseFunction);
    const promise = wrappedFunction(10, 0);
    expect(promise).toBeInstanceOf(Promise);

    let isThrown = false;
    try {
      await promise;
    } catch (e) {
      isThrown = true;
    }

    expect(isThrown).toEqual(true);
  });
});
