import { createSlice, createSelector } from "@reduxjs/toolkit";

import { StatusFilters } from "../filters/filterSlice"


const initialState={
    status:'idle',
    entities:{}
}

const todosSlice=createSlice({
    name:'todos',
    initialState,
    reducers:{
        todoAdded(state,action){
            const todo =action.payload;
            state.entities[todo.id]=todo
        },
        todoToggle(state,action){
            const todoId=action.payload;
            const todo =state.entities[todoId];
            todo.completed = !todo.completed
        },
        todoColorSelected:{
            reducer(state,action){
                const {color,todoId}=action.payload;
                state.entities[todoId].color=color
            }

            },
            prepare(todoId,color){
            return {
                payload:{todoId,color}
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
    todosLoading
  } = todosSlice.actions;

  export default todosSlice.reducer;

    const selectTodoEntities = (state) => state.todos.entities;
    // console.log(selectTodoEntities);

    export const selectTodos=createSelector(selectTodoEntities,
        (entities)=> Object.values(entities))

    export const selectFilteredTodos=createSelector(
        // First input selector: all todos
        selectTodos,
        // Second input selector: all filter values
        (state) => state.filters,
        // Output selector: receives both values
        (todos, filters) => {
            const { status, colors } = filters;
            const showAllCompletions = status === StatusFilters.All;
            if (showAllCompletions && colors.length === 0) {
            return todos;
            }

            const completedStatus = status === StatusFilters.Completed;
            // Return either active or completed todos based on filter
            return todos.filter((todo) => {
            const statusMatches =
                showAllCompletions || todo.completed === completedStatus;
            const colorMatches = colors.length === 0 || colors.includes(todo.color);
            return statusMatches && colorMatches;
            });
  }
    )
                                

  export const selectFilteredTodosIds=createSelector(selectFilteredTodos,(filter)=>filter.map((todo)=>todo.id))