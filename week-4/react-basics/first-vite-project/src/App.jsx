import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const addTodo = ()=>{
    const todosDiv = document.getElementById("todos");
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    const todoDiv = document.createElement("div");
    todoDiv.innerHTML = `
      <div>${title}</div>
      <div>${description}</div>
    `;

    todosDiv.appendChild(todoDiv);
  }

  return (
    <>
      
      <input id="title" type='text' placeholder='Title'/><br /><br />
      <input id="description" type='text' placeholder='Description'/><br /> <br />
      <button id="addTodo" onClick={addTodo}>Add Todo</button>
      <div id="todos"></div>  
    </>
  )
}


export default App
