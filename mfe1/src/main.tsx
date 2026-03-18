import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FluentProvider } from '@fluentui/react-components'
import ThemeProvider from './contexts/ThemeProvider'
import { useTheme } from './hooks/useTheme'
import App from './app.tsx'
import { AppInsightsContext } from '@microsoft/applicationinsights-react-js'
import { appInsights, reactPlugin } from './telemetry/appInsights'
import type { ILogger, Metric} from '@microsoft/power-apps/telemetry'

import { setConfig } from '@microsoft/power-apps/app' 
import type { IConfig } from '@microsoft/power-apps/app' 



createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppInsightsContext.Provider value={reactPlugin}>
            <ThemeProvider>
                <AppProviders />
            </ThemeProvider>
        </AppInsightsContext.Provider>
    </React.StrictMode>
)

function AppProviders() {
    
    setConfig({ 
    logger: {   
    logMetric: (value: Metric) => {   
        appInsights.trackEvent(   
        {   
            name: value.type, 
        }, 
            value.data   
        );   
    }   
    } 
    });

    const { theme } = useTheme()

    return (
        <FluentProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </FluentProvider>
    )
}