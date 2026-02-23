## How to expose RemoteEntry.js URL in Power Code Apps
**Step 1**

- Open MFE1 webpack.config.cjs
- Configure output {publicPath: 'auto'} to expose the remoteEntry.js file over Power Apps URL

**Step 2**

- After pac code push, Open MFE1 App
- Click F12 on browser to open Dev Tools and open Network tab
- Search for remoteEntry.js
- Take the full url exposed for remoteEntry.js
- Configure this in the host app

Best idea is to make this url configurable so that it can be configured at runtime.