import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import {AuthProvider} from './Components/CheckAuth.jsx'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <App />
    </AuthProvider>
  </BrowserRouter>
  </StrictMode>
  
  
)
