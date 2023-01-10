import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './reducer/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom"


ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )