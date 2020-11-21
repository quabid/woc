class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class CustomError extends MyError {
  constructor(message, cause = 'Internal error') {
    super(message);
    this.name = 'CustomError';
    this.cause = cause;
  }
}

export class PropertyRequiredError extends CustomError {
  constructor(property, cause = 'Object is missing a requred property') {
    super(`Missing property: ${property}`, cause);
    this.name = 'PropertyMissingError';
    this.property = property;
  }
}

export class InvalidVariableError extends CustomError {
  constructor(message, cause = `Variable is either null or undefined`) {
    super(message, cause);
    this.name = 'InvalidVariableError';
  }
}

export class InvalidMethodError extends CustomError {
  constructor(message, cause = 'Argument is not a function') {
    super(message, cause);
    this.name = 'InvalidMethodError';
  }
}
