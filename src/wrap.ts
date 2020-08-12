type AsyncFunctionType = (...args: any[]) => Promise<any>;

export function wrap(func: Function): AsyncFunctionType {
  return function(...args: any[]) {
    return new Promise((resolve, reject) => {
      const callbackBaseFunctionParams = [
        ...args,
        (err: Error, ...cbArgs: any[]) => {
          if (err) {
            reject(err);
          } else {
            resolve(...cbArgs);
          }
        },
      ];
      try {
        func.apply(null, callbackBaseFunctionParams);
      } catch (e) {
        reject(e);
      }
    });
  };
}

export default wrap;
