//Library Code
function createStore(reducer){
  let state; //The state itself
  let listeners = []; //The list of listeners subscribed to be notified when state changes

  //1. Get the state
  const getState = () => state;

  //2. Listen to state changes (return the unsubscribe function)
  const subscribe = (listener) => {
    listener.push(listener);
    return(() => {
      listeners = listeners.filter((l) => l.id !== listener.id)
    })
  }

  //3. Update de state and call all subscribed functions
  const dispatch = (action) => {
    state = reducer(action);
    listeners.forEach((listener) => listener());
  }

  // createStore will return the function handlers to deal with the app state
  return(
    getState,
    subscribe,
    dispatch
  )
}

//App Code
//Reducer ToDo's (Pure Function)
function todos (state = [], action){
  switch (action.type){
    case 'ADD_TODO':
      return state.concat([action.todo]);
    default:
      return state;
  }
}

//Usage Example
const store = createStore(todos);

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

store.dispatch(store.getState(), {
  type: 'ADD_TODO',
  todo:{
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
})