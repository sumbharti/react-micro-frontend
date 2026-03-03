import { createRoot } from 'react-dom/client'
import React from 'react'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { BrowserRouter } from 'react-router-dom'
import App from './app.tsx'

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <FluentProvider theme={webLightTheme}>
            <BrowserRouter>
                <div>
                    Hello host app
                    <hr/>
                    <App />
                </div>
            </BrowserRouter>
        </FluentProvider>
    </React.StrictMode>
)