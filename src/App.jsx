import React, { Component } from 'react';
import { nanoid } from 'nanoid';
// import Counter from 'components/Counter';
// import Dropdown from 'components/Dropdown';
// import ColorPicker from 'components/ColorPicker';
import ToDoList from 'components/ToDoList';
import initialTodos from './todos.json';
import TodoEditor from 'components/TodoEditor';
import Filter from 'components/Filter/Filter';
// import Form from 'components/Form/Form';

// const colorPickerOptions = [
//   { label: 'red', color: '#F44336' },
//   { label: 'green', color: '#4CAF50' },
//   { label: 'blue', color: '#2196F3' },
//   { label: 'grey', color: '#607D8B' },
//   { label: 'pink', color: '#E91E63' },
//   { label: 'indigo', color: '#3F51B5' },
// ];

class App extends Component {
  state = {
    todos: initialTodos,
    filter: '',
  };

  addTodo = text => {
    console.log(text);
    const todo = {
      id: nanoid(),
      text,
      completed: false,
    };
    this.setState(prevState => ({
      todos: [todo, ...prevState.todos],
    }));
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  };

  formSubmitHandler = data => {
    console.log('data', data);
  };

  changeFilter = evt => {
    this.setState({
      filter: evt.currentTarget.value,
    });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter)
    );
  };

  calcCompletedTodos = () => {
    const { todos } = this.state;
    return todos.reduce((acc, todo) => (todo.completed ? acc + 1 : acc), 0);
  };

  render() {
    const { todos, filter } = this.state;

    const completedTodos = this.calcCompletedTodos();

    const visibleTodos = this.getVisibleTodos();
    return (
      <>
        {/* <Form onSubmit={this.formSubmitHandler} /> */}
        {/* <Counter /> */}
        {/* <Dropdown />  */}
        {/* <ColorPicker options={colorPickerOptions} /> */}
        <div>
          <p>Total amount: {todos.length}</p>
          <p>Completed: {completedTodos}</p>
        </div>
        <TodoEditor onSubmit={this.addTodo} />

        <Filter value={filter} onChange={this.changeFilter} />

        <ToDoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </>
    );
  }
}

export default App;
