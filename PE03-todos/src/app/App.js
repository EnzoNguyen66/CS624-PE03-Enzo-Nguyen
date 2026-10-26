import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Text, Button} from 'react-native';
import Input from './Input';
import Heading from './Heading';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      todos: [],
      type: 'All',
    };
  }

  inputChange(inputValue) {
    console.log(' Input Value: ', inputValue);
    this.setState({inputValue});
  }


addTodo() {
  const {inputValue, todos} = this.state;

  if (inputValue.trim() === '') {
    return;
  }

  const newTodo = {
    title: inputValue.trim(),
    todoIndex: todos.length,
    complete: false,
  };

  this.setState(
    {
      todos: [...todos, newTodo],
      inputValue: '',
    },
    () => {
      console.log('State:', this.state);
    },
  );
}


  render() {
    const {inputValue, todos} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
          <Heading />
          <Input
            inputValue={inputValue}
            inputChange={(text) => this.inputChange(text)}
          />

          <View style={styles.button}>
            <Button
              title="Add"
              onPress={() => this.addTodo()}
            />
          </View>

          {todos.map((todo) => (
  <Text key={todo.todoIndex} style={styles.todo}>
    {todo.title}
  </Text>
))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
  button: {
    margin: 10,
  },
  todo: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

export default App;