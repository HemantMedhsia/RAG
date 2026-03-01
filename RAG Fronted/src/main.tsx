import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AiToastProvider } from './components/context/AiToastContext.tsx'
import { ChatProvider } from './components/context/ChatContext.tsx'
import { AuthProvider } from './components/context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <AiToastProvider>
            <App />
          </AiToastProvider>
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
