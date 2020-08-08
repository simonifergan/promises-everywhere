import { fake } from '../src/fake';

describe('fake function', () => {
  it('should return a resolved promise with a boolean true as value', async () => {
    await expect(fake({ timeout: 1 })).resolves.toBeTruthy;
  });

  it('should return a resolved promise with a custom response value', async () => {
    await expect(
      fake({
        timeout: 1,
        response: { a: 1, b: 2 },
      })
    ).resolves.toEqual({ a: 1, b: 2 });
  });

  it('should return a rejected promise with boolean false as value', async done => {
    try {
      await fake({ timeout: 1, reject: true });
    } catch (e) {
      expect(e).toBeFalsy;
      done();
    }
  });

  it('should return a rejected promise with a custom response', async done => {
    const responseMessage = 'I am an error message';
    const response = new Error(responseMessage);

    try {
      await fake({
        timeout: 1,
        reject: true,
        response,
      });
    } catch (e) {
      expect(e).toHaveProperty('message', responseMessage);
      done();
    }
  });

  it('should be invoked with the default timeout', async () => {
    jest.useFakeTimers();

    fake();

    jest.advanceTimersByTime(210);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 200);
  });

  it('should be invoked with a custom timeout', async () => {
    jest.useFakeTimers();
    const timeout = 2500;

    fake({
      timeout,
    });

    jest.advanceTimersByTime(timeout);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout);
  });
});
