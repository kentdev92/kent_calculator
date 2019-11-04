import React, {useState} from 'react';
import {StyleSheet, Text, View, StatusBar, SafeAreaView} from 'react-native';

import Orientation from 'react-native-orientation';

import Row from './src/components/Row';
import Button from './src/components/Button';

export default function App() {
  const [currVal, setCurrVal] = useState('0');
  const [operator, setOperator] = useState(null);
  const [prevVal, setPrevVal] = useState(null);
  const [orientation, setOrientation] = useState(
    Orientation.getInitialOrientation(),
  );

  React.useEffect(() => {
    Orientation.addOrientationListener(_orientationDidChange);
    return () => {
      Orientation.removeOrientationListener(_orientationDidChange);
    };
  }, []);

  _orientationDidChange = orientation => {
    setOrientation(orientation);
  };

  handleTap = (type, value) => {
    if (type === 'number') {
      setCurrVal(`${currVal}${value}`);
    }

    if (type === 'operator') {
      setOperator(value);
      setPrevVal(currVal);
      setCurrVal('0');
    }

    if (type === 'clear') {
      setCurrVal('0');
      setOperator(null);
      setPrevVal(null);
    }

    if (type === 'posneg') {
      setCurrVal(`${parseFloat(currVal) * -1}`);
    }

    if (type === 'percentage') {
      setCurrVal(`${parseFloat(currVal) * 0.01}`);
    }

    if (type === 'equal') {
      const current = parseFloat(currVal);
      const previous = parseFloat(prevVal);

      if (operator === '+') {
        setCurrVal(previous + current);
        setOperator(null);
        setPrevVal(null);
      }

      if (operator === '/') {
        setCurrVal(previous / current);
        setOperator(null);
        setPrevVal(null);
      }

      if (operator === '-') {
        setCurrVal(previous - current);
        setOperator(null);
        setPrevVal(null);
      }

      if (operator === '*') {
        setCurrVal(previous * current);
        setOperator(null);
        setPrevVal(null);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <Text style={styles.value}>{parseFloat(currVal).toLocaleString()}</Text>
        <Row>
          <Button
            text="AC"
            theme="secondary"
            onPress={() => this.handleTap('clear')}
            orientation={orientation}
          />
          <Button
            text="+/-"
            theme="secondary"
            onPress={() => this.handleTap('posneg')}
            orientation={orientation}
          />
          <Button
            text="%"
            theme="secondary"
            onPress={() => this.handleTap('percentage')}
            orientation={orientation}
          />
          <Button
            text="/"
            theme="accent"
            onPress={() => this.handleTap('operator', '/')}
            orientation={orientation}
          />
        </Row>
        <Row>
          <Button
            text="7"
            onPress={() => this.handleTap('number', 7)}
            orientation={orientation}
          />
          <Button
            text="8"
            onPress={() => this.handleTap('number', 8)}
            orientation={orientation}
          />
          <Button
            text="9"
            onPress={() => this.handleTap('number', 9)}
            orientation={orientation}
          />
          <Button
            text="x"
            theme="accent"
            onPress={() => this.handleTap('operator', '*')}
            orientation={orientation}
          />
        </Row>
        <Row>
          <Button
            text="4"
            onPress={() => this.handleTap('number', 4)}
            orientation={orientation}
          />
          <Button
            text="5"
            onPress={() => this.handleTap('number', 5)}
            orientation={orientation}
          />
          <Button
            text="6"
            onPress={() => this.handleTap('number', 6)}
            orientation={orientation}
          />
          <Button
            text="-"
            theme="accent"
            onPress={() => this.handleTap('operator', '-')}
            orientation={orientation}
          />
        </Row>
        <Row>
          <Button
            text="1"
            onPress={() => this.handleTap('number', 1)}
            orientation={orientation}
          />
          <Button
            text="2"
            onPress={() => this.handleTap('number', 2)}
            orientation={orientation}
          />
          <Button
            text="3"
            onPress={() => this.handleTap('number', 3)}
            orientation={orientation}
          />
          <Button
            text="+"
            theme="accent"
            onPress={() => this.handleTap('operator', '+')}
            orientation={orientation}
          />
        </Row>
        <Row>
          <Button
            text="0"
            size="double"
            onPress={() => this.handleTap('number', 0)}
            orientation={orientation}
          />
          <Button
            text="."
            onPress={() => this.handleTap('number', '.')}
            orientation={orientation}
          />
          <Button
            text="="
            theme="accent"
            onPress={() => this.handleTap('equal')}
            orientation={orientation}
          />
        </Row>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    justifyContent: 'flex-end',
  },
  value: {
    color: '#fff',
    fontSize: 40,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10,
  },
});
