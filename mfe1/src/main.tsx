import {createRoot} from 'react-dom/client'
import Remote from './remote.tsx'
import React from 'react'

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
<div>
        Hello mfe1
        <Remote></Remote>
    </div>
    </React.StrictMode>
    
)