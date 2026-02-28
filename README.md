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


## How to use Power Apps Office 365 Connections to Add data source

**Step 1**

- Create a connection from maker portal
- pac connection list
    - Connection Id: `<Id>`
    - Name: `<API Id>` 
        - if: `/providers/Microsoft.PowerApps/apis/**shared_office365users**` 
        - then: `shared_office365users`

**Step 2**

- Add data source using command below
`pac code add-data-source -a <Name> -c <ConnectionId>`