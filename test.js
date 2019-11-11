let cs = require('./main');

let connectorRest = new cs.ChiliConnector("http://www.crowe.chili/5.6/");
let connectorSoap = new cs.ChiliConnector("http://www.crowe.chili/5.6/", false);

async function main() {
    try {

        console.log(await connectorSoap.getServerDateAsync());
        console.log(await connectorRest.getServerDateAsync());

        console.log(await connectorSoap.generateApiKeyAsync("admin", "admin", "admin"));
        console.log(await connectorRest.generateApiKeyAsync("admin", "admin", "admin"));

     }
    catch (error)
    {
        console.log(error);
    }
}

main();