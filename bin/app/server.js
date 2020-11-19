const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const project = require('../../package.json');
const productHandler= require('../modules/product/controllers');

function AppServer() {
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version
  });

  this.server.serverKey = '';
  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser());
  this.server.use(restify.plugins.authorizationParser());

  // required for CORS configuration
  const corsConfig = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    // ['*'] -> to expose all header, any type header will be allow to access
    // X-Requested-With,content-type,GET, POST, PUT, PATCH, DELETE, OPTIONS -> header type
    allowHeaders: ['Authorization'],
    exposeHeaders: ['Authorization']
  });
  this.server.pre(corsConfig.preflight);
  this.server.use(corsConfig.actual);

  // // required for basic auth
  // this.server.use(basicAuth.init());

  // anonymous can access the end point, place code bellow
  this.server.get('/', (req, res) => {
    res.send('This service is running properly');
  });

  // authenticated client can access the end point, place code bellow
  this.server.get('/product/v1/:productId', productHandler.getProduct);
  this.server.get('/product/v1', productHandler.listProduct);
  this.server.post('/product/v1', productHandler.createProduct);
  this.server.put('/product/v1/:productId', productHandler.updateProduct);
  this.server.del('/product/v1/:productId', productHandler.deleteProduct);
  // this.server.post('/api/users/v1', basicAuth.isAuthenticated, userHandler.postDataLogin);
  // this.server.get('/api/users/v1', jwtAuth.verifyToken, userHandler.getUser);
  // this.server.post('/api/users/v1/register', basicAuth.isAuthenticated, userHandler.registerUser);

}

module.exports = AppServer;
