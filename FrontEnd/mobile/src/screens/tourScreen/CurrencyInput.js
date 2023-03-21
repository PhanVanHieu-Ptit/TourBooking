import MaskInput, { createNumberMask } from 'react-native-mask-input';
import React, { useState } from 'react';

const vndMask = createNumberMask({
  prefix: ['đ', '', ''],
  delimiter: '.',
  separator: ',',
  precision: 3,
})


const CurrencyInput = ({price, setPrice}) => {
  return (
    <MaskInput
      value={price}
      mask={vndMask}
      onChangeText={(masked, unmasked) => {
        setPrice(unmasked); 
      }}
    />
  );
}

export default CurrencyInput;