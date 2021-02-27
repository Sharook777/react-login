import { useState, useEffect } from "react";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [trySubmit, setTrySubmit] = useState(false);

  useEffect(() => {
    setErrors(validate(values));
    return () => {
      // setTrySubmit(false);
      // console.log(trySubmit);
    };
  }, [values]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && trySubmit) {
      callback();
    }
  }, [trySubmit]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setTrySubmit(true);
  };

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: { value: event.target.value, touch: true },
    }));
  };

  const reset = () => {
    setValues({});
    setErrors({});
    setTrySubmit(false);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    trySubmit,
    reset,
  };
};

export default useForm;
