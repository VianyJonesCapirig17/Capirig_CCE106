import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type CounterProps = {
  incrementValue?: number;
};

export default function CounterApp({
  incrementValue = 1,
}: CounterProps) {

  // useState for the counter value
  const [count, setCount] = useState(0);

  // Event handler for Increase
  const increase = () => {
    setCount(count + incrementValue);
  };

  // Event handler for Decrease
  const decrease = () => {
    // Prevent going below zero
    setCount(Math.max(0, count - incrementValue));
  };

  // Event handler for Reset
  const reset = () => {
    setCount(0);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Counter App</Text>

      {/* Display current counter value */}
      <View style={styles.counterBox}>
        <Text style={styles.counter}>{count}</Text>
      </View>

      <View style={styles.buttonContainer}>

        <Pressable
          style={styles.increaseButton}
          onPress={increase}
        >
          <Text style={styles.buttonText}>Increase</Text>
        </Pressable>

        <Pressable
          style={styles.decreaseButton}
          onPress={decrease}
        >
          <Text style={styles.buttonText}>Decrease</Text>
        </Pressable>

        <Pressable
          style={styles.resetButton}
          onPress={reset}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  counterBox: {
    width: 250,
    height: 150,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },

  counter: {
    fontSize: 60,
    fontWeight: 'bold',
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  increaseButton: {
    backgroundColor: 'lightgreen',
    padding: 15,
    borderRadius: 8,
  },

  decreaseButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 8,
  },

  resetButton: {
    backgroundColor: 'skyblue',
    padding: 15,
    borderRadius: 8,
  },

  buttonText: {
    fontWeight: 'bold',
  },
});