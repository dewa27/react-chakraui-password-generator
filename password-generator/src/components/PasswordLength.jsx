import React, { useState } from "react";
import {
  FormLabel,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Flex,
  Text,
} from "@chakra-ui/react";
function PasswordLength({ passwordLength, onSliderChange }) {
  return (
    <>
      <Flex justifyContent="space-between" mb={3}>
        <FormLabel htmlFor="password-length">Password Length</FormLabel>
        <Text fontSize="md" fontWeight="bold">
          {passwordLength}
        </Text>
      </Flex>
      <Slider
        aria-label="slider-ex-1"
        min={1}
        defaultValue={passwordLength}
        value={passwordLength}
        name="password-length"
        max={20}
        onChange={onSliderChange}
        focusThumbOnChange={false}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </>
  );
}

export default PasswordLength;
