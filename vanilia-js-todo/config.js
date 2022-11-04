// Container for environments
const environments = {};



environments.var =  {
    app: {
        httpPORT: 8000,
        envName: 'something'
    },
    db: {
        //host: 'localhost',
        //port: 27017,
        name: 'database.db'
    }
};

var config = environments.var
module.exports = config;