import React from 'react'
import {
    createSlice,
    createSelector,
    createEntityAdapter,
  } from '@reduxjs/toolkit'

import { StatusFilters } from "../filters/filterSlice"


const todosAdapter = createEntityAdapter()


const initialState={
    status:'idle',
    entities:{}
}

const todosSlice=createSlice({
    name:'todos',
    initialState,
    reducers:{
        todoAdded(state, action) {
          console.log(action,"ok here1")
          const todo = action.payload
          state.entities[todo.id] = todo
        },
        todoToggled(state, action) {
          const todoId = action.payload;
          const todo = state.entities[todoId];
          todo.completed = !todo.completed;
        },
        todoColorSelected: {
          reducer(state, action) {
            
            const { color, todoId } = action.payload;
            state.entities[todoId].color = color;
          },
          prepare(todoId, color) {
            console.log(color, "color");
            console.log(todoId, "todoId");
            return {
              payload: { todoId, color }
            };
          }
        },
        todoDeleted(state,action){
            delete state.entities[action.payload]
        },
        allTodoCompleted(state,action){
            Object.values(state.entities).forEach((todo)=>{
                todo.completed=true
            })
        },
        completedTodosCleared(state,action){
            Object.values(state.entities).forEach((todo)=>{
                if(todo.completed){
                    delete state.entities[todo.id]
                }
            })
        },
        todosLoading(state,action){
            state.status='loading'
        },
        todosLoaded(state,action){
            const newEntities={};
            action.payload.forEach((todo)=>{
                newEntities[todo.id]=todo
            });
            state.entities=newEntities;
            state.status="idle"
        }
      
    }
})

export const {
    allTodosCompleted,
    completedTodosCleared,
    todoAdded,
    todoColorSelected,
    todoDeleted,
    todoToggled,
    todosLoaded,
    todosLoading,
  } = todosSlice.actions
  
  export default todosSlice.reducer

 const selectTodoEntities = (state) => state.todos.entities


export const selectTodos = createSelector(selectTodoEntities, (entities) =>
  Object.values(entities)
)

export const selectTodoById = (state, todoId) => {
  return selectTodoEntities(state)[todoId]
}

export const selectTodoIds = createSelector(
  selectTodos,
  (todos) => todos.map((todo) => todo.id)
)

export const selectFilteredTodos = createSelector(
  selectTodos,//all todos
  (state) => state.filters,//all filter values

  (todos, filters) => {
    const { status, colors } = filters
    const showAllCompletions = status === StatusFilters.All

    //Check status with color = []
    if (showAllCompletions && colors.length === 0) {
      return todos
    }

    const completedStatus = status === StatusFilters.Completed
    return todos.filter((todo) => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus
      const colorMatches = colors.length === 0 || colors.includes(todo.color)
      return statusMatches && colorMatches
    })
  }
)

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
)