import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  VStack,
  Box,
  StackDivider,
  CardHeader,
  Heading,
  CardBody,
  Card,
  Text,
  Stack,
  Flex,
  HStack,
  FormControl,
  Button,
  useToast,
} from "@chakra-ui/react";
import PasswordInput from "./components/PasswordInput";
import PasswordLength from "./components/PasswordLength";
import PasswordSettings from "./components/PasswordSettings";
import { useMediaQuery } from "@chakra-ui/react";
import getPassword from "./utils/passwordGenerator";
import { passwordSettingsArr } from "./data/password-settings";
import "./utils/string";
function App() {
  const [password, setPassword] = useState("");
  const [passwordSettings, setPasswordSettings] = useState([
    passwordSettingsArr[0].value,
  ]);
  const [passwordLength, setPasswordLength] = useState(1);
  const [excludeText, setExcludeText] = useState("");
  const toast = useToast();

  const [isLargerThanPhone, isDisplayingInBrowser] = useMediaQuery([
    "(min-width: 768px)",
    "(display-mode: browser)",
  ]);

  const changePassword = (newPassword) => {
    if (newPassword.trim().length !== 0) {
      setPassword(() => newPassword);
    }
  };

  const checkAndRunFunction = (func) => {
    if (password.trim().length === 0) {
      showToast({
        title: "Password Is Empty!",
        description: "Cannot copy or shuffle password because it's empty",
        status: "warning",
      });
    } else {
      func();
    }
  };

  const onCopyButtonClickHandler = () => {
    checkAndRunFunction(() => {
      navigator.clipboard.writeText(password);
      showToast({
        title: "Password Copied!",
        description: "Password succesfully copied to your clipboard !",
        status: "success",
      });
    });
  };
  const onChangeCheckboxHandler = (value) => {
    setPasswordSettings(() => value);
  };
  const onSliderChangeHandler = (value) => {
    setPasswordLength(() => value);
  };

  const onChangeExcludeTextHandler = (value) => {
    setExcludeText(() => value);
  };

  const onShuffleButtonHandler = () => {
    checkAndRunFunction(() => {
      showToast({
        title: "Password Shuffled!",
        description: "Password has been shuffled",
        status: "success",
      });
      changePassword(password.shuffle());
    });
  };

  const onChangePasswordInputHandler = (value) => {
    changePassword(value);
    setPasswordLength(() => password.length);
  };
  const showToast = ({ title, description, status }) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 2500,
      isClosable: true,
    });
  };

  const onClickHandler = async () => {
    let generatedPassword = await getPassword({
      length: passwordLength,
      lowercase: passwordSettings.includes("lowercase"),
      uppercase: passwordSettings.includes("uppercase"),
      numbers: passwordSettings.includes("numbers"),
      symbols: passwordSettings.includes("symbols"),
      exclude: passwordSettings.includes("exclude") ? excludeText : "",
    });
    console.log(generatedPassword);
    setPassword(() => generatedPassword);
  };

  return (
    <div className="App">
      <Card width={isLargerThanPhone ? "768px" : "480px"}>
        <Stack divider={<StackDivider />} spacing="1">
          <CardHeader>
            <Heading size="md">Password Generator</Heading>
          </CardHeader>

          <CardBody>
            <FormControl>
              <Stack divider={<StackDivider />} spacing="4">
                <Box py={2}>
                  <PasswordInput
                    password={password}
                    onShuffleButtonClick={onShuffleButtonHandler}
                    showToast={showToast}
                    onChangePasswordInput={onChangePasswordInputHandler}
                    onCopyButtonClick={onCopyButtonClickHandler}
                  />
                </Box>
                <HStack divider={<StackDivider />} spacing={5} align="stretch">
                  <Box w="full">
                    <PasswordLength
                      passwordLength={passwordLength}
                      onSliderChange={onSliderChangeHandler}
                    />
                    <Button w="full" mt={6} onClick={onClickHandler}>
                      Generate Password
                    </Button>
                  </Box>
                  <Box w={"full"}>
                    <PasswordSettings
                      onChangeCheckbox={onChangeCheckboxHandler}
                      passwordSettings={passwordSettings}
                      onChangeExcludeText={onChangeExcludeTextHandler}
                      excludeText={excludeText}
                    />
                  </Box>
                </HStack>
              </Stack>
            </FormControl>
          </CardBody>
        </Stack>
      </Card>
    </div>
  );
}

export default App;
