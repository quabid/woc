export const isString = arg => {
  return (
    typeof arg === 'string' && undefined != arg && null != arg && arg.length > 0
  );
};

export const stringLength = arg => arg.length;

export const contains = (arg, search) => arg.includes(search);

export const isMethod = arg =>
  typeof arg === 'method' &&
  typeof arg === 'method' &&
  undefined != arg &&
  null != arg;
