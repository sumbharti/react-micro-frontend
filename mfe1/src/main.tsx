import React from 'react'
import { createRoot } from 'react-dom/client'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import Remote from './remote.tsx'
import Office365 from './office365.tsx'

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <FluentProvider theme={webLightTheme}>
            <div>
                Hello mfe1
                <hr />
                <Office365 />
                <hr />
                <Remote />
            </div>
        </FluentProvider>
    </React.StrictMode>
)