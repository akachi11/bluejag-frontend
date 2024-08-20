import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UIContextProvider } from './context/UIContext'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UIContextProvider>
        <App />
      </UIContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
