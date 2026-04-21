const errorsFormatter = (errors) => {
  const formattedErrors = [];
  
  for (const key in errors) {
    const errorObject = { [key]: errors[key].message };
    formattedErrors.push(errorObject);
  }
  
  return formattedErrors;
};

export default errorsFormatter;

//// COMMON JS:
// module.export = errorsFormatter
