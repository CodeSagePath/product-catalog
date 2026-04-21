function errorFormatter(error) {
  const errors = error.errors;
  const formattedErrors = [];

  for (const key in errors) {
    formattedErrors.push(
      {
        // computed property:- dynamically creating key's from the object
        [key]: errors[key].message
      }
    );
  }
  return formattedErrors;
}

const error = {
  "errors": {
    "name": {
      "name": "ValidatorError",
      "message": "name should not be empty",
      "properties": {
        "message": "name should not be empty",
        "type": "required",
        "path": "name",
        "value": "",
        "length": 0
      },
      "kind": "required",
      "path": "name",
      "value": ""
    },
    "price": {
      "name": "ValidatorError",
      "message": "price is required",
      "properties": {
        "message": "price is required",
        "type": "required",
        "path": "price",
        "value": null
      },
      "kind": "required",
      "path": "price",
      "value": null
    }
  },
  "_message": "Product validation failed",
  "name": "ValidationError",
  "message": "Product validation failed: name: name should not be empty, price: price is required"
}

console.log(errorFormatter(error)); // [ { name: "name should not be empty"}, { price: "price is required"} ]
