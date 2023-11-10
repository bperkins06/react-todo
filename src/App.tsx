import React, { useEffect, useRef, useState } from 'react';
import './App.css';

// ----------------------------------------------
// Start with https://medium.com/@dhanushkatharindu99/simple-todo-app-with-react-and-typescript-77da1189dc18
// Then use https://www.freecodecamp.org/news/typescript-tutorial-for-react-developers/
//

type Todo = {
  id: number;
  task: string;
  isCompleted: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (task.trim().length === 0) {
      alert("Please enter a value!");
      return;
    }

    const todo: Todo = {
      id: Date.now(),
      task: task,
      isCompleted: false,
    };

    setTodos([todo, ...todos]);
    setTask("");
  };

  const handleChangeChecked = (todo: Todo) => {
    const index = todos.indexOf(todo);
    todo.isCompleted = !todo.isCompleted;
    todos.splice(index, 1, todo);
    setTodos([...todos]);
  };

  const handleDelete = (id: number) => {
    const index = todos.findIndex((todo) => todo.id === id);
    todos.splice(index, 1);
    setTodos([...todos]);
  };

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
          <input
            ref={inputRef}
            type="text"
            name="task"
            onChange={handleInput}
          />
          <button type="submit">Submit</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task}
            <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => handleChangeChecked(todo)}
            />
            <button onClick={() => handleDelete(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
