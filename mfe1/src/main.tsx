import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FluentProvider } from '@fluentui/react-components'
import ThemeProvider from './contexts/ThemeProvider'
import { useTheme } from './hooks/useTheme'
import App from './app.tsx'

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
                <App />
            </BrowserRouter>
        </FluentProvider>
    )
}