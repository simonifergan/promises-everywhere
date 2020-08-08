import { aggregate, fake } from '../src';

describe('keyByPromises function', () => {
  const cbkFunction = (value: any): Promise<any> => {
    return fake({
      timeout: 1,
      response: {
        value,
        happened: true,
      },
    });
  };
  it('should return keyByPromises', async () => {
    const keyByValue = {
      promiseOne: 'sendMe',
      promiseTwo: 'sendMeToo',
    };

    const keyByPromisesResult = await aggregate(keyByValue, cbkFunction);
    expect(keyByPromisesResult).toEqual({
      promiseOne: {
        value: 'sendMe',
        happened: true,
      },
      promiseTwo: {
        value: 'sendMeToo',
        happened: true,
      },
    });
  });
});
