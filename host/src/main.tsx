import { createRoot } from 'react-dom/client'
import React from 'react'
import { FluentProvider } from '@fluentui/react-components'
import { BrowserRouter } from 'react-router-dom'
import App from './app.tsx'
import ThemeProvider from './contexts/ThemeProvider.tsx'
import { useTheme } from './hooks/useTheme.ts'

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <AppProviders />
        </ThemeProvider>
    </React.StrictMode>
)

function AppProviders() {
    const { theme } = useTheme()

    return (
        <FluentProvider theme={theme}>
            <BrowserRouter>
               <div>
                    <App />
                </div>
            </BrowserRouter>
        </FluentProvider>
    )
}