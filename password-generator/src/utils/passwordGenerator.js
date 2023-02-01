import generator from "secure-random-password";
const getPassword = async ({
  length,
  lowercase,
  uppercase,
  numbers,
  symbols,
  exclude = "",
}) => {
  let charactersSetting = [];
  let excludeString = `${lowercase ? exclude.toLowerCase() : ""}${
    uppercase ? exclude.toUpperCase() : ""
  }`;
  console.log(excludeString);
  if (lowercase) {
    charactersSetting.push(generator.lower);
  }
  if (uppercase) {
    charactersSetting.push(generator.upper);
  }
  if (numbers) {
    charactersSetting.push(generator.digits);
  }
  if (symbols) {
    charactersSetting.push(generator.symbols);
  }
  return exclude.trim().length != 0
    ? generator.randomPassword({
        length: length,
        characters: charactersSetting,
        predicate: (x) => x.match(`^[^${excludeString}]*$`),
      })
    : generator.randomPassword({
        length: length,
        characters: charactersSetting,
      });
};
export default getPassword;
