export const createReducer = (initialState, actionHandlers) = (
  reducer = (state = initialState, action) => 
    actionHandlers.hasOwnProperty(action.type)?
      actionHandlers[action.type](state, action):
      state  
)