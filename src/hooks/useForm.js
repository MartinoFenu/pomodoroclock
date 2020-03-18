import { useState, useEffect, useCallback } from 'react';

const useForm = ( obj, defVal, callback ) => {
  const [ values, setValues ] = useState(defVal || {}) ;

  useEffect(() => {
    setValues({...defVal})
  }, [defVal])

  const handleChange = useCallback(e => {
    if(e.target.type === 'checkbox') {
      setValues({
        ...values,
        [e.target.name]: !values.showOnTitle
      });
      callback.checkbox(e);
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
      callback.general(e)
    }
  }, [values, callback]);
  //create object with every input needed and the relative onChange function
  const formElements = {};
  for(let key in obj){
    if(obj[key].type === 'checkbox') {
      formElements[key] = {
        ...obj[key],
        value: key,
        checked: values[key],
        onChange: e => handleChange(e)
      }
    } else {
      formElements[key] = {
        ...obj[key],
        value: values[key],
        onChange: e => handleChange(e)
      }
    }

  }
  return [
    formElements
  ]
}

export default useForm;
