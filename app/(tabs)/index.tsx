import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CalculatorScreen() {
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [result, setResult] = useState('');
  const [operator, setOperator] = useState('');

  const selectOperation = (selectedOperator: string) => {
    if (firstValue.trim() === '') {
      setResult('Please enter the first value.');
      return;
    }

    setOperator(selectedOperator);
    setResult('');
  };

  const calculate = (value: string) => {
    if (value.trim() === '') {
      setResult('');
      return;
    }

    if (operator === '') {
      return;
    }

    const num1 = Number(firstValue);
    const num2 = Number(value);

    if (isNaN(num1) || isNaN(num2)) {
      setResult('Invalid input.');
      return;
    }

    let answer: number;

    switch (operator) {
      case '+':
        answer = num1 + num2;
        break;

      case '-':
        answer = num1 - num2;
        break;

      case '*':
        answer = num1 * num2;
        break;

      case '/':
        if (num2 === 0) {
          setResult('Cannot divide by zero.');
          return;
        }

        answer = num1 / num2;
        break;

      default:
        setResult('Invalid operation.');
        return;
    }

    setResult(answer.toString());
  };

  const clearCalculator = () => {
    setFirstValue('');
    setSecondValue('');
    setResult('');
    setOperator('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculator</Text>

      <View style={styles.calculator}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={firstValue}
            onChangeText={setFirstValue}
           
          />

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={secondValue}
            onChangeText={(value) => {
              setSecondValue(value);
              calculate(value);
            }}
           
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.button,
              operator === '+' && styles.selectedButton,
            ]}
            onPress={() => selectOperation('+')}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              operator === '-' && styles.selectedButton,
            ]}
            onPress={() => selectOperation('-')}
          >
            <Text style={styles.buttonText}>−</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              operator === '*' && styles.selectedButton,
            ]}
            onPress={() => selectOperation('*')}
          >
            <Text style={styles.buttonText}>×</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              operator === '/' && styles.selectedButton,
            ]}
            onPress={() => selectOperation('/')}
          >
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Result:</Text>

          <Text style={styles.resultText}>
            {result === '' ? '--' : result}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearCalculator}
        >
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },

  calculator: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 5,
  },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    height: 55,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 18,
    textAlign: 'center',
    color: '#222',
    backgroundColor: '#fafafa',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 15,
  },

  button: {
    flex: 1,
    height: 55,
    backgroundColor: 'black',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedButton: {
    backgroundColor: '#555',
  },

  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  resultBox: {
    marginTop: 5,
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },

  resultLabel: {
    fontSize: 14,
    color: '#777',
  },

  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 5,
  },

  clearButton: {
    marginTop: 15,
    height: 45,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
  },

  clearText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
});