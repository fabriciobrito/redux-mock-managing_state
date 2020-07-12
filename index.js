function createStore(){
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
  // createStore will return the function handlers to deal with the app state
  return(
    getState,
    subscribe
  )
}