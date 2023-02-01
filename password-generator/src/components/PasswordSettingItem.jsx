import React from "react";
import { Checkbox } from "@chakra-ui/react";
function PasswordSettingItem({ value, children }) {
  return <Checkbox value={value}>{children}</Checkbox>;
}

export default PasswordSettingItem;
