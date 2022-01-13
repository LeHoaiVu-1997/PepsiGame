import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInputProps,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export interface TextInputFieldProps {
  containerStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<ViewStyle>;
  errorLabel?: string;
  placeholder?: string;
  numKeyboard?: boolean;
  inputProps?: TextInputProps;
  ref?: any;
}

const TextInputField: React.FC<TextInputFieldProps> = props => {
  const {
    containerStyle,
    errorStyle,
    errorLabel,
    placeholder,
    numKeyboard,
    inputProps = {},
  } = props;

  return (
    <View style={containerStyle ? containerStyle : styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          {...inputProps}
          style={styles.inputStyle}
          keyboardType={numKeyboard ? 'numeric' : 'default'}
          placeholder={placeholder}
        />
      </View>
      <Text style={errorStyle ? errorStyle : styles.errorText}>
        {errorLabel}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: windowHeight * 0.01,
  },
  inputContainer: {
    height: windowHeight * 0.05,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inputStyle: {
    color: 'black',
    fontSize: 18,
  },
  placeholderText: {
    fontSize: 20,
    color: '#877e7e',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
  },
});

export default TextInputField;
