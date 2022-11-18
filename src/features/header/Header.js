import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoAdded } from '../todos/todosSlice';
import {v4 as uuidv4} from 'uuid'


const Header = () => {

    const [text,setText]=useState('')
    const [status,setStatus]=useState('idle')
    const dispatch= useDispatch()

    const handleChange=(e)=>setText(e.target.value)


    //Create and dispatch action
    const handleKeyDown =(e)=>{
        const trimmedText =text.trim()
        
        if(e.which === 13 && trimmedText){
            setStatus('loading')
            dispatch(todoAdded({
              id:uuidv4(),
              color:'',
              completed:false,
              text:trimmedText,
            }))

            //clear out the text input
            setText('')
            setStatus('idle')

        }
    }

    let isLoading=status === 'loading'
    let placeholder=isLoading ? '' :'what needs to be done ?'
    let loader =isLoading ? <div className='loader'/> :null

    return (
        <header className="header">
        <input
          className="new-todo"
          placeholder={placeholder}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        {loader}
      </header>
    );
}

export default Header;
