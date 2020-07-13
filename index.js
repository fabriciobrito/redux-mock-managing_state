//Library Code
function createStore(reducer){
  let state; //The state itself
  let listeners = []; //The list of listeners subscribed to be notified when state changes

  //1. Get the state
  const getState = () => state;

  //2. Listen to state changes (return the unsubscribe function)
  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  //3. Update de state and call all subscribed functions
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }

  // createStore will return the function handlers to deal with the app state
  return {
    getState,
    subscribe,
    dispatch
  }
}

//App Code
//Reducer ToDo's (Pure Function)
function todos (state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.todo]);
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.id);
    case 'TOGGLE_TODO':
      return state.map((todo) => todo.id === action.id? todo :
        Object.assign({}, todo, {complete: !todo.complete})
      )
    default:
      return state;
  }
}

//Reducer Goals (Pure Function)
function goals (state = [], action) {
  switch(action.type) {
    case 'ADD_GOAL':
      return state.concat([action.goal]);
    case 'REMOVE_GOAL':
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}

//Usage Example
const store = createStore(todos);

store.subscribe(() => {
  console.log('The new ToDo\'s state is: ', store.getState())
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
})

const store2 = createStore(goals);

store2.subscribe(() => {
  console.log('The new GOAL state is: ', store2.getState())
})

store2.dispatch({
  type: 'ADD_GOAL',
  goal: {
    id: 10,
    name: 'Read 1 book per week'
  }
})

store2.dispatch({
  type: 'INVALIDE_TYPE',
  id: 10
})

store2.dispatch({
  type: 'REMOVE_GOAL',
  id: 10
})
