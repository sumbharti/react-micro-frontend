import DummyResponseCustomConnector from "./CustomConnector";
import Office365 from "./office365";
import Remote from "./remote";
import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { appInsights } from './telemetry/appInsights';

const useStyles = makeStyles({
    root: {
        ...shorthands.margin("16px"),
        ...shorthands.padding("16px"),
        backgroundColor: tokens.colorNeutralBackground1,
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        '@media (max-width: 768px)': {
            ...shorthands.margin("12px"),
            ...shorthands.padding("12px"),
        },
    },
});

const HomePage = () => {
    const styles = useStyles();

    appInsights.trackEvent({ name: "HomePage_Loaded", properties: { timestamp: new Date().toISOString() } });
    appInsights.trackPageView({ name: "HomePage", uri: "/" });
    appInsights.trackTrace({ message: "HomePage loaded", severityLevel: 1 });
    
    return(
        <div className={styles.root}>
            <Remote />
        </div>
    )

}

export default HomePage;