import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Text, Button} from 'react-native';
import Input from './Input';
import Heading from './Heading';
import TodoList from './TodoList';

let todoIndex = 0;

class App extends Component {
  constructor() {
  super();

  this.state = {
    inputValue: '',
    todos: [],
    type: 'All',
  };

  this.submitTodo = this.submitTodo.bind(this);
  this.toggleComplete = this.toggleComplete.bind(this);
  this.deleteTodo = this.deleteTodo.bind(this);
}

  deleteTodo(todoIndex) {
    const todos = this.state.todos.filter(
      (todo) => todo.todoIndex !== todoIndex
    );

    this.setState({todos});
  }

  toggleComplete(todoIndex) {
    const todos = this.state.todos.map((todo) => {
      if (todo.todoIndex === todoIndex) {
        return {...todo, complete: !todo.complete};
      }

      return todo;
    });

    this.setState({todos});
  }

  inputChange(inputValue) {
    console.log('Input Value:', inputValue);
    this.setState({inputValue});
  }

  submitTodo() {
    if (this.state.inputValue.match(/^\s*$/)) {
      return;
    }

    const newTodo = {
      title: this.state.inputValue.trim(),
      todoIndex: todoIndex++,
      complete: false,
    };

    this.setState({
      todos: [...this.state.todos, newTodo],
      inputValue: '',
    });
  }

  render () {
    const { inputValue, todos } = this.state
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps='always'
          style={styles.content}>
          <Heading />
          <Input inputValue={inputValue} inputChange={(text) => this.inputChange(text)} />
          <TodoList toggleComplete={this.toggleComplete}
                    deleteTodo={this.deleteTodo}
                    todos={todos} />
          <Button
            title="Submit"
            onPress={this.submitTodo}
          />
        </ScrollView>
      </View>
    )
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
});

export default App;