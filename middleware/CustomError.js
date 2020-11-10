export class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

export class PropertyRequiredError extends CustomError {
  constructor(property) {
    super(`No property: ${property}`);
    this.name = 'PropertyRequiredError';
    this.property = property;
  }
}

const user = { name: 'rick' };

function test() {
  throw new CustomError('test function throws an error');
}

function test2() {
  if (!user.age) {
    throw new PropertyRequiredError('age');
  }
  if (!user.email) {
    throw new PropertyRequiredError('email');
  }
}

try {
  test2();
} catch (err) {
  console.log(err.message);
  console.log(`Error name: ${err.name}`);
  console.log(`Error Stack: ${err.stack}`);
}
