export function log(obj: { } | string) {
  const entry = typeof obj === 'string' ? { msg: obj } : obj
  // tslint:disable-next-line: no-console
  console.log({ ...entry, time: new Date() })
}
