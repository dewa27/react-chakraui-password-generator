import React from "react";
import { Stack, useEditableControls } from "@chakra-ui/react";
import {
  ButtonGroup,
  IconButton,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  Tooltip,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { BiShuffle } from "react-icons/bi";
function PasswordInput({
  password,
  onShuffleButtonClick,
  onCopyButtonClick,
  showToast,
  onChangePasswordInput,
}) {
  /* Here's a custom control */

  const onShuffleButtonClickHandler = () => {
    onShuffleButtonClick();
  };

  const onChangePasswordInputHandler = (value) => {
    onChangePasswordInput(value);
  };

  return (
    <Flex justifyContent="space-between" gap={2}>
      <Editable
        w="full"
        value={password}
        border="1px"
        borderRadius={5}
        borderColor="gray.200"
        onChange={onChangePasswordInputHandler}
      >
        <EditablePreview p={2} w="full" h="full" />
        <EditableInput p={2} />
      </Editable>
      <Tooltip
        borderRadius={5}
        hasArrow
        label="Shuffle Password"
        bg="gray.200"
        color="black"
      >
        <IconButton
          icon={<BiShuffle />}
          onClick={onShuffleButtonClickHandler}
        />
      </Tooltip>
      <Tooltip
        borderRadius={5}
        hasArrow
        label="Copy to Clipboard"
        bg="gray.200"
        color="black"
      >
        <IconButton icon={<CopyIcon />} onClick={onCopyButtonClick} />
      </Tooltip>
    </Flex>
  );
}

export default PasswordInput;
