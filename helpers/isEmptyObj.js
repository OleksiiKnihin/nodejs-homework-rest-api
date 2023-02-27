const isEmptyObj = (obj) => {
  if (Object.getOwnPropertyNames(obj).length) {
    return false;
  } else {
    return true;
  }
};

module.exports = isEmptyObj;
