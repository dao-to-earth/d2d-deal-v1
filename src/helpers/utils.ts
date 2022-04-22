import pkg from '@/../package.json'

export function clone(item) {
  return JSON.parse(JSON.stringify(item));
}

export async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export function jsonParse(input: any, fallback?: any) {
  if (typeof input !== 'string') {
    return fallback || {}
  }
  try {
    return JSON.parse(input)
  } catch (e) {
    return fallback || {}
  }
}

export function lsSet(key: string, value: any) {
  return localStorage.setItem(`${pkg.name}.${key}`, JSON.stringify(value))
}

export function lsGet(key: string, fallback?: any) {
  const item = localStorage.getItem(`${pkg.name}.${key}`)
  return jsonParse(item, fallback)
}

export function lsRemove(key: string) {
  return localStorage.removeItem(`${pkg.name}.${key}`)
}
