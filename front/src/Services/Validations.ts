export default {
  isStringEmpty: (value: string) => !value || typeof value != "string",
  isArrayEmpty: (arr: any) => Array.isArray(arr) && !arr.length,
};
