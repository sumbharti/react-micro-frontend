import {createRoot} from 'react-dom/client'
import React from 'react'
const Remote = React.lazy(() => import("mfe1/Remote"));

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
    <div>
        Hello host app
        <Remote></Remote>
    </div>
    </React.StrictMode>
    
)