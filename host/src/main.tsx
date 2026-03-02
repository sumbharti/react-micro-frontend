import { createRoot } from 'react-dom/client'
import React from 'react'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import App from './app.tsx'

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <FluentProvider theme={webLightTheme}>
            <div>
                Hello host app
                <hr/>
                <App />
            </div>
        </FluentProvider>
    </React.StrictMode>
)