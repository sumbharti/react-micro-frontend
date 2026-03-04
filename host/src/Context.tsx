import { useEffect, useState } from "react";
import { getContext, type IContext } from '@microsoft/power-apps/app';

const AppContext = () => {

    const [context, setContext] = useState<IContext>();

    useEffect(() => {
        loadContext();

    }, []);

    const loadContext = () => {

        const loadContextAsync = async () => {
            const ctx = await getContext();
            setContext(ctx);
        }

        loadContextAsync();

    }

    return(<>
        <h2>Response from Context</h2>
        <ul>
            <li>App ID: {context?.app.appId}</li>
            <li>Environment ID: {context?.app.environmentId}</li>
            <li>Query Params: {JSON.stringify(context?.app.queryParams)}</li>
            <li>Full Name: {context?.user.fullName}</li>
            <li>Object ID: {context?.user.objectId}</li>
            <li>Tenant ID: {context?.user.tenantId}</li>
            <li>User Principal Name: {context?.user.userPrincipalName}</li>
            <li><b>Session ID: {context?.host.sessionId}</b></li>
        </ul>
        </>);

}

export default AppContext;