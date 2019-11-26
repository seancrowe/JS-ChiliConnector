let ChiliConnector = require('./main').ChiliConnector;

let connectorRest = new ChiliConnector("https://demo.chili-publish.com/chili/");
let connectorSoap = new ChiliConnector("https://demo.chili-publish.com/chili/",
    {
        rest: false
    });

async function main() {
    try {

        console.log(await connectorSoap.getServerDateAsync(true));
        console.log(await connectorRest.getServerDateAsync());
     }
    catch (error)
    {
        console.log(error);
    }
}

main();