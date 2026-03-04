import { useEffect, useState } from "react";
import { DummyResponseConnectorService } from "./generated";

const DummyResponseCustomConnector = () => {

    const [dummyResponse, setDummyResponse] = useState<string | null>(null);
    
    useEffect(() => {
        loadResponse();
    }, [])

    const loadResponse = () => {
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