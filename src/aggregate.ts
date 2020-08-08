type CallbackFunctionType = (...args: any[]) => Promise<any>;

interface KeyByPromise {
  [key: string]: Promise<any>;
}

export async function aggregate(
  keyByArgs: object,
  clbck: CallbackFunctionType
): Promise<object> {
  return new Promise(async res => {
    const keyByPromise: KeyByPromise = {};
    const promises = Object.entries(keyByArgs).map(([key, value]) => {
      const promise = clbck(value);
      promise
        .then(promiseResolvedResponse => {
          keyByPromise[key] = promiseResolvedResponse;
        })
        .catch(promiseRejectedResponse => {
          keyByPromise[key] = promiseRejectedResponse;
        });
      return promise;
    });
    await Promise.all(promises);
    res(keyByPromise);
  });
}

export default aggregate;
