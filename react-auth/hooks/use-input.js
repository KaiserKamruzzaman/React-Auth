import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouch, setIsTouch] = useState(false);
  const isValid = validateValue(enteredValue);
  const hasError = !isValid && isTouch;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouch(true);
  };

  const reset = () => {
      setEnteredValue('');
      setIsTouch(false);
  }

  return {
    value: enteredValue,
    isValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
