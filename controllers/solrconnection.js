// For Solr Connection
var SolrNode = require('solr-node');

// Create client
var client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'Jobs',
    protocol: 'http'
});
// Set logger level (can be set to DEBUG, INFO, WARN, ERROR, FATAL or OFF)
module.exports=client;
