import {createRoot} from 'react-dom/client'
import Remote from './remote.tsx'
import React from 'react'
import Office365 from './office365.tsx'

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
    <div>
        Hello mfe1
        <hr/>
        <Office365></Office365>
        <hr/>
        <Remote></Remote>
    </div>
    </React.StrictMode>
    
)