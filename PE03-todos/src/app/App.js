import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';

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

  changeFilter(type) {
    this.setState({type});
    console.log('Selected Filter:', type);
  }

  render() {
    const {inputValue, todos, type} = this.state;

    const filteredTodos = todos.filter((todo) => {
      if (type === 'Incomplete') {
        return todo.complete === false;
      }

      if (type === 'Completed') {
        return todo.complete === true;
      }

      return true;
    });

    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps='always'
          style={styles.content}>

          <Heading />

          <Input
            inputValue={inputValue}
            inputChange={(text) => this.inputChange(text)}
          />

          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                type === 'All' && styles.selectedButton
              ]}
              onPress={() => this.changeFilter('All')}>
              <Text style={[
                styles.filterText,
                type === 'All' && styles.selectedText
              ]}>
                All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                type === 'Incomplete' && styles.selectedButton
              ]}
              onPress={() => this.changeFilter('Incomplete')}>
              <Text style={[
                styles.filterText,
                type === 'Incomplete' && styles.selectedText
              ]}>
                Incomplete
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                type === 'Completed' && styles.selectedButton
              ]}
              onPress={() => this.changeFilter('Completed')}>
              <Text style={[
                styles.filterText,
                type === 'Completed' && styles.selectedText
              ]}>
                Completed
              </Text>
            </TouchableOpacity>
          </View>

          <TodoList
            toggleComplete={this.toggleComplete}
            deleteTodo={this.deleteTodo}
            todos={filteredTodos}
          />

          <Button
            title="Submit"
            onPress={this.submitTodo}
          />

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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  selectedButton: {
    backgroundColor: '#af5b5e',
    borderColor: '#af5b5e',
  },
  filterText: {
    color: '#666666',
    fontSize: 15,
  },
  selectedText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default App;