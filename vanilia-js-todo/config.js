// Container for environments
const environments = {};


// Dev environment
environments.dev =  {
    app: {
        httpPORT: 8000,
        envName: 'development'
    },
    db: {
        //host: 'localhost',
        //port: 27017,
        name: 'dev.db'
    }
};

// Prod environment
environments.production =  {
    app: {
        httpPORT: 3000,
        envName: 'production'
    },
    db: {
        //host: 'localhost',
        //port: 27017,
        name: 'prod.db'
    }
};
console.log("env: " + process.env.NODE_ENV)
var currEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : '';

// Export the environment
var config = typeof (environments[currEnvironment]) == 'object' ? environments[currEnvironment] : environments.dev;

// Export environments module
module.exports = config;