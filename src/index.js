import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Picker,
  TextInput,
} from 'react-native';
import { Box } from 'components/commons';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#89AAFF',
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonStop: {
    borderColor: '#FF851B',
  },
  buttonText: {
    fontSize: 45,
    color: '#89AAFF',
  },
  buttonTextStop: {
    color: '#FF851B',
  },
  timerText: {
    color: '#fff',
    fontSize: 90,
  },
  picker: {
    width: 50,
    ...Platform.select({
      android: {
        color: '#fff',
        backgroundColor: '#07121B',
        marginLeft: 10,
      },
    }),
  },
  pickerItem: {
    color: '#fff',
    fontSize: 20,
  },
  textInput: {
    marginTop: 10,
    height: 50,
    width: screen.width / 2,
    borderColor: 'gray',
    borderWidth: 1,
    color: '#fff',
    borderColor: '#89AAFF',
    borderRadius: screen.width / 2,
    textAlign: 'center',
  },
});

//5 seconds -> 0:5 -> 00:05 , 90seconds -> 1:30 -> 01:030 -> 01:30
const formatDate = number => `0${number}`.slice(-2);

const getRemaining = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return { minutes: formatDate(minutes), seconds: formatDate(seconds) };
};

//useInterval hook
const useInterval = (callback, delay) => {
  //a ref is like a box for which you can put anything
  //we require a mutable callback to persist across re-renders
  const savedCallback = useRef();

  //remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  //set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

const createArray = length =>
  Array.from(Array(length), (_, index) => index.toString());

export default function App() {
  const [selectedMinutes, setSelectedMinutes] = useState('0');
  const [selectedSeconds, setSelectedSeconds] = useState('5');
  const [remainingSeconds, setRemainingSeconds] = useState(5);
  const [delay, setDelay] = useState('Timer delay');
  const [isRunning, setIsRunning] = useState(false);

  const { minutes, seconds } = getRemaining(remainingSeconds);

  const AVAILABLE_MINUTES = createArray(10);
  const AVAILABLE_SECONDS = createArray(60);

  const action = useInterval(() => {
    setRemainingSeconds(remainingSeconds - 1);
    if (remainingSeconds === 0) {
      stop();
    }
  }, delay);

  const start = () => {
    setRemainingSeconds(
      parseInt(selectedMinutes) * 60 + parseInt(selectedSeconds),
    );
    setIsRunning(true);
    action;
  };

  const stop = () => {
    setIsRunning(false);
  };

  const handleDelayChange = text => setDelay(parseInt(text));

  const renderPickers = () => {
    return (
      <Box flexDirection="row" alignItems="center">
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={selectedMinutes}
          onValueChange={itemValue => setSelectedMinutes(itemValue)}
          mode="dropdown"
        >
          {AVAILABLE_MINUTES.map(value => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
        <Text style={styles.pickerItem}>minutes</Text>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={selectedSeconds}
          onValueChange={itemValue => setSelectedSeconds(itemValue)}
          mode="dropdown"
        >
          {AVAILABLE_SECONDS.map(value => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
        <Text style={styles.pickerItem}>seconds</Text>
      </Box>
    );
  };

  return (
    <Box
      backgroundColor="#07121B"
      flex
      justifyContent="center"
      alignItems="center"
    >
      <StatusBar barStyle="light-content" />
      {isRunning ? (
        <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
      ) : (
        renderPickers()
      )}

      {isRunning ? (
        <TouchableOpacity
          onPress={stop}
          style={[styles.button, styles.buttonStop]}
        >
          <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={start} style={[styles.button]}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      )}

      {isRunning ? (
        <TextInput
          style={styles.textInput}
          onChangeText={handleDelayChange}
          value={delay}
          clearTextOnFocus
          editable={false}
        />
      ) : (
        <TextInput
          style={styles.textInput}
          onChangeText={handleDelayChange}
          value={delay}
          clearTextOnFocus
          editable={true}
        />
      )}
    </Box>
  );
}
