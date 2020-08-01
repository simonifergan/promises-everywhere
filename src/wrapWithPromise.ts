import CallbackFunctionType from './Types/CallbackFunction.type';

export function wrapWithPromise(
  cbkFunction: CallbackFunctionType
): CallbackFunctionType {
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

export default wrapWithPromise;
