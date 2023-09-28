import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

interface PropsDisplay {
  value: string;
}
const Display = ({value}: PropsDisplay) => {
  return (
    <View style={styles.display}>
      <Text style={styles.displayValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    flex: 1,
    height: Dimensions.get('window').width / 1.13,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#1f1f1f',
    alignItems: 'flex-end',
  },
  displayValue: {
    fontSize: 60,
    color: '#fff',
  },
});

export default Display;
