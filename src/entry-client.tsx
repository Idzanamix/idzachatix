import './index.css'
import React from 'react'
import { ReduxProvider } from './app/providers/Redux/Redux'
import ReactDOM from 'react-dom/client'
import App from './main'
import { BrowserRouter } from 'react-router-dom'
import { MuiCacheProvider } from './app/providers/Cache/MuiCacheProvider'
import { MuiThemeProvider } from './app/providers/Theme/ThemeProvider'
import { CssBaseline } from '@mui/material'


ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <ReduxProvider>
      <BrowserRouter>
        <MuiCacheProvider>
          <MuiThemeProvider>
            <CssBaseline />
            <App />
          </MuiThemeProvider>
        </MuiCacheProvider>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
)
