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
//Actions List
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

//Action Functions
function addToDoAction(todo) {
  return {
    type: ADD_TODO,
    todo
  }
};

function removeToDoAction(id) {
  return {
    type: REMOVE_TODO,
    id
  }
};

function toggleToDoAction(id) {
  return {
    type: TOGGLE_TODO,
    id
  }
};

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal
  }
};

function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id
  }
};

// ToDo's Reducer (Pure Function)
function todos (state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) => todo.id !== action.id? todo :
        Object.assign({}, todo, {complete: !todo.complete})
      )
    default:
      return state;
  }
}

// Goals Reducer (Pure Function)
function goals (state = [], action) {
  switch(action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}

//Usage Example
function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}

const store = createStore(app);

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

//Tests
store.dispatch(addToDoAction({
  id: 0,
  name: 'Walk the dog',
  complete: false,
}));

store.dispatch(addToDoAction({
  id: 1,
  name: 'Wash the car',
  complete: false,
}));

store.dispatch(addToDoAction({
  id: 2,
  name: 'Go to the gym',
  complete: true,
}));

store.dispatch(removeToDoAction(1));

store.dispatch(toggleToDoAction(0));

store.dispatch(addGoalAction({
  id: 0,
  name: 'Learn Redux'
}));

store.dispatch(addGoalAction({
  id: 1,
  name: 'Lose 20 pounds'
}));

store.dispatch(removeGoalAction(0));