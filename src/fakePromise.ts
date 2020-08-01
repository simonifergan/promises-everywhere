interface Config {
  reject?: boolean;
  timeout?: number;
  response?: any;
}

export function fakePromise(options: Config = {}): Promise<any> {
  const { timeout = 200, reject = false, response } = options;
  return new Promise((res, rej) => {
    setTimeout(() => {
      reject ? rej(response || false) : res(response || true);
    }, timeout);
  });
}

export default fakePromise;
