//checking environment
var env =process.env.NODE_ENV || 'development';

//fetching config
var config = require('./config.json');
var envConfig = config(env);
//add env.config to process.config
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);