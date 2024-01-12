const Todo = (props)=>{

    

    return(
        <div>
            <h1>{props.todo.title}</h1>
            <h2>{props.todo.description}</h2>
            <button onClick={()=>(props.onRemoveTodo(props.todo.id))}>X</button>
            <button onClick={()=>(props.onUpdateTodo(props.todo.id))}>{props.todo.completed? "Done":"Mark As Done"}</button>
        </div>
    )
}

export default Todo