import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

const reactPlugin = new ReactPlugin();

const appInsights = new ApplicationInsights({
  config: {
    connectionString: process.env.REACT_APP_APPINSIGHTS_CONNECTION_STRING,
    extensions: [reactPlugin],
    enableAutoRouteTracking: true,
    enableUnhandledPromiseRejectionTracking: true,
    disableTelemetry: false,
    samplingPercentage: 100,
    maxAjaxCallsPerView: 50,
    autoTrackPageVisitTime: true,
  },
});

// appInsights.loadAppInsights();
// appInsights.trackPageView();

// appInsights.trackTrace({ message: 'Application Insights initialized' });

export { reactPlugin, appInsights };