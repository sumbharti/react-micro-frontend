import { Button } from "@fluentui/react-components";
import { PA_AddNewRowCustomTableService as Flow } from "./generated/services/PA_AddNewRowCustomTableService.ts";
import React from "react";
import type { IOperationResult } from "@microsoft/power-apps/data";
import type { ResponseActionOutput } from "./generated/models/PA_AddNewRowCustomTableModel.ts";

const PowerAutomatePage = () => {

    const [result, setResult] = React.useState<IOperationResult<ResponseActionOutput> | null>(null);

    const handleButtonOnClick = async () => {
        
        var result = await Flow.Run({
            text: new Date().toISOString()
        });

        console.log('Power Automate flow run result:', result);

        setResult(result);
    };

    return (
        <div>
            <Button appearance="primary" onClick={() => 
                handleButtonOnClick()
                }>PA_AddNewRowCustomTable</Button>

            {result?.success && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </div>
    )
}

export default PowerAutomatePage;