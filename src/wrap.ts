type CallbackFunctionType = (...args: any[]) => any;
type AsyncFunctionType = (...args: any[]) => Promise<any>;

export function wrap(cbkFunction: CallbackFunctionType): AsyncFunctionType {
  return (...args: any[]): Promise<any> => {
    return new Promise((res, rej) => {
      try {
        const cbkFunctionResult = cbkFunction.apply(null, args);
        res(cbkFunctionResult);
      } catch (e) {
        rej(e);
      }
    });
  };
}

export default wrap;
