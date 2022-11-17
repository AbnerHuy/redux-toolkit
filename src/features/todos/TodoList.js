import React from 'react';
import { useSelector } from 'react-redux';
import TodoListItem from './TodoListItem'
import { selectFilteredTodos } from './todosSlice';


const TodoList = () => {
    const todoIds=useSelector(selectFilteredTodos)
    console.log(todoIds ,"oke here")
    const loadingStatus =useSelector((state)=>state.todos.status)

    if(loadingStatus === 'loading'){
        return (
            <div className='todo-list'>
                <div className='loader'></div>
            </div>
        )
    }

    const renderedListItems =todoIds.map((todoId)=>{
        return <TodoListItem key={todoId} id={todoId}/>
    })

    return (
        <div>
            <ul className='todo-list'>{renderedListItems}</ul>
        </div>
    );
}

export default TodoList;
