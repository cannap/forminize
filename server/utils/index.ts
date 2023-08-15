import { customAlphabet } from 'nanoid';

const nanoId = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
);

export const generateId = () => nanoId();

/**
 *
 * @param array1 This is the array where we are searching in
 * @param array2
 * @param key
 */
export const findMissingItems = <T, K extends keyof T>(
  array1: T[] | undefined,
  array2: { [key in K]: any }[] | undefined,
  key: K
): T[] => {
  if (!array1 || !array2) {
    return [];
  }
  const array2KeyValues = array2.map((arr2) => arr2[key]);

  return array1.filter((arr1) => {
    return !array2KeyValues.includes(arr1[key]);
  });
};
