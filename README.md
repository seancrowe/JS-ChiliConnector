
ChiliConnector
=========

A small library that allows you to easily make web service calls to your CHILI publisher install. To learn more about CHILI publisher check out [chili-publish.com](https://www.chili-publish.com)

This module was developed for servers running CHILI Publisher >5.6

This will work with older CHILI installs, but you must use in SOAP mode and some functions will be missing. Support for older CHILI versions may be added in the future.

## Installation

  `npm install chiliconnector`

## Usage

#### Using Await

    let cs = require('chiliservice');

    let connector = new cs.ChiliConnector("http://www.crowe.chili/5.5/main.asmx?wsdl");
    
    async function main() {
        try {
            let apiKey = (await connector.generateApiKeyAsync("admin", "admin", "admin")).key;

            console.log(apiKey);
        }
        catch (error)
        {
            console.log(error);
        }
    }

	main();

	//Output should be an apiKey or an error if you had the wrong info

#### Using Promises
    let cs = require('chiliservice');

    let connector = new cs.ChiliConnector("http://www.crowe.chili/5.5/main.asmx?wsdl");

    function main() {
		connector.generateApiKeyAsync("admin", "admin", "admin"))
			.then(res => 
			{
				console.log(res.key);
			})
			.catch(err)
			{
				console.log(err);
			}
	}
	main();
	
	//Output should be an apiKey or an error if you had the wrong info

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
