import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('window');

export default ({onPress, text, size, theme, orientation}) => {
  styleButton = orientation => {
    let btnWidth =
      orientation === 'PORTRAIT'
        ? (btnWidth = screen.width / 4)
        : (btnWidth = screen.width / 8);
    return {
      backgroundColor: '#333333',
      flex: 1,
      height: Math.floor(btnWidth - 10),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: Math.floor(btnWidth),
      margin: 5,
    };
  };

  styleButtonDouble = orientation => {
    return {
      width:
        orientation === 'PORTRAIT'
          ? screen.width / 2 - 10
          : screen.width / 4 - 10,
      flex: 0,
      alignItems: 'flex-start',
      paddingLeft: 40,
    };
  };

  let buttonStyles = [styleButton(orientation)];
  const textStyles = [styles.text];

  if (size == 'double') {
    buttonStyles.push(styleButtonDouble(orientation));
  }

  if (theme == 'secondary') {
    buttonStyles.push(styles.buttonSecondary);
    textStyles.push(styles.textSecondary);
  } else if (theme == 'accent') {
    buttonStyles.push(styles.buttonAccent);
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 25,
  },
  textSecondary: {
    color: '#060606',
  },
  buttonSecondary: {
    backgroundColor: '#a6a6a6',
  },
  buttonAccent: {
    backgroundColor: '#f09a36',
  },
});
