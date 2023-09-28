import React from 'react';
import {StyleSheet, Text, Dimensions, TouchableHighlight} from 'react-native';

interface PropsButton {
  onClick: (label: string) => void; // Defina o tipo para uma função que não recebe argumentos e não retorna nada.
  label: string;
  double?: boolean;
  triple?: boolean;
  operation?: boolean;
}

const Button = ({onClick, label, double, triple, operation}: PropsButton) => {
  const stylesButton = [styles.button];

  if (double) {
    stylesButton.push(styles.buttonDouble);
  }
  if (triple) {
    stylesButton.push(styles.buttonTriple);
  }

  if (operation) {
    stylesButton.push(styles.operationButton);
  }

  return (
    <TouchableHighlight
      activeOpacity={0.3}
      underlayColor="#2c2c2c"
      onPress={() => onClick(label)}>
      <Text style={stylesButton}>{label}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    height: Dimensions.get('window').width / 5,
    width: Dimensions.get('window').width / 5,
    padding: 15,
    margin: 5,
    backgroundColor: '#2c2c2c',
    color: '#fff',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#2c2c2c',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  operationButton: {
    color: '#fff',
    backgroundColor: '#fa8231',
  },
  buttonDouble: {
    width: (Dimensions.get('window').width / 4) * 1.7,
  },
  buttonTriple: {
    width: (Dimensions.get('window').width / 4) * 2.6,
  },
});

export default Button;
