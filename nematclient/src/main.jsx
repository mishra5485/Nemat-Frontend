import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor  } from "./reducerStoreData/persistorStore/reduxstore.js"
// import PersistGate  from "redux-persist"// Example import statement
import { PersistGate } from 'redux-persist/integration/react';



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider  store={store}>
        <PersistGate  persistor={persistor}>

        <BrowserRouter basename='/nemat'>
          <App />
        </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>,
)
