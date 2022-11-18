import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { colorFilterChanged, statusFilterChanged } from '../features/filters/filterSlice';
import { allTodosCompleted, completedTodosCleared, selectTodos } from '../features/todos/todosSlice';
import ColorFilter from './ColorFilter';
import RemainingTodos from './RemainingTodos';
import StatusFilter from './StatusFilter';

const Footer = () => {
    const dispatch=useDispatch()

    const {status,colors} =useSelector((state)=>state.filters)
    // console.log(status, "oke");
    // console.log(colors, "oke here color");

    const todosRemaining = useSelector((state)=>{
        const unCompletedTodos = selectTodos(state).filter(
            (todo) => !todo.completed
        )

        return unCompletedTodos.length
    })

    const onMarkCompletedClicked= () =>dispatch(allTodosCompleted())

    const onClearCompletedClicked= () =>dispatch(completedTodosCleared())

    const onStatusChange = () => dispatch(statusFilterChanged(status))

    const onColorChange = (color,changeType) => dispatch(colorFilterChanged(color,changeType))

    return (
        <footer className='footer'>
            <div className='actions'>
                <h5>Action</h5>
                <button className='button' onClick={onMarkCompletedClicked}>Mark All Completed</button>
                <button className='button' onClick={onClearCompletedClicked}>Clear Completed</button>
            </div>

            <RemainingTodos count={todosRemaining}/>
            <StatusFilter value={status} onChange={onStatusChange} />
            <ColorFilter value = {colors} onChange = {onColorChange} />
            
            
        </footer>
    );
}

export default Footer;
