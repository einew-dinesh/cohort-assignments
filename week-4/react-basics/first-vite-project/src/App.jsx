import { useState, useEffect } from 'react'

import './App.css'
import Todo from './todo'

let key = 0;

function App() {
  const [todos, setTodos] = useState([]);

  

    fetch("http://localhost:3000/todos", {
      method: "GET"
    }).then((response) => response.json())
      .then((data) => {
        setTodos(data.todos)
        console.log(data.todos);
      })
      .catch((error) => console.log(error));
  
 

  const addTodo =async()=>{
    key=key+1;
    const todo = {
      id:key,
      title:document.getElementById("title").value,
      description:document.getElementById("description").value,
      completed:false
    }
    await setTodos([...todos,todo]);

  }

  const removeTodo = (id)=>{
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  const updateTodo = (id)=>{
    const updatedTodos = todos.map((todo)=>{
      if(todo.id==id){
        todo.completed=(!todo.completed);
      }
      return todo;
    })
    setTodos(updatedTodos)
  }
  // useEffect(() => {
  //   console.log(todos);
  // }, [todos]);
 

  return (
    <>
      <input id='title' type='text' placeholder='Title'></input>
      <input id='description' type='text' placeholder='Description'></input>
      <button onClick={addTodo}>Add Todo</button>

      {
        todos.map((todo)=>{
          
          return <Todo todo={todo} onRemoveTodo = {removeTodo} onUpdateTodo = {updateTodo}></Todo> 

        })
      }
      
    </>
  )
}


export default App
