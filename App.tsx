import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  useColorScheme,
  View,
  StyleSheet,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Button from './src/components/Button';
import Display from './src/components/Display';

interface PropsInitialState {
  displayValue: string;
  clearDisplay: boolean;
  operation: null | string;
  values: number[];
  current: number;
}

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
} as PropsInitialState;

function App(): JSX.Element {
  const [state, setState] = useState<PropsInitialState>(initialState);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const addDigit = (n: string) => {
    setState(prevState => {
      const clearDisplay =
        prevState.displayValue === '0' || prevState.clearDisplay;

      if (n === '.' && !clearDisplay && state.displayValue.includes('.')) {
        return {...prevState};
      }

      const currentValue = clearDisplay ? '' : prevState.displayValue;
      const newDisplayValue = currentValue + n;

      if (n !== '.') {
        const newValue = parseFloat(newDisplayValue);
        const valuesCopy = [...prevState.values];
        valuesCopy[prevState.current] = newValue;

        return {
          ...prevState,
          displayValue: newDisplayValue,
          clearDisplay: false,
          values: valuesCopy,
        };
      }

      return {
        ...prevState,
        displayValue: newDisplayValue,
        clearDisplay: false,
      };
    });
  };

  const clearMemory = () => {
    setState({...state, displayValue: '0', clearDisplay: false});
  };

  const setOperation = (operation: string) => {
    if (state.current === 0) {
      setState({...state, operation, current: 1, clearDisplay: true});
    } else {
      setState(prevState => {
        const equals = operation === '=';
        const values = [...prevState.values];

        try {
          // Remove the extra '}' at the end of this line
          // eslint-disable-next-line no-eval
          values[0] = eval(`${values[0]} ${prevState.operation} ${values[1]}`);
        } catch (e) {
          values[0] = prevState.values[0];
        }

        values[1] = 0;

        return {
          displayValue: values[0].toString(), // Convert the result to a string
          operation: equals ? null : operation,
          current: equals ? 0 : 1,
          clearDisplay: !equals,
          values,
        };
      });
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.container}>
          <Display value={state.displayValue} />
          <View style={styles.buttons}>
            <Button label="AC" triple onClick={clearMemory} />
            <Button label="/" operation onClick={setOperation} />
            <Button label="7" onClick={addDigit} />
            <Button label="8" onClick={addDigit} />
            <Button label="9" onClick={addDigit} />
            <Button label="*" operation onClick={setOperation} />
            <Button label="4" onClick={addDigit} />
            <Button label="5" onClick={addDigit} />
            <Button label="6" onClick={addDigit} />
            <Button label="-" operation onClick={setOperation} />
            <Button label="1" onClick={addDigit} />
            <Button label="2" onClick={addDigit} />
            <Button label="3" onClick={addDigit} />
            <Button label="+" operation onClick={setOperation} />
            <Button label="0" double onClick={addDigit} />
            <Button label="." onClick={addDigit} />
            <Button label="=" operation onClick={setOperation} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default App;
