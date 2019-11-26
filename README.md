
ChiliConnector
=========

A small library that allows you to easily make web service calls to your CHILI publisher install. To learn more about CHILI publisher check out [chili-publish.com](https://www.chili-publish.com)

This module was developed for servers running CHILI Publisher >5.6

This will work with older CHILI installs, but you must use in SOAP mode and some functions will be missing. Support for older CHILI versions may be added in the future.

## Installation

  `npm install chiliconnector`

## Usage
##### First
Frist, you need to add the script as requirement for your code.

##### Second
Second, you need to initilize a new ChiliConnector class. This class takes two parameters:
- The beginning URL of the endpoit
- Any options (not required)

It should be noted that at the current version, the URL requirement does not intelligently protect from putting in the wrong endpoint address - in the future this will change.

So if you REST endpoit is:
`http://www.crowe.chili/chili/rest-api/v1/system/apikey?environmentNameOrURL=Admin`

Then you want to use only up until the "rest-api" point. So the URL you would use as a paramter is: `http://www.crowe.chili/chili/`

##### Third
Use the functions to make request to the server. The last paramtere of all request will be a boolean to determine whether you get a JSON or XML response back.

I strongly suggest using a try catch block as it is required by Node but also because you will get your server errors from the error message.

##### Fourth
Wait for your response using the two most come ways to deal with promises: "await" or promise syntax (see  example below).

##### Fifth
You will get a JSON or XML response back depending on the parameter set in the third step.

------------

#### Using Await

    const ChiliConnector = require('chiliconnector').ChiliConnector;

    let connector = new ChiliConnector("http://www.crowe.chili/chili/");
    
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
    const ChiliConnector = require('chiliconnector').ChiliConnector;

    let connector = new ChiliConnector("http://www.crowe.chili/chili/");

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

------------

#### Options
When you create a ChiliConnector class, you can provide two parameters the URL of the beginning your endpoint and some options.

The options are simple an Object, and you can include or exclude the following options.
Below is the following default options:
```javascript
    	{
        			url: url, // this is set by the constructor, but you can change the URL path
        			version: 1, // Version of the URL
        			rest: true, // Set to 'true' to use REST or 'false' to use SOAP
        			autoCDATA : true // Set to 'true' will add CDATA tags around any XML paramater
    	}`
```
So for example, if you want to create a ChiliConnector that uses SOAP, you would just add the option during initilization.
```javascript
const ChiliConnector = require('./main').ChiliConnector;

let connectorSoap = new ChiliConnector("http://www.crowe.chili/5.6/",
    {
        rest: false
    });
```
## Browser Usage
There are many ways to build this package to work with a browser, but personally I use [Parcel](https://parceljs.org/ "Parcel") because it is super easy.

Please see Parcel's website for deeper documentation and installation instructions, but the most simple use case is you write your code in say a file (or files), and use Parcel to combine everything into one package which you will load in the browser.

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
