require('dotenv/config');
require('./bin/helpers/databases/mongodb/connection');
const AppServer = require('./bin/app/server');
const appServer = new AppServer();
const port = process.env.PORT || 5000;

appServer.server.listen(port, () => {
  const ctx = 'app-listen';
  console.log(ctx, `${appServer.server.name} started, listening at ${appServer.server.url}`, 'initate application');
});
