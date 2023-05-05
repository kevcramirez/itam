import { useState, useEffect } from 'react';
import axios from 'axios';

function TodoLists({ currentUser, handleLogout }) {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    // Fetch
    axios.get(`http://localhost:3001/todos?userId=${currentUser.id}`)
      .then(response => setTodos(response.data))
  }, [currentUser]);

  const handleNewTodoChange = event => {
    setNewTodoTitle(event.target.value);
  };

  const handleNewTodoSubmit = event => {
    event.preventDefault();
    // Add 
    axios.post('http://localhost:3001/todos', {
      userId: currentUser.id,
      title: newTodoTitle,
      completed: false,
    })
      .then(response => {
        setTodos(prevTodos => [...prevTodos, response.data]);
        setNewTodoTitle('');
      })
  };

  const handleTodoEdit = (id, updatedTitle) => {
    // Update 
    axios.patch(`http://localhost:3001/todos/${id}`, {
      title: updatedTitle,
    })
      .then(response => {
        setTodos(prevTodos => prevTodos.map(todo => {
          if (todo.id === response.data.id) {
            return response.data;
          }
          return todo;
        }));
      })
  };

  const handleTodoDelete = id => {
    // Delete
    axios.delete(`http://localhost:3001/todos/${id}`)
      .then(() => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      })
  };

  return (
    <div>
      <h2>Todos for {currentUser.username}</h2>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="text"
              value={todo.title}
              onChange={event => handleTodoEdit(todo.id, event.target.value)}
            />
            <button onClick={() => handleTodoDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleNewTodoSubmit}>
        <input
          type="text"
          placeholder="New todo title"
          value={newTodoTitle}
          onChange={handleNewTodoChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TodoLists;