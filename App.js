import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/reducer'
import App from './src/main'

const store = createStore(reducer)

const ReduxComponent = () => <Provider store={store}>
  <App />
</Provider>

export default ReduxComponent
