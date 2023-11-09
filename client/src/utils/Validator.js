const validator = (data) => {
//   console.log("unvalidated:", data);

  const keys = Object.keys(data);
  console.log(keys);
  keys.map((key) => {
    if (data[key] === "") {
      delete data[key];
    }
  });

  //   console.log("validated:", data);
  return data;
};

export { validator };
