import { createSlice } from '@reduxjs/toolkit'

export const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}

const initialState = {
  status: StatusFilters.All,
  colors: [],
}

const filtersSlice=createSlice({
  name:'filters',
  initialState,
  reducers:{
    StatusFiltersChange(state,action){
      state.status =action.payload
    },
    colorFilterChange:{
      reducer(state,action){
        let { color,changeType}=action.payload
        const {colors}=state
          switch(changeType){
            case 'added':{
              if(!colors.includes(color)){
                colors.push(color)
              }
              break
            }
            case 'removed':{
              state.colors=colors.filter((existingColor)=>existingColor !==color)
            }
            default:
              return
          }
      },
      prepare(color,changeType){
        return {
          payload:{color,changeType}
        }
      }
    }
  }
})

export const { colorFilterChange,StatusFiltersChange}=filtersSlice.actions

export default filtersSlice.reducer