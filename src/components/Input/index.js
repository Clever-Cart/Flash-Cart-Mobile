import React, { useRef, useState } from 'react';
import { Animated } from 'react-native';
import { Colors } from '../../constants/colors';
import InputComp from './styles';

export function InputComponent(props) {
  const { label } = props;
  const { value } = props;
  const { modifiers } = props;
  const [myValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const posAnim = useRef(new Animated.Value(29)).current;
  const sizeAnim = useRef(new Animated.Value(14)).current;

  function handleFocus() {
    if (!isFocused) {
      setIsFocused(true);
      Animated.timing(posAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(sizeAnim, {
        toValue: 11,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  }

  function handleBlur() {
    if (isFocused && !myValue) {
      setIsFocused(false);
      Animated.timing(posAnim, {
        toValue: 29,
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(sizeAnim, {
        toValue: 14,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  }

  return (
    <InputComp modifiers={modifiers}>
      <Animated.Text
        style={{
          top: posAnim,
          fontSize: sizeAnim,
          position: 'absolute',
          left: 20,
          color:
            modifiers && modifiers.includes('danger')
              ? Colors.Error
              : Colors.InputLabel,
        }}
      >
        {(!value || isFocused) && label}
      </Animated.Text>
      <InputComp.InputText
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        selectionColor="red"
      />
    </InputComp>
  );
}
