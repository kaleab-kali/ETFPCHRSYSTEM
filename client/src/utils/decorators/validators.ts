// validators.ts
type ValidationFn = (value: any) => string | boolean;

export function required(message: string): ValidationFn {
  return (value: any) => (value ? true : message);
}

export function minLength(min: number, message: string): ValidationFn {
  return (value: string) => (value.length >= min ? true : message);
}

export function isNumber(message: string): ValidationFn {
  return (value: any) => (!isNaN(value) ? true : message);
}

export function minNumber(min: number, message: string): ValidationFn {
  return (value: number) => (value >= min ? true : message);
}
