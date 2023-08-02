export const useRefReset = <T>(defaultValue: T) => {
  let value: T = defaultValue;

  const initalialValue = () => {
    return defaultValue;
  };

  const state = ref(initalialValue());

  const reset = () => {
    value = initalialValue();
    console.log(value);
  };
  return { state, reset };
};
