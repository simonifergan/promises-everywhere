interface Config {
  reject?: boolean;
  timeout?: number;
  response?: any;
}

export function fake(config: Config = {}): Promise<any> {
  const { timeout = 200, reject = false, response } = config;
  return new Promise((res, rej) => {
    setTimeout(() => {
      reject ? rej(response || false) : res(response || true);
    }, timeout);
  });
}

export default fake;
