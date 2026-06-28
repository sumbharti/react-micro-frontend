import { useEffect, useState } from "react";
import { DummyResponseConnectorService, FunctionAppConnectorService } from "./generated/";
import { appInsights } from './telemetry/appInsights';

const DummyResponseCustomConnector = () => {

    const [dummyResponse, setDummyResponse] = useState<string | null>(null);
    const [functionAppResponse, setFunctionAppResponse] = useState<string | null>(null);
    
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

            var functionAppResponse = await FunctionAppConnectorService.HttpTrigger1("XXX");

            if(functionAppResponse != null && functionAppResponse.success) {
                setFunctionAppResponse(JSON.stringify(functionAppResponse.data));
            }
        }

        loadDummyResponseAsync();
    }

    return (<>

        <h2>Response from Function App Custom Connector</h2>
        {functionAppResponse ? <pre>{functionAppResponse}</pre> : <p>Loading Function App Response...</p>}
        <br/><br/>
        <h2>Response from Dummy API Custom Connector</h2>
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px', overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {dummyResponse ? <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>{dummyResponse}</pre> : <p>Loading...</p>}
        </div>
        
    </>);
}

export default DummyResponseCustomConnector;