import { useEffect, useState } from "react";
import { DummyResponseConnectorService } from "./generated/";
import { appInsights } from './telemetry/appInsights';

const DummyResponseCustomConnector = () => {

    const [dummyResponse, setDummyResponse] = useState<string | null>(null);
    
    useEffect(() => {
        loadResponse();
    }, [])

    const loadResponse = () => {
        appInsights.trackEvent({ name: "CustomConnector_LoadResponse", properties: { timestamp: new Date().toISOString() } });
        appInsights.trackPageView({ name: "CustomConnectorPage", uri: "/custom-connector" });
        appInsights.trackTrace({ message: "Loading response from custom connector", severityLevel: 1 });

        const loadDummyResponseAsync = async() => {
            var response = await DummyResponseConnectorService.Products();

            if(response != null && response.success) {
                setDummyResponse(JSON.stringify(response.data));
            }
        }

        loadDummyResponseAsync();
    }

    return (<>
        <h2>Response from Custom Connector</h2>
        {dummyResponse ? <pre>{dummyResponse}</pre> : <p>Loading...</p>}
    </>);
}

export default DummyResponseCustomConnector;