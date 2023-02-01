const passwordSettingsArr = [
  { name: "Lowercase (a-z)", value: "lowercase" },
  { name: "Numbers (0-9)", value: "numbers" },
  { name: "Uppercase (A-Z)", value: "uppercase" },
  { name: "Symbols (^&*$)", value: "symbols" },
  { name: "Exclude", value: "exclude" },
];
const passwordSettingsValue = passwordSettingsArr.map(
  (setting) => setting.value
);
export { passwordSettingsArr, passwordSettingsValue };
