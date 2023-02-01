import React, { useState } from "react";
import {
  CheckboxGroup,
  Checkbox,
  Stack,
  Grid,
  GridItem,
  Input,
  Flex,
} from "@chakra-ui/react";
import { passwordSettingsArr } from "../data/password-settings";
import PasswordSettingItem from "./PasswordSettingItem";
import PropTypes from "prop-types";
import _, { debounce } from "lodash";

function PasswordSettings({
  onChangeCheckbox,
  passwordSettings,
  onChangeExcludeText,
  excludeText,
}) {
  const [isExcludeShown, setIsExcludeShown] = useState(false);
  const onCheckboxGroupChange = (value) => {
    onChangeCheckbox(value);
    setIsExcludeShown(() => value.includes("exclude"));
  };

  const onChangeExcludeTextHandler = (e) => {
    let value, newExcludeText;
    value = e.target.value;
    newExcludeText = Array.from(new Set(value.toLowerCase().split(""))).join(
      ""
    );
    if (excludeText != newExcludeText) {
      onChangeExcludeText(newExcludeText);
    }
  };
  return (
    <CheckboxGroup
      colorScheme="green"
      onChange={onCheckboxGroupChange}
      defaultValue={passwordSettings}
    >
      <Grid
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={5}
      >
        {passwordSettingsArr.map((setting, index) => {
          if (index !== passwordSettingsArr.length - 1) {
            return (
              <GridItem w="100%" key={setting.value}>
                <PasswordSettingItem value={setting.value}>
                  {setting.name}
                </PasswordSettingItem>
              </GridItem>
            );
          } else {
            return (
              <GridItem w="100%" colSpan={2} key={setting.value}>
                <Flex alignItems="center" gap={4}>
                  <PasswordSettingItem value={setting.value}>
                    {setting.name}
                  </PasswordSettingItem>
                  {isExcludeShown && (
                    <Input
                      variant="flushed"
                      placeholder="Any characters to exclude"
                      h="full"
                      value={excludeText}
                      fontSize={14}
                      onChange={onChangeExcludeTextHandler}
                    />
                  )}
                </Flex>
              </GridItem>
            );
          }
        })}
      </Grid>
      {/* <Stack spacing={[1, 5]} direction={["column", "row"]}>
        <Checkbox value="naruto">Naruto</Checkbox>
        <Checkbox value="sasuke">Sasuke</Checkbox>
      </Stack> */}
    </CheckboxGroup>
  );
}
PasswordSettings.propTypes = {
  onChangeCheckbox: PropTypes.func.isRequired,
  passwordSettings: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default PasswordSettings;
