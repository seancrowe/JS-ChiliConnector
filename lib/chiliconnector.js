const axios = require('axios');
const parser = require("fast-xml-parser");
const DOMParser = require('xmldom-reborn').DOMParser;

class ChiliConnector {

    constructor(url, options = null) {

		this.options =
		{
			url: url,
			version: 1,
			rest: true,
			autoCDATA : true
		}


		if (options != null)
		{
			for (let key in options) {
				this.options[key] = options[key];
			}
		}

    }

    async makeSoapCall(functionName, data = null, returnXML = false) {
        let xml = `<soap12:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap12='http://www.w3.org/2003/05/soap-envelope'><soap12:Body>`;

        xml += `<${functionName} xmlns='http://www.chili-publisher.com/'>`;

		if (this.options.autoCDATA === true)
		{
			ChiliConnector.cleanUpData(data);
		}

        if (data != null) {
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    xml += `<${key}>${data[key]}</${key}>`;
                }
            }
        }

        xml += `</${functionName}>` + '</soap12:Body></soap12:Envelope>';

        let response = await axios({
            method: 'post',
            url: this.options['url'] + "/main.asmx",
            headers: {'Content-Type': 'text/xml'},
            data: xml
        });

        let returnData = ChiliConnector.getResponseValues(response.data, functionName + "Result");

        if (returnData != null && !returnXML) {
            returnData = parser.parse(returnData,
                {
                    ignoreAttributes: false,
					attrNodeName: "attr",
                    attributeNamePrefix: ""
                });
        }

        return returnData;

    }

    static getResponseValues(xml, responseTag) {
        let doc = new DOMParser().parseFromString(xml, "text/xml");

        let elements = doc.getElementsByTagName(responseTag);

        return elements.item(0).textContent;

        return null;
    }

    async makeRestCall(restUrl, method, apiKey, bodyData, queryData = null, returnXML = false) {

    	let currentUrl = `${this.options['url']}/${restUrl}`;

        if (queryData != null) {
            let currentTag = "?";

            for (let key in queryData) {

                currentUrl += `${currentTag}${key}=${queryData[key]}`;
                currentTag = "&";
            }
        }

        if (this.options.autoCDATA === true)
		{
			ChiliConnector.cleanUpData(bodyData);
		}

        let response = await axios({
            method: method,
            url: currentUrl,
            headers: {"API-KEY": apiKey, "ACCEPT": "application/xml"},
            data: bodyData
        });

        let returnData = response.data;

        if (!returnXML) {
            returnData = parser.parse(returnData,
                {
                    ignoreAttributes: false,
					attrNodeName: "attr",
                    attributeNamePrefix: "",
                });
        }

        return returnData;


    }

    static cleanUpData(data)
	{
		if (data != null) {
			for (let key in data) {

				if (key.toString().toLowerCase().includes("xml"))
				{
					data[key] = "<![CDATA[" + data[key] + "]]>";
				}
			}
		}
	}

    /* Below this line is automatically generate from a C# application */
    /*58008*/
async documentCreateTempImagesAsync(apiKey, itemID, docXML, settingsXML, imageConversionProfileID, taskPriority, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreateTempImages', {apiKey: apiKey, itemID: itemID, docXML: docXML, settingsXML: settingsXML, imageConversionProfileID: imageConversionProfileID, taskPriority: taskPriority}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/tempxml/images`, 'post', apiKey, {docXML: docXML, settingsXML: settingsXML }, {itemID: itemID, imageConversionProfileID: imageConversionProfileID, taskPriority: taskPriority }, returnXML);
	}
}


async documentCreateTempImagesAndPDFAsync(apiKey, itemID, docXML, settingsXML, imageConversionProfileID, taskPriority, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreateTempImagesAndPDF', {apiKey: apiKey, itemID: itemID, docXML: docXML, settingsXML: settingsXML, imageConversionProfileID: imageConversionProfileID, taskPriority: taskPriority}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/tempxml/imagesandpdf`, 'post', apiKey, {docXML: docXML, settingsXML: settingsXML }, {itemID: itemID, imageConversionProfileID: imageConversionProfileID, taskPriority: taskPriority }, returnXML);
	}
}


async documentCreateTempODFAsync(apiKey, itemID, docXML, settingsXML, taskPriority, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreateTempODF', {apiKey: apiKey, itemID: itemID, docXML: docXML, settingsXML: settingsXML, taskPriority: taskPriority}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/tempxml/odf`, 'post', apiKey, {docXML: docXML, settingsXML: settingsXML }, {itemID: itemID, taskPriority: taskPriority }, returnXML);
	}
}


async documentCreateTempPackageAsync(apiKey, itemID, docXML, taskPriority, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreateTempPackage', {apiKey: apiKey, itemID: itemID, docXML: docXML, taskPriority: taskPriority}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/tempxml/package`, 'post', apiKey, {docXML: docXML }, {itemID: itemID, taskPriority: taskPriority }, returnXML);
	}
}


async documentCreateTempPDFAsync(apiKey, itemID, docXML, settingsXML, taskPriority, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreateTempPDF', {apiKey: apiKey, itemID: itemID, docXML: docXML, settingsXML: settingsXML, taskPriority: taskPriority}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/tempxml/pdf`, 'post', apiKey, {docXML: docXML, settingsXML: settingsXML }, {itemID: itemID, taskPriority: taskPriority }, returnXML);
	}
}


async documentGetAnnotationsAsync(apiKey, itemID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentGetAnnotations', {apiKey: apiKey, itemID: itemID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/annotations`, 'get', apiKey, {}, {}, returnXML);
	}
}


async documentGetDefaultSettingsAsync(apiKey, itemID, viewType, viewPrefsID, constraintID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentGetDefaultSettings', {apiKey: apiKey, itemID: itemID, viewType: viewType, viewPrefsID: viewPrefsID, constraintID: constraintID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/defaultsettings`, 'get', apiKey, {}, {itemID: itemID, viewType: viewType, viewPrefsID: viewPrefsID, constraintID: constraintID }, returnXML);
	}
}


async documentGetDocumentEventActionsAsync(apiKey, itemID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentGetDocumentEventActions', {apiKey: apiKey, itemID: itemID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/eventactions`, 'get', apiKey, {}, {}, returnXML);
	}
}


async documentGetFoldingViewerURLAsync(apiKey, itemID, foldingSettingsID, modXML, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentGetFoldingViewerURL', {apiKey: apiKey, itemID: itemID, foldingSettingsID: foldingSettingsID, modXML: modXML}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/urls/foldingviewer`, 'post', apiKey, {modXML: modXML }, {foldingSettingsID: foldingSettingsID }, returnXML);
	}
}


async documentGetHTMLEditorURLAsync(apiKey, itemID, workSpaceID, viewPrefsID, constraintsID, viewerOnly, forAnonymousUser, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentGetHTMLEditorURL', {apiKey: apiKey, itemID: itemID, workSpaceID: workSpaceID, viewPrefsID: viewPrefsID, constraintsID: constraintsID, viewerOnly: viewerOnly, forAnonymousUser: forAnonymousUser}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/urls/editor`, 'get', apiKey, {}, {workSpaceID: workSpaceID, viewPrefsID: viewPrefsID, constraintsID: constraintsID, viewerOnly: viewerOnly, forAnonymousUser: forAnonymousUser }, returnXML);
	}
}


async documentGetHTMLFoldingViewerURLAsync(apiKey, itemID, foldingSettingsID, modXML, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentGetHTMLFoldingViewerURL', {apiKey: apiKey, itemID: itemID, foldingSettingsID: foldingSettingsID, modXML: modXML}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/urls/htmlfoldingviewer`, 'post', apiKey, {modXML: modXML }, {foldingSettingsID: foldingSettingsID }, returnXML);
	}
}


async documentGetHTMLPreloadAsync(apiKey, itemID, workSpaceID, viewPrefsID, constraintsID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentGetHTMLPreload', {apiKey: apiKey, itemID: itemID, workSpaceID: workSpaceID, viewPrefsID: viewPrefsID, constraintsID: constraintsID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/htmlpreload`, 'get', apiKey, {}, {workSpaceID: workSpaceID, viewPrefsID: viewPrefsID, constraintsID: constraintsID }, returnXML);
	}
}


async documentGetHTMLPreloadURLAsync(apiKey, itemID, workSpaceID, viewPrefsID, constraintsID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentGetHTMLPreloadURL', {apiKey: apiKey, itemID: itemID, workSpaceID: workSpaceID, viewPrefsID: viewPrefsID, constraintsID: constraintsID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/urls/htmlpreload`, 'get', apiKey, {}, {workSpaceID: workSpaceID, viewPrefsID: viewPrefsID, constraintsID: constraintsID }, returnXML);
	}
}


async documentGetHTMLThreeDModelViewerURLAsync(apiKey, itemID, threeDModelID, modXML, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentGetHTMLThreeDModelViewerURL', {apiKey: apiKey, itemID: itemID, threeDModelID: threeDModelID, modXML: modXML}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/urls/htmlthreedmodelviewer`, 'post', apiKey, {modXML: modXML }, {threeDModelID: threeDModelID }, returnXML);
	}
}


async documentGetInfoAsync(apiKey, itemID, extended, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentGetInfo', {apiKey: apiKey, itemID: itemID, extended: extended}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/info`, 'get', apiKey, {}, {extended: extended }, returnXML);
	}
}


async documentGetPreflightResultsAsync(apiKey, itemID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentGetPreflightResults', {apiKey: apiKey, itemID: itemID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/preflightresults`, 'get', apiKey, {}, {}, returnXML);
	}
}


async documentGetThreeDModelViewerURLAsync(apiKey, itemID, threeDModelID, modXML, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentGetThreeDModelViewerURL', {apiKey: apiKey, itemID: itemID, threeDModelID: threeDModelID, modXML: modXML}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/urls/threedmodelviewer`, 'post', apiKey, {modXML: modXML }, {threeDModelID: threeDModelID }, returnXML);
	}
}


async documentGetUsedAssetsAsync(apiKey, itemID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentGetUsedAssets', {apiKey: apiKey, itemID: itemID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/usedassets`, 'get', apiKey, {}, {}, returnXML);
	}
}


async documentGetVariableDefinitionsAsync(apiKey, itemID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentGetVariableDefinitions', {apiKey: apiKey, itemID: itemID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/variabledefinitions`, 'get', apiKey, {}, {}, returnXML);
	}
}


async apiKeyClearHeaderFieldsForServerDownloadsAsync(apiKey, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ApiKeyClearHeaderFieldsForServerDownloads', {apiKey: apiKey}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/apikey/headerfields`, 'delete', apiKey, {}, {}, returnXML);
	}
}


async apiKeyGetCurrentSettingsAsync(apiKey, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ApiKeyGetCurrentSettings', {apiKey: apiKey}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/apikey/withsettings`, 'get', apiKey, {}, {}, returnXML);
	}
}


async apiKeyKeepAliveAsync(apiKey, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ApiKeyKeepAlive', {apiKey: apiKey}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/apikey/keepalive`, 'put', apiKey, {}, {}, returnXML);
	}
}


async apiKeySetHeaderFieldForServerDownloadsAsync(apiKey, headerFieldKey, headerFieldValue, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ApiKeySetHeaderFieldForServerDownloads', {apiKey: apiKey, headerFieldKey: headerFieldKey, headerFieldValue: headerFieldValue}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/apikey/headerfields`, 'put', apiKey, {}, {headerFieldKey: headerFieldKey, headerFieldValue: headerFieldValue }, returnXML);
	}
}


async apiKeySetRequestHeaderForDomainAsync(apiKey, domain, headerFieldKey, headerFieldValue, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ApiKeySetRequestHeaderForDomain', {apiKey: apiKey, domain: domain, headerFieldKey: headerFieldKey, headerFieldValue: headerFieldValue}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/apikey/requestheaders`, 'put', apiKey, {}, {domain: domain, headerFieldKey: headerFieldKey, headerFieldValue: headerFieldValue }, returnXML);
	}
}


async apiKeySetRequestWithCredentialsForDomainAsync(apiKey, domain, requestWithCredentials, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ApiKeySetRequestWithCredentialsForDomain', {apiKey: apiKey, domain: domain, requestWithCredentials: requestWithCredentials}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/apikey/requestheaderswithcred`, 'put', apiKey, {}, {domain: domain, requestWithCredentials: requestWithCredentials }, returnXML);
	}
}


async apiKeyVerifyAsync(apiKey, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ApiKeyVerify', {apiKey: apiKey}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/apikey/verify`, 'put', apiKey, {apiKey: apiKey }, {}, returnXML);
	}
}


async assetGetImageInfoAsync(apiKey, assetID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('AssetGetImageInfo', {apiKey: apiKey, assetID: assetID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/assets/${assetID}/imageinfo`, 'get', apiKey, {}, {}, returnXML);
	}
}


async barcodeCreateAsync(apiKey, barcodeTypeID, barcodeText, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('BarcodeCreate', {apiKey: apiKey, barcodeTypeID: barcodeTypeID, barcodeText: barcodeText}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/barcodes`, 'post', apiKey, {}, {barcodeTypeID: barcodeTypeID, barcodeText: barcodeText }, returnXML);
	}
}


async barcodeCreateColoredAsync(apiKey, barcodeTypeID, barcodeText, backColor, barColor, textColor, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('BarcodeCreateColored', {apiKey: apiKey, barcodeTypeID: barcodeTypeID, barcodeText: barcodeText, backColor: backColor, barColor: barColor, textColor: textColor}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/barcodescolored`, 'post', apiKey, {}, {barcodeTypeID: barcodeTypeID, barcodeText: barcodeText, backColor: backColor, barColor: barColor, textColor: textColor }, returnXML);
	}
}


async csvFileCreateAsync(apiKey, xmlData, fileName, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('CsvFileCreate', {apiKey: apiKey, xmlData: xmlData, fileName: fileName}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/xmlcsvconverter`, 'post', apiKey, {xmlData: xmlData }, {fileName: fileName }, returnXML);
	}
}


async dataSourceAddSampleFileAsync(apiKey, dataSourceID, fileName, fileOrData, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DataSourceAddSampleFile', {apiKey: apiKey, dataSourceID: dataSourceID, fileName: fileName, fileOrData: fileOrData}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/datasources/${dataSourceID}/files`, 'post', apiKey, {fileOrData: fileOrData }, {fileName: fileName }, returnXML);
	}
}


async dataSourceDeleteSampleFileAsync(apiKey, dataSourceID, fileName, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DataSourceDeleteSampleFile', {apiKey: apiKey, dataSourceID: dataSourceID, fileName: fileName}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/datasources/${dataSourceID}/samplefiles/${fileName}`, 'delete', apiKey, {}, {}, returnXML);
	}
}


async dataSourceDownloadSpreadsheetsAsync(apiKey, dataSourceID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DataSourceDownloadSpreadsheets', {apiKey: apiKey, dataSourceID: dataSourceID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/datasources/${dataSourceID}/spreadsheets`, 'get', apiKey, {}, {}, returnXML);
	}
}


async dataSourceDownloadURLAsync(apiKey, dataSourceID, urlType, query, forDocumentID, editorQueryString, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DataSourceDownloadURL', {apiKey: apiKey, dataSourceID: dataSourceID, urlType: urlType, query: query, forDocumentID: forDocumentID, editorQueryString: editorQueryString}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/datasources/${dataSourceID}/downloadurl`, 'get', apiKey, {}, {urlType: urlType, query: query, forDocumentID: forDocumentID, editorQueryString: editorQueryString }, returnXML);
	}
}


async dataSourceFileGetXMLAsync(apiKey, dataSourceID, fileDataOrPath, fileExtension, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DataSourceFileGetXML', {apiKey: apiKey, dataSourceID: dataSourceID, fileDataOrPath: fileDataOrPath, fileExtension: fileExtension}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/datasources/${dataSourceID}/xmlconverter`, 'put', apiKey, {fileDataOrPath: fileDataOrPath }, {fileExtension: fileExtension }, returnXML);
	}
}


async dataSourceListSampleFilesAsync(apiKey, dataSourceID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DataSourceListSampleFiles', {apiKey: apiKey, dataSourceID: dataSourceID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/datasources/${dataSourceID}/samplefiles`, 'get', apiKey, {}, {}, returnXML);
	}
}


async dataSourceSalesForceGetXMLAsync(apiKey, dataSourceID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DataSourceSalesForceGetXML', {apiKey: apiKey, dataSourceID: dataSourceID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/datasources/${dataSourceID}/salesforce`, 'get', apiKey, {}, {}, returnXML);
	}
}


async dataSourceSpreadsheetGetXMLAsync(apiKey, dataSourceID, spreadsheetID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DataSourceSpreadsheetGetXML', {apiKey: apiKey, dataSourceID: dataSourceID, spreadsheetID: spreadsheetID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/datasources/${dataSourceID}/spreadsheets`, 'post', apiKey, {spreadsheetID: spreadsheetID }, {}, returnXML);
	}
}


async documentCopyAnnotationsAsync(apiKey, fromItemID, toItemID, replaceExistingAnnotations, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCopyAnnotations', {apiKey: apiKey, fromItemID: fromItemID, toItemID: toItemID, replaceExistingAnnotations: replaceExistingAnnotations}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${toItemID}/annotations/copy`, 'put', apiKey, {}, {fromItemID: fromItemID, replaceExistingAnnotations: replaceExistingAnnotations }, returnXML);
	}
}


async documentCopyDocumentEventActionsAsync(apiKey, fromItemID, toItemID, replaceExistingActions, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCopyDocumentEventActions', {apiKey: apiKey, fromItemID: fromItemID, toItemID: toItemID, replaceExistingActions: replaceExistingActions}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${toItemID}/documenteventactions/copy`, 'put', apiKey, {}, {fromItemID: fromItemID, replaceExistingActions: replaceExistingActions }, returnXML);
	}
}


async documentCopyVariableDefinitionsAsync(apiKey, fromItemID, toItemID, replaceExistingVariables, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCopyVariableDefinitions', {apiKey: apiKey, fromItemID: fromItemID, toItemID: toItemID, replaceExistingVariables: replaceExistingVariables}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${toItemID}/variabledefinitions/copy`, 'put', apiKey, {}, {fromItemID: fromItemID, replaceExistingVariables: replaceExistingVariables }, returnXML);
	}
}


async documentCreateFromBlankDocTemplateAsync(apiKey, documentName, folderPath, blankDocTemplateID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreateFromBlankDocTemplate', {apiKey: apiKey, documentName: documentName, folderPath: folderPath, blankDocTemplateID: blankDocTemplateID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/fromtemplate`, 'post', apiKey, {}, {documentName: documentName, folderPath: folderPath, blankDocTemplateID: blankDocTemplateID }, returnXML);
	}
}


async documentCreateFromChiliPackageAsync(apiKey, documentName, folderPath, packagePathOrData, newAssetLocation, newFontLocation, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreateFromChiliPackage', {apiKey: apiKey, documentName: documentName, folderPath: folderPath, packagePathOrData: packagePathOrData, newAssetLocation: newAssetLocation, newFontLocation: newFontLocation}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/frompackage`, 'post', apiKey, {packagePathOrData: packagePathOrData }, {documentName: documentName, folderPath: folderPath, newAssetLocation: newAssetLocation, newFontLocation: newFontLocation }, returnXML);
	}
}


async documentCreateFromODTAsync(apiKey, documentName, folderPath, odtPathOrData, settingsXML, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreateFromODT', {apiKey: apiKey, documentName: documentName, folderPath: folderPath, odtPathOrData: odtPathOrData, settingsXML: settingsXML}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/fromodt`, 'post', apiKey, {odtPathOrData: odtPathOrData, settingsXML: settingsXML }, {documentName: documentName, folderPath: folderPath }, returnXML);
	}
}


async documentCreateFromPDFAsync(apiKey, documentName, folderPath, pdfPathOrData, backgroundAssetLocation, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreateFromPDF', {apiKey: apiKey, documentName: documentName, folderPath: folderPath, pdfPathOrData: pdfPathOrData, backgroundAssetLocation: backgroundAssetLocation}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/frompdf`, 'post', apiKey, {pdfPathOrData: pdfPathOrData }, {documentName: documentName, folderPath: folderPath, backgroundAssetLocation: backgroundAssetLocation }, returnXML);
	}
}


async documentCreateHTMLAsync(apiKey, itemID, settingsXML, taskPriority, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreateHTML', {apiKey: apiKey, itemID: itemID, settingsXML: settingsXML, taskPriority: taskPriority}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/representations/html`, 'post', apiKey, {settingsXML: settingsXML }, {taskPriority: taskPriority }, returnXML);
	}
}


async documentCreateIDMLAsync(apiKey, itemID, settingsXML, taskPriority, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreateIDML', {apiKey: apiKey, itemID: itemID, settingsXML: settingsXML, taskPriority: taskPriority}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/representations/idml`, 'post', apiKey, {settingsXML: settingsXML }, {taskPriority: taskPriority }, returnXML);
	}
}


async documentCreateImagesAsync(apiKey, itemID, settingsXML, imageConversionProfileID, taskPriority, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreateImages', {apiKey: apiKey, itemID: itemID, settingsXML: settingsXML, imageConversionProfileID: imageConversionProfileID, taskPriority: taskPriority}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/representations/images`, 'post', apiKey, {settingsXML: settingsXML }, {imageConversionProfileID: imageConversionProfileID, taskPriority: taskPriority }, returnXML);
	}
}


async documentCreateImagesAndPDFAsync(apiKey, itemID, settingsXML, imageConversionProfileID, taskPriority, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreateImagesAndPDF', {apiKey: apiKey, itemID: itemID, settingsXML: settingsXML, imageConversionProfileID: imageConversionProfileID, taskPriority: taskPriority}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/representations/imagesandpdf`, 'post', apiKey, {settingsXML: settingsXML }, {imageConversionProfileID: imageConversionProfileID, taskPriority: taskPriority }, returnXML);
	}
}


async documentCreateODFAsync(apiKey, itemID, settingsXML, taskPriority, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreateODF', {apiKey: apiKey, itemID: itemID, settingsXML: settingsXML, taskPriority: taskPriority}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/representations/odf`, 'post', apiKey, {settingsXML: settingsXML }, {taskPriority: taskPriority }, returnXML);
	}
}


async documentCreatePackageAsync(apiKey, itemID, taskPriority, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreatePackage', {apiKey: apiKey, itemID: itemID, taskPriority: taskPriority}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/representations/package`, 'post', apiKey, {}, {taskPriority: taskPriority }, returnXML);
	}
}


async documentCreatePDFAsync(apiKey, itemID, settingsXML, taskPriority, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreatePDF', {apiKey: apiKey, itemID: itemID, settingsXML: settingsXML, taskPriority: taskPriority}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/representations/pdf`, 'post', apiKey, {settingsXML: settingsXML }, {taskPriority: taskPriority }, returnXML);
	}
}


async documentCreateTempFoldingAsync(apiKey, itemID, docXML, taskPriority, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreateTempFolding', {apiKey: apiKey, itemID: itemID, docXML: docXML, taskPriority: taskPriority}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/tempxml/folding`, 'post', apiKey, {docXML: docXML }, {itemID: itemID, taskPriority: taskPriority }, returnXML);
	}
}


async documentCreateTempHTMLAsync(apiKey, itemID, docXML, settingsXML, taskPriority, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreateTempHTML', {apiKey: apiKey, itemID: itemID, docXML: docXML, settingsXML: settingsXML, taskPriority: taskPriority}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/tempxml/html`, 'post', apiKey, {docXML: docXML, settingsXML: settingsXML }, {itemID: itemID, taskPriority: taskPriority }, returnXML);
	}
}


async documentCreateTempIDMLAsync(apiKey, itemID, docXML, settingsXML, taskPriority, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentCreateTempIDML', {apiKey: apiKey, itemID: itemID, docXML: docXML, settingsXML: settingsXML, taskPriority: taskPriority}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/tempxml/idml`, 'post', apiKey, {docXML: docXML, settingsXML: settingsXML }, {itemID: itemID, taskPriority: taskPriority }, returnXML);
	}
}


async environmentGetLoginSettingsAsync(environmentNameOrURL, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('EnvironmentGetLoginSettings', {environmentNameOrURL: environmentNameOrURL}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/environments/${environmentNameOrURL}/loginsettings`, 'get', null, {}, {}, returnXML);
	}
}


async environmentGetReflectionMapsAsync(apiKey, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('EnvironmentGetReflectionMaps', {apiKey: apiKey}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/environments/reflectionmaps`, 'get', apiKey, {}, {}, returnXML);
	}
}


async environmentGetSettingsAsync(apiKey, environmentName, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('EnvironmentGetSettings', {apiKey: apiKey, environmentName: environmentName}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/environments/${environmentName}/settings`, 'get', apiKey, {}, {}, returnXML);
	}
}


async environmentListAsync(apiKey, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('EnvironmentList', {apiKey: apiKey}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/environments`, 'get', apiKey, {}, {}, returnXML);
	}
}


async environmentSaveSettingsAsync(apiKey, environmentName, xml, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('EnvironmentSaveSettings', {apiKey: apiKey, environmentName: environmentName, xml: xml}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/environments/${environmentName}`, 'put', apiKey, {xml: xml }, {}, returnXML);
	}
}


async foldingSettingCreatePackageAsync(apiKey, foldingSettingId, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('FoldingSettingCreatePackage', {apiKey: apiKey, foldingSettingId: foldingSettingId}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/foldingsettings/${foldingSettingId}/package`, 'get', apiKey, {}, {}, returnXML);
	}
}


async fontGetIncludedGlyphsAsync(apiKey, fontID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('FontGetIncludedGlyphs', {apiKey: apiKey, fontID: fontID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/fonts/${fontID}/includedglyphs`, 'get', apiKey, {}, {}, returnXML);
	}
}


async generateApiKeyAsync(environmentNameOrURL, userName, password, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('GenerateApiKey', {environmentNameOrURL: environmentNameOrURL, userName: userName, password: password}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/apikey`, 'post', null, {userName: userName, password: password }, {environmentNameOrURL: environmentNameOrURL }, returnXML);
	}
}


async generateApiKeyWithSettingsAsync(environmentNameOrURL, userName, password, settingsXML, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('GenerateApiKeyWithSettings', {environmentNameOrURL: environmentNameOrURL, userName: userName, password: password, settingsXML: settingsXML}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/apikey/withsetting`, 'post', null, {userName: userName, password: password, settingsXML: settingsXML }, {environmentNameOrURL: environmentNameOrURL }, returnXML);
	}
}


async getServerDateAsync(returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('GetServerDate', {}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/server/date`, 'get', null, {}, {}, returnXML);
	}
}


async googleCreateAuthorizationUrlAsync(apiKey, clientID, clientSecret, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('GoogleCreateAuthorizationUrl', {apiKey: apiKey, clientID: clientID, clientSecret: clientSecret}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/server/googleauthurl`, 'get', apiKey, {}, {clientID: clientID, clientSecret: clientSecret }, returnXML);
	}
}


async interfaceGetInitialSettingsAsync(apiKey, forEditor, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('InterfaceGetInitialSettings', {apiKey: apiKey, forEditor: forEditor}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/environments/interfaceinitialsettings`, 'get', apiKey, {}, {forEditor: forEditor }, returnXML);
	}
}


async languageGetCombinedStringsAsync(apiKey, languageID, overrideBasedOn, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('LanguageGetCombinedStrings', {apiKey: apiKey, languageID: languageID, overrideBasedOn: overrideBasedOn}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/languages/${languageID}/combinedstrings`, 'get', apiKey, {}, {overrideBasedOn: overrideBasedOn }, returnXML);
	}
}


async languageGetCsvURLAsync(apiKey, languageID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('LanguageGetCsvURL', {apiKey: apiKey, languageID: languageID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/languages/${languageID}/urls/csv`, 'get', apiKey, {}, {}, returnXML);
	}
}


async languageGetUnicodeTextURLAsync(apiKey, languageID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('LanguageGetUnicodeTextURL', {apiKey: apiKey, languageID: languageID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/languages/${languageID}/urls/unicodetext`, 'get', apiKey, {}, {}, returnXML);
	}
}


async languageImportCsvAsync(apiKey, languageID, filePathOrData, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('LanguageImportCsv', {apiKey: apiKey, languageID: languageID, filePathOrData: filePathOrData}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/languages/${languageID}/csv`, 'post', apiKey, {filePathOrData: filePathOrData }, {}, returnXML);
	}
}


async languageImportUnicodeTextAsync(apiKey, languageID, filePathOrData, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('LanguageImportUnicodeText', {apiKey: apiKey, languageID: languageID, filePathOrData: filePathOrData}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/languages/${languageID}/unicodetext`, 'post', apiKey, {filePathOrData: filePathOrData }, {}, returnXML);
	}
}


async languageSaveStringsAsync(apiKey, languageID, stringXML, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('LanguageSaveStrings', {apiKey: apiKey, languageID: languageID, stringXML: stringXML}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/languages/${languageID}`, 'put', apiKey, {stringXML: stringXML }, {}, returnXML);
	}
}


async languagesGetListAsync(apiKey, includeSystemLanguages, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('LanguagesGetList', {apiKey: apiKey, includeSystemLanguages: includeSystemLanguages}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/languages`, 'get', apiKey, {}, {includeSystemLanguages: includeSystemLanguages }, returnXML);
	}
}


async lockApiKeyAsync(apiKeyToLock, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('LockApiKey', {apiKeyToLock: apiKeyToLock}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/apikey/lock/${apiKeyToLock}`, 'put', apiKey, {}, {}, returnXML);
	}
}


async oDTGetStylesAsync(apiKey, fileData, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ODTGetStyles', {apiKey: apiKey, fileData: fileData}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/odt/styles`, 'post', apiKey, {fileData: fileData }, {}, returnXML);
	}
}


async oDTGetTextFlowAsync(apiKey, fileData, stylesMapping, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ODTGetTextFlow', {apiKey: apiKey, fileData: fileData, stylesMapping: stylesMapping}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/odt/textflow`, 'post', apiKey, {fileData: fileData, stylesMapping: stylesMapping }, {}, returnXML);
	}
}


async resourceFolderAddAsync(apiKey, resourceName, newName, parentPath, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceFolderAdd', {apiKey: apiKey, resourceName: resourceName, newName: newName, parentPath: parentPath}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/folders`, 'post', apiKey, {}, {newName: newName, parentPath: parentPath }, returnXML);
	}
}


async resourceFolderCopyAsync(apiKey, resourceName, folderPath, newFolderPath, includeSubFolders, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceFolderCopy', {apiKey: apiKey, resourceName: resourceName, folderPath: folderPath, newFolderPath: newFolderPath, includeSubFolders: includeSubFolders}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/folders/copy`, 'post', apiKey, {}, {folderPath: folderPath, newFolderPath: newFolderPath, includeSubFolders: includeSubFolders }, returnXML);
	}
}


async resourceFolderDeleteAsync(apiKey, resourceName, relativePath, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceFolderDelete', {apiKey: apiKey, resourceName: resourceName, relativePath: relativePath}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/folders`, 'delete', apiKey, {}, {relativePath: relativePath }, returnXML);
	}
}


async resourceFolderMoveAsync(apiKey, resourceName, folderPath, newFolderPath, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceFolderMove', {apiKey: apiKey, resourceName: resourceName, folderPath: folderPath, newFolderPath: newFolderPath}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/folders/move`, 'put', apiKey, {}, {folderPath: folderPath, newFolderPath: newFolderPath }, returnXML);
	}
}


async resourceGetHistoryAsync(apiKey, resourceName, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceGetHistory', {apiKey: apiKey, resourceName: resourceName}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/history`, 'get', apiKey, {}, {}, returnXML);
	}
}


async resourceGetTreeAsync(apiKey, resourceName, parentFolder, includeSubDirectories, includeFiles, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceGetTree', {apiKey: apiKey, resourceName: resourceName, parentFolder: parentFolder, includeSubDirectories: includeSubDirectories, includeFiles: includeFiles}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/tree`, 'get', apiKey, {}, {parentFolder: parentFolder, includeSubDirectories: includeSubDirectories, includeFiles: includeFiles }, returnXML);
	}
}


async resourceGetTreeLevelAsync(apiKey, resourceName, parentFolder, numLevels, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceGetTreeLevel', {apiKey: apiKey, resourceName: resourceName, parentFolder: parentFolder, numLevels: numLevels}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/treelevel`, 'get', apiKey, {}, {parentFolder: parentFolder, numLevels: numLevels }, returnXML);
	}
}


async resourceItemAddAsync(apiKey, resourceName, newName, folderPath, xml, fileData, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemAdd', {apiKey: apiKey, resourceName: resourceName, newName: newName, folderPath: folderPath, xml: xml, fileData: fileData}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items`, 'post', apiKey, {xml: xml, fileData: fileData }, {newName: newName, folderPath: folderPath }, returnXML);
	}
}


async resourceItemAddFromURLAsync(apiKey, resourceName, newName, folderPath, url, login, pw, reuseExisting, previewFileURL, previewExtension, isPermanentPreview, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemAddFromURL', {apiKey: apiKey, resourceName: resourceName, newName: newName, folderPath: folderPath, url: url, login: login, pw: pw, reuseExisting: reuseExisting, previewFileURL: previewFileURL, previewExtension: previewExtension, isPermanentPreview: isPermanentPreview}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/fromurl`, 'post', apiKey, {}, {newName: newName, folderPath: folderPath, url: url, login: login, pw: pw, reuseExisting: reuseExisting, previewFileURL: previewFileURL, previewExtension: previewExtension, isPermanentPreview: isPermanentPreview }, returnXML);
	}
}


async spellCheckDictionariesGetSystemListAsync(apiKey, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SpellCheckDictionariesGetSystemList', {apiKey: apiKey}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/spellcheckdicts`, 'get', apiKey, {}, {}, returnXML);
	}
}


async spellCheckDictionaryAddAsync(apiKey, name, dicFileOrData, affFileOrData, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SpellCheckDictionaryAdd', {apiKey: apiKey, name: name, dicFileOrData: dicFileOrData, affFileOrData: affFileOrData}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/spellcheckdicts`, 'post', apiKey, {dicFileOrData: dicFileOrData, affFileOrData: affFileOrData }, {name: name }, returnXML);
	}
}


async spellCheckDictionaryAddFromSystemAsync(apiKey, name, systemDictName, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SpellCheckDictionaryAddFromSystem', {apiKey: apiKey, name: name, systemDictName: systemDictName}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/spellcheckdicts/fromsystem`, 'post', apiKey, {}, {name: name, systemDictName: systemDictName }, returnXML);
	}
}


async spellCheckDictionaryReplaceFileAsync(apiKey, itemID, fileType, fileOrData, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SpellCheckDictionaryReplaceFile', {apiKey: apiKey, itemID: itemID, fileType: fileType, fileOrData: fileOrData}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/spellcheckdicts/${itemID}`, 'put', apiKey, {fileOrData: fileOrData }, {fileType: fileType }, returnXML);
	}
}


async switchServerFlowGetCheckPointsAsync(apiKey, switchServerID, flowID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SwitchServerFlowGetCheckPoints', {apiKey: apiKey, switchServerID: switchServerID, flowID: flowID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/switchservers/${switchServerID}/flows/${flowID}/checkpoints`, 'get', apiKey, {}, {}, returnXML);
	}
}


async switchServerFlowGetElementsJobCountAsync(apiKey, switchServerID, flowID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SwitchServerFlowGetElementsJobCount', {apiKey: apiKey, switchServerID: switchServerID, flowID: flowID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/switchservers/${switchServerID}/flows/${flowID}/elementsjobcount`, 'get', apiKey, {}, {}, returnXML);
	}
}


async switchServerFlowGetFullConfigAsync(apiKey, switchServerID, flowID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SwitchServerFlowGetFullConfig', {apiKey: apiKey, switchServerID: switchServerID, flowID: flowID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/switchservers/${switchServerID}/flows/${flowID}/fullconfig`, 'get', apiKey, {}, {}, returnXML);
	}
}


async switchServerFlowGetJobsAsync(apiKey, switchServerID, flowID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SwitchServerFlowGetJobs', {apiKey: apiKey, switchServerID: switchServerID, flowID: flowID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/switchservers/${switchServerID}/flows/${flowID}/jobs`, 'get', apiKey, {}, {}, returnXML);
	}
}


async switchServerFlowGetSubmitPointsAsync(apiKey, switchServerID, flowID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SwitchServerFlowGetSubmitPoints', {apiKey: apiKey, switchServerID: switchServerID, flowID: flowID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/switchservers/${switchServerID}/flows/${flowID}/submitpoints`, 'get', apiKey, {}, {}, returnXML);
	}
}


async documentGetVariableValuesAsync(apiKey, itemID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentGetVariableValues', {apiKey: apiKey, itemID: itemID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/variablevalues`, 'get', apiKey, {}, {}, returnXML);
	}
}


async documentProcessServerSideAsync(apiKey, itemID, resourceXML, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentProcessServerSide', {apiKey: apiKey, itemID: itemID, resourceXML: resourceXML}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/documentprocessor`, 'put', apiKey, {}, {itemID: itemID, resourceXML: resourceXML }, returnXML);
	}
}


async documentSetAnnotationsAsync(apiKey, itemID, annotationXML, replaceExistingAnnotations, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentSetAnnotations', {apiKey: apiKey, itemID: itemID, annotationXML: annotationXML, replaceExistingAnnotations: replaceExistingAnnotations}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/annotations`, 'post', apiKey, {annotationXML: annotationXML }, {replaceExistingAnnotations: replaceExistingAnnotations }, returnXML);
	}
}


async documentSetAssetDirectoriesAsync(apiKey, documentID, userAssetDirectory, userGroupAssetDirectory, documentAssetDirectory, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentSetAssetDirectories', {apiKey: apiKey, documentID: documentID, userAssetDirectory: userAssetDirectory, userGroupAssetDirectory: userGroupAssetDirectory, documentAssetDirectory: documentAssetDirectory}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${documentID}/assetdirectories`, 'post', apiKey, {}, {userAssetDirectory: userAssetDirectory, userGroupAssetDirectory: userGroupAssetDirectory, documentAssetDirectory: documentAssetDirectory }, returnXML);
	}
}


async documentSetConstraintsAsync(apiKey, itemID, constraintsID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentSetConstraints', {apiKey: apiKey, itemID: itemID, constraintsID: constraintsID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/constraints`, 'post', apiKey, {}, {constraintsID: constraintsID }, returnXML);
	}
}


async documentSetDataSourceAsync(apiKey, itemID, datasourceXML, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentSetDataSource', {apiKey: apiKey, itemID: itemID, datasourceXML: datasourceXML}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/datasource`, 'post', apiKey, {datasourceXML: datasourceXML }, {}, returnXML);
	}
}


async documentSetDocumentEventActionsAsync(apiKey, itemID, definitionXML, replaceExistingActions, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentSetDocumentEventActions', {apiKey: apiKey, itemID: itemID, definitionXML: definitionXML, replaceExistingActions: replaceExistingActions}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/eventactions`, 'post', apiKey, {definitionXML: definitionXML }, {replaceExistingActions: replaceExistingActions }, returnXML);
	}
}


async documentSetVariableDefinitionsAsync(apiKey, itemID, definitionXML, replaceExistingVariables, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentSetVariableDefinitions', {apiKey: apiKey, itemID: itemID, definitionXML: definitionXML, replaceExistingVariables: replaceExistingVariables}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/variabledefinitions`, 'post', apiKey, {definitionXML: definitionXML }, {replaceExistingVariables: replaceExistingVariables }, returnXML);
	}
}


async documentSetVariableValuesAsync(apiKey, itemID, varXML, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DocumentSetVariableValues', {apiKey: apiKey, itemID: itemID, varXML: varXML}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/documents/${itemID}/variablevalues`, 'post', apiKey, {varXML: varXML }, {}, returnXML);
	}
}


async downloadAssetsAsync(resourceType, id, path, name, type, page, client_app, colorType, noContentHeader, taskId, docId, scale, ipadItemPath, transformationID, transformationName, async, taskPriority, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DownloadAssets', {resourceType: resourceType, id: id, path: path, name: name, type: type, page: page, client_app: client_app, colorType: colorType, noContentHeader: noContentHeader, taskId: taskId, docId: docId, scale: scale, ipadItemPath: ipadItemPath, transformationID: transformationID, transformationName: transformationName, async: async, taskPriority: taskPriority}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceType}/download`, 'get', null, {}, {id: id, path: path, name: name, type: type, page: page, client_app: client_app, colorType: colorType, noContentHeader: noContentHeader, taskId: taskId, docId: docId, scale: scale, ipadItemPath: ipadItemPath, transformationID: transformationID, transformationName: transformationName, async: async, taskPriority: taskPriority }, returnXML);
	}
}


async downloadBarcodeAsync(type, id, name, text, backCol, barCol, textCol, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DownloadBarcode', {type: type, id: id, name: name, text: text, backCol: backCol, barCol: barCol, textCol: textCol}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/BarcodeTypes/download`, 'get', null, {}, {type: type, id: id, name: name, text: text, backCol: backCol, barCol: barCol, textCol: textCol }, returnXML);
	}
}


async downloadDatasourceSampleAsync(name, id, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DownloadDatasourceSample', {name: name, id: id}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/DatasourceSample/download`, 'get', null, {}, {name: name, id: id }, returnXML);
	}
}


async downloadExternalAsync(path, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DownloadExternal', {path: path}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/External/download`, 'get', null, {}, {path: path }, returnXML);
	}
}


async downloadFoldingAsync(type, id, foldingId, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DownloadFolding', {type: type, id: id, foldingId: foldingId}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/Folding/download`, 'get', null, {}, {type: type, id: id, foldingId: foldingId }, returnXML);
	}
}


async downloadFontPreviewAsync(type, width, height, alphabet, id, name, taskId, taskPriority, async, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DownloadFontPreview', {type: type, width: width, height: height, alphabet: alphabet, id: id, name: name, taskId: taskId, taskPriority: taskPriority, async: async}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/Fonts/download`, 'get', null, {}, {type: type, width: width, height: height, alphabet: alphabet, id: id, name: name, taskId: taskId, taskPriority: taskPriority, async: async }, returnXML);
	}
}


async downloadIconsAsync(environment, set, icon, preferSvg, isCursor, tempPath, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DownloadIcons', {environment: environment, set: set, icon: icon, preferSvg: preferSvg, isCursor: isCursor, tempPath: tempPath}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/Icons/download`, 'get', null, {}, {environment: environment, set: set, icon: icon, preferSvg: preferSvg, isCursor: isCursor, tempPath: tempPath }, returnXML);
	}
}


async downloadLoginBackgroundAsync(env, type, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DownloadLoginBackground', {env: env, type: type}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/Login/download`, 'get', null, {}, {env: env, type: type }, returnXML);
	}
}


async downloadReflectionMapAsync(name, side, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DownloadReflectionMap', {name: name, side: side}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/ReflectionMap/download`, 'get', null, {}, {name: name, side: side }, returnXML);
	}
}


async downloadTempFileAsync(assetType, path, data, dynamicAssetProviderID, noContentHeader, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DownloadTempFile', {assetType: assetType, path: path, data: data, dynamicAssetProviderID: dynamicAssetProviderID, noContentHeader: noContentHeader}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${assetType}/download/tempfile`, 'get', null, {}, {path: path, data: data, dynamicAssetProviderID: dynamicAssetProviderID, noContentHeader: noContentHeader }, returnXML);
	}
}


async downloadURLAsync(apiKey, url, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DownloadURL', {apiKey: apiKey, url: url}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/urldownload`, 'get', apiKey, {}, {url: url }, returnXML);
	}
}


async dynamicAssetProviderGetTempAssetAsync(apiKey, dynamicAssetProviderID, data, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('DynamicAssetProviderGetTempAsset', {apiKey: apiKey, dynamicAssetProviderID: dynamicAssetProviderID, data: data}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/dynamicassetproviders/${dynamicAssetProviderID}/tempasset`, 'post', apiKey, {data: data }, {}, returnXML);
	}
}


async environmentAddAsync(apiKey, newName, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('EnvironmentAdd', {apiKey: apiKey, newName: newName}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/environments`, 'post', apiKey, {}, {newName: newName }, returnXML);
	}
}


async environmentCopyAsync(apiKey, environmentName, newName, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('EnvironmentCopy', {apiKey: apiKey, environmentName: environmentName, newName: newName}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/environments/${environmentName}/copy`, 'post', apiKey, {}, {newName: newName }, returnXML);
	}
}


async environmentDeleteAsync(apiKey, environmentName, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('EnvironmentDelete', {apiKey: apiKey, environmentName: environmentName}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/environments/${environmentName}`, 'delete', apiKey, {}, {}, returnXML);
	}
}


async environmentGetColorProfilesAsync(apiKey, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('EnvironmentGetColorProfiles', {apiKey: apiKey}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/environments/colorprofiles`, 'get', apiKey, {}, {}, returnXML);
	}
}


async environmentGetCurrentAsync(apiKey, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('EnvironmentGetCurrent', {apiKey: apiKey}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/environments/current`, 'get', apiKey, {}, {}, returnXML);
	}
}


async resourceItemGetXMLAsync(apiKey, resourceName, itemID, returnXML = true) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemGetXML', {apiKey: apiKey, resourceName: resourceName, itemID: itemID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/xml`, 'get', apiKey, {}, {}, returnXML);
	}
}


async resourceItemMoveAsync(apiKey, resourceName, itemID, newName, newFolderPath, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemMove', {apiKey: apiKey, resourceName: resourceName, itemID: itemID, newName: newName, newFolderPath: newFolderPath}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/move`, 'put', apiKey, {}, {newName: newName, newFolderPath: newFolderPath }, returnXML);
	}
}


async resourceItemRemovePreviewOverrideAsync(apiKey, resourceName, itemID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemRemovePreviewOverride', {apiKey: apiKey, resourceName: resourceName, itemID: itemID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/previewoverride`, 'delete', apiKey, {}, {}, returnXML);
	}
}


async resourceItemReplaceFileAsync(apiKey, resourceName, itemID, fileData, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemReplaceFile', {apiKey: apiKey, resourceName: resourceName, itemID: itemID, fileData: fileData}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/file`, 'put', apiKey, {fileData: fileData }, {}, returnXML);
	}
}


async resourceItemReplaceFileWithPreviewOverrideAsync(apiKey, resourceName, itemID, fileData, previewFileData, previewExtension, isPermanentPreview, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemReplaceFileWithPreviewOverride', {apiKey: apiKey, resourceName: resourceName, itemID: itemID, fileData: fileData, previewFileData: previewFileData, previewExtension: previewExtension, isPermanentPreview: isPermanentPreview}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/filewithpreview`, 'put', apiKey, {fileData: fileData, previewFileData: previewFileData }, {previewExtension: previewExtension, isPermanentPreview: isPermanentPreview }, returnXML);
	}
}


async resourceItemResetPreviewsAsync(apiKey, resourceName, itemID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemResetPreviews', {apiKey: apiKey, resourceName: resourceName, itemID: itemID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/previews`, 'delete', apiKey, {}, {}, returnXML);
	}
}


async resourceItemsAddFromZipAsync(apiKey, resourceName, folderPath, fileData, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemsAddFromZip', {apiKey: apiKey, resourceName: resourceName, folderPath: folderPath, fileData: fileData}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/fromzip`, 'post', apiKey, {fileData: fileData }, {folderPath: folderPath }, returnXML);
	}
}


async resourceItemSaveAsync(apiKey, resourceName, itemID, xml, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemSave', {apiKey: apiKey, resourceName: resourceName, itemID: itemID, xml: xml}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/save`, 'put', apiKey, {xml: xml }, {}, returnXML);
	}
}


async resourceItemSaveCustomMetaDataAsync(apiKey, resourceName, id, setName, xml, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemSaveCustomMetaData', {apiKey: apiKey, resourceName: resourceName, id: id, setName: setName, xml: xml}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${id}/metadata`, 'put', apiKey, {}, {setName: setName, xml: xml }, returnXML);
	}
}


async resourceLibraryGetSettingsAsync(apiKey, resourceName, libraryName, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceLibraryGetSettings', {apiKey: apiKey, resourceName: resourceName, libraryName: libraryName}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/folders/settings`, 'get', apiKey, {}, {libraryName: libraryName }, returnXML);
	}
}


async resourceLibrarySaveSettingsAsync(apiKey, resourceName, folderName, xml, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceLibrarySaveSettings', {apiKey: apiKey, resourceName: resourceName, folderName: folderName, xml: xml}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/folders/settings`, 'put', apiKey, {xml: xml }, {folderName: folderName }, returnXML);
	}
}


async resourceListAsync(apiKey, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceList', {apiKey: apiKey}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources`, 'get', apiKey, {}, {}, returnXML);
	}
}


async resourceSearchAsync(apiKey, resourceName, name, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceSearch', {apiKey: apiKey, resourceName: resourceName, name: name}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}`, 'get', apiKey, {}, {name: name }, returnXML);
	}
}


async resourceSearchByIDsAsync(apiKey, resourceName, IDs, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceSearchByIDs', {apiKey: apiKey, resourceName: resourceName, IDs: IDs}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/byid`, 'get', apiKey, {}, {IDs: IDs }, returnXML);
	}
}


async resourceSearchInFolderAsync(apiKey, resourceName, parentFolderPath, includeSubDirectories, name, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceSearchInFolder', {apiKey: apiKey, resourceName: resourceName, parentFolderPath: parentFolderPath, includeSubDirectories: includeSubDirectories, name: name}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/infolder`, 'get', apiKey, {}, {parentFolderPath: parentFolderPath, includeSubDirectories: includeSubDirectories, name: name }, returnXML);
	}
}


async resourceSearchPagedAsync(apiKey, resourceName, name, pageSize, pageNum, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceSearchPaged', {apiKey: apiKey, resourceName: resourceName, name: name, pageSize: pageSize, pageNum: pageNum}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/paged`, 'get', apiKey, {}, {name: name, pageSize: pageSize, pageNum: pageNum }, returnXML);
	}
}


async resourceSearchPagedWithSortingAsync(apiKey, resourceName, parentFolderPath, includeSubDirectories, name, pageSize, pageNum, sortOn, sortOrder, itemID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceSearchPagedWithSorting', {apiKey: apiKey, resourceName: resourceName, parentFolderPath: parentFolderPath, includeSubDirectories: includeSubDirectories, name: name, pageSize: pageSize, pageNum: pageNum, sortOn: sortOn, sortOrder: sortOrder, itemID: itemID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/sorted`, 'get', apiKey, {}, {parentFolderPath: parentFolderPath, includeSubDirectories: includeSubDirectories, name: name, pageSize: pageSize, pageNum: pageNum, sortOn: sortOn, sortOrder: sortOrder, itemID: itemID }, returnXML);
	}
}


async serverGetLicenseInfoAsync(apiKey, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ServerGetLicenseInfo', {apiKey: apiKey}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/server/licenseinfo`, 'get', apiKey, {}, {}, returnXML);
	}
}


async serverGetLoggingSettingsAsync(apiKey, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ServerGetLoggingSettings', {apiKey: apiKey}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/server/loggingsettings`, 'get', apiKey, {}, {}, returnXML);
	}
}


async serverGetSettingsAsync(apiKey, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ServerGetSettings', {apiKey: apiKey}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/server/settings`, 'get', apiKey, {}, {}, returnXML);
	}
}


async serverLicenseRequestAsync(apiKey, remoteFunction, argumentsXML, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ServerLicenseRequest', {apiKey: apiKey, remoteFunction: remoteFunction, argumentsXML: argumentsXML}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/server/licenserequest`, 'post', apiKey, {argumentsXML: argumentsXML }, {remoteFunction: remoteFunction }, returnXML);
	}
}


async serverLogClearAsync(apiKey, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ServerLogClear', {apiKey: apiKey}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/server/logs`, 'delete', apiKey, {}, {}, returnXML);
	}
}


async serverSaveLoggingSettingsAsync(apiKey, xml, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ServerSaveLoggingSettings', {apiKey: apiKey, xml: xml}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/server/loggingsettings`, 'put', apiKey, {xml: xml }, {}, returnXML);
	}
}


async serverSaveSettingsAsync(apiKey, xml, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ServerSaveSettings', {apiKey: apiKey, xml: xml}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/server/settings`, 'put', apiKey, {xml: xml }, {}, returnXML);
	}
}


async setAssetDirectoriesAsync(apiKey, userAssetDirectory, userGroupAssetDirectory, documentAssetDirectory, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SetAssetDirectories', {apiKey: apiKey, userAssetDirectory: userAssetDirectory, userGroupAssetDirectory: userGroupAssetDirectory, documentAssetDirectory: documentAssetDirectory}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/apikey/assetdirectories`, 'put', apiKey, {}, {userAssetDirectory: userAssetDirectory, userGroupAssetDirectory: userGroupAssetDirectory, documentAssetDirectory: documentAssetDirectory }, returnXML);
	}
}


async setAutomaticPreviewGenerationAsync(apiKey, createPreviews, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SetAutomaticPreviewGeneration', {apiKey: apiKey, createPreviews: createPreviews}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/apikey/autopreviewgeneration`, 'put', apiKey, {}, {createPreviews: createPreviews }, returnXML);
	}
}


async setContentAdministrationAsync(apiKey, allowContentAdministration, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SetContentAdministration', {apiKey: apiKey, allowContentAdministration: allowContentAdministration}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/apikey/contentadministration`, 'put', apiKey, {}, {allowContentAdministration: allowContentAdministration }, returnXML);
	}
}


async setNextResourceItemIDAsync(apiKey, resourceName, itemID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SetNextResourceItemID', {apiKey: apiKey, resourceName: resourceName, itemID: itemID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/nextitemid`, 'post', apiKey, {}, {itemID: itemID }, returnXML);
	}
}


async setUserLanguageAsync(apiKey, languageIdOrName, ignoreWorkSpaceLanguage, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SetUserLanguage', {apiKey: apiKey, languageIdOrName: languageIdOrName, ignoreWorkSpaceLanguage: ignoreWorkSpaceLanguage}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/apikey/userlanguage`, 'put', apiKey, {}, {languageIdOrName: languageIdOrName, ignoreWorkSpaceLanguage: ignoreWorkSpaceLanguage }, returnXML);
	}
}


async setWorkingEnvironmentAsync(apiKey, environmentName, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SetWorkingEnvironment', {apiKey: apiKey, environmentName: environmentName}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/apikey/workingenvironment`, 'put', apiKey, {}, {environmentName: environmentName }, returnXML);
	}
}


async setWorkspaceAdministrationAsync(apiKey, allowWorkspaceAdministration, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SetWorkspaceAdministration', {apiKey: apiKey, allowWorkspaceAdministration: allowWorkspaceAdministration}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/apikey/workspaceadministration`, 'put', apiKey, {}, {allowWorkspaceAdministration: allowWorkspaceAdministration }, returnXML);
	}
}


async switchServerFlowSubmitFileToFolderAsync(apiKey, switchServerID, flowID, elementID, filePathOrData, fileName, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SwitchServerFlowSubmitFileToFolder', {apiKey: apiKey, switchServerID: switchServerID, flowID: flowID, elementID: elementID, filePathOrData: filePathOrData, fileName: fileName}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/switchservers/${switchServerID}/flows/${flowID}/folder/${elementID}`, 'post', apiKey, {filePathOrData: filePathOrData }, {fileName: fileName }, returnXML);
	}
}


async switchServerFlowSubmitFileToSubmitPointAsync(apiKey, switchServerID, flowID, elementID, filePathOrData, fileName, metaXML, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SwitchServerFlowSubmitFileToSubmitPoint', {apiKey: apiKey, switchServerID: switchServerID, flowID: flowID, elementID: elementID, filePathOrData: filePathOrData, fileName: fileName, metaXML: metaXML}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/switchservers/${switchServerID}/flows/${flowID}/submitpoint/${elementID}`, 'post', apiKey, {filePathOrData: filePathOrData, metaXML: metaXML }, {fileName: fileName }, returnXML);
	}
}


async switchServerGetFlowListAsync(apiKey, switchServerID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SwitchServerGetFlowList', {apiKey: apiKey, switchServerID: switchServerID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/switchservers/${switchServerID}/flows`, 'get', apiKey, {}, {}, returnXML);
	}
}


async switchServerTestConnectionAsync(apiKey, url, userName, userPW, oemKey, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('SwitchServerTestConnection', {apiKey: apiKey, url: url, userName: userName, userPW: userPW, oemKey: oemKey}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/switchservers/testconnection`, 'get', apiKey, {}, {url: url, userName: userName, userPW: userPW, oemKey: oemKey }, returnXML);
	}
}


async taskGetEditorCliLogAsync(apiKey, taskID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('TaskGetEditorCliLog', {apiKey: apiKey, taskID: taskID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/tasks/${taskID}/editorclilog`, 'get', apiKey, {}, {}, returnXML);
	}
}


async taskGetStatusAsync(apiKey, taskID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('TaskGetStatus', {apiKey: apiKey, taskID: taskID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/tasks/${taskID}/status`, 'get', apiKey, {}, {}, returnXML);
	}
}


async taskGetStatusAndRemoveIfCompletedAsync(apiKey, taskID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('TaskGetStatusAndRemoveIfCompleted', {apiKey: apiKey, taskID: taskID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/tasks/${taskID}/status`, 'put', apiKey, {}, {}, returnXML);
	}
}


async taskRemoveFromLogAsync(apiKey, taskID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('TaskRemoveFromLog', {apiKey: apiKey, taskID: taskID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/tasks/${taskID}`, 'delete', apiKey, {}, {}, returnXML);
	}
}


async tasksGetListAsync(apiKey, includeRunningTasks, includeWaitingTasks, includeFinishedTasks, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('TasksGetList', {apiKey: apiKey, includeRunningTasks: includeRunningTasks, includeWaitingTasks: includeWaitingTasks, includeFinishedTasks: includeFinishedTasks}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/tasks`, 'get', apiKey, {}, {includeRunningTasks: includeRunningTasks, includeWaitingTasks: includeWaitingTasks, includeFinishedTasks: includeFinishedTasks }, returnXML);
	}
}


async tasksGetQueueOverviewAsync(apiKey, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('TasksGetQueueOverview', {apiKey: apiKey}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/tasks/queue`, 'get', apiKey, {}, {}, returnXML);
	}
}


async tasksGetStatusesAsync(apiKey, taskXML, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('TasksGetStatusses', {apiKey: apiKey, taskXML: taskXML}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/system/tasks/statuses`, 'get', apiKey, {taskXML: taskXML }, {}, returnXML);
	}
}


async threeDModelCreatePackageAsync(apiKey, threeDModelId, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ThreeDModelCreatePackage', {apiKey: apiKey, threeDModelId: threeDModelId}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/3dmodels/${threeDModelId}/package`, 'get', apiKey, {}, {}, returnXML);
	}
}


async uploadExternalAssetAsync(apiKey, url, fileName, fileData, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('UploadExternalAsset', {apiKey: apiKey, url: url, fileName: fileName, fileData: fileData}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/assets/external`, 'post', apiKey, {fileData: fileData }, {url: url, fileName: fileName }, returnXML);
	}
}


async xinetExecutePortalDICallAsync(apiKey, xinetServerID, callID, _arguments, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('XinetExecutePortalDICall', {apiKey: apiKey, xinetServerID: xinetServerID, callID: callID, arguments: _arguments}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/xinetservers/${xinetServerID}/calls/${callID}`, 'put', apiKey, {}, {arguments: arguments }, returnXML);
	}
}


async xinetSetCurrentCredentialsAsync(apiKey, userName, userPW, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('XinetSetCurrentCredentials', {apiKey: apiKey, userName: userName, userPW: userPW}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/xinetservers/currentcredentials`, 'put', apiKey, {}, {userName: userName, userPW: userPW }, returnXML);
	}
}


async xinetTestConnectionAsync(apiKey, url, userName, userPW, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('XinetTestConnection', {apiKey: apiKey, url: url, userName: userName, userPW: userPW}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/settings/xinetservers/testconnection`, 'get', apiKey, {}, {url: url, userName: userName, userPW: userPW }, returnXML);
	}
}


async resourceItemAddFromURLWithModificationDateAsync(apiKey, resourceName, newName, folderPath, url, login, pw, reuseExisting, previewFileURL, previewExtension, isPermanentPreview, modificationDate, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemAddFromURLWithModificationDate', {apiKey: apiKey, resourceName: resourceName, newName: newName, folderPath: folderPath, url: url, login: login, pw: pw, reuseExisting: reuseExisting, previewFileURL: previewFileURL, previewExtension: previewExtension, isPermanentPreview: isPermanentPreview, modificationDate: modificationDate}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/fromurlmod`, 'post', apiKey, {}, {newName: newName, folderPath: folderPath, url: url, login: login, pw: pw, reuseExisting: reuseExisting, previewFileURL: previewFileURL, previewExtension: previewExtension, isPermanentPreview: isPermanentPreview, modificationDate: modificationDate }, returnXML);
	}
}


async resourceItemAddPreviewOverrideAsync(apiKey, resourceName, itemID, previewFileData, previewExtension, isPermanentPreview, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemAddPreviewOverride', {apiKey: apiKey, resourceName: resourceName, itemID: itemID, previewFileData: previewFileData, previewExtension: previewExtension, isPermanentPreview: isPermanentPreview}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/previews`, 'put', apiKey, {previewFileData: previewFileData }, {previewExtension: previewExtension, isPermanentPreview: isPermanentPreview }, returnXML);
	}
}


async resourceItemAddWithPreviewAsync(apiKey, resourceName, newName, folderPath, xml, fileData, previewFileData, previewExtension, isPermanentPreview, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemAddWithPreview', {apiKey: apiKey, resourceName: resourceName, newName: newName, folderPath: folderPath, xml: xml, fileData: fileData, previewFileData: previewFileData, previewExtension: previewExtension, isPermanentPreview: isPermanentPreview}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/preview`, 'post', apiKey, {xml: xml, fileData: fileData, previewFileData: previewFileData }, {newName: newName, folderPath: folderPath, previewExtension: previewExtension, isPermanentPreview: isPermanentPreview }, returnXML);
	}
}


async resourceItemCopyAsync(apiKey, resourceName, itemID, newName, folderPath, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemCopy', {apiKey: apiKey, resourceName: resourceName, itemID: itemID, newName: newName, folderPath: folderPath}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/copy`, 'post', apiKey, {}, {newName: newName, folderPath: folderPath }, returnXML);
	}
}


async resourceItemDeleteAsync(apiKey, resourceName, itemID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemDelete', {apiKey: apiKey, resourceName: resourceName, itemID: itemID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}`, 'delete', apiKey, {}, {}, returnXML);
	}
}


async resourceItemGetByIdOrPathAsync(apiKey, resourceName, itemIdOrPath, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemGetByIdOrPath', {apiKey: apiKey, resourceName: resourceName, itemIdOrPath: itemIdOrPath}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items`, 'get', apiKey, {}, {itemIdOrPath: itemIdOrPath }, returnXML);
	}
}


async resourceItemGetByNameAsync(apiKey, resourceName, itemName, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemGetByName', {apiKey: apiKey, resourceName: resourceName, itemName: itemName}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/byname`, 'get', apiKey, {}, {itemName: itemName }, returnXML);
	}
}


async resourceItemGetByPathAsync(apiKey, resourceName, itemPath, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemGetByPath', {apiKey: apiKey, resourceName: resourceName, itemPath: itemPath}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/bypath`, 'get', apiKey, {}, {itemPath: itemPath }, returnXML);
	}
}


async resourceItemGetCacheInfoAsync(apiKey, resourceName, itemID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemGetCacheInfo', {apiKey: apiKey, resourceName: resourceName, itemID: itemID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/cacheinfo`, 'get', apiKey, {}, {}, returnXML);
	}
}


async resourceItemGetCustomMetaDataAsync(apiKey, resourceName, id, setName, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemGetCustomMetaData', {apiKey: apiKey, resourceName: resourceName, id: id, setName: setName}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${id}/metadata`, 'get', apiKey, {}, {setName: setName }, returnXML);
	}
}


async resourceItemGetDefinitionXMLAsync(apiKey, resourceName, itemID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemGetDefinitionXML', {apiKey: apiKey, resourceName: resourceName, itemID: itemID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/definitionxml`, 'get', apiKey, {}, {}, returnXML);
	}
}


async resourceItemGetHistoryAsync(apiKey, resourceName, itemID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemGetHistory', {apiKey: apiKey, resourceName: resourceName, itemID: itemID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/history`, 'get', apiKey, {}, {}, returnXML);
	}
}


async resourceItemGetPrivateInfoAsync(apiKey, resourceName, itemID, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemGetPrivateInfo', {apiKey: apiKey, resourceName: resourceName, itemID: itemID}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/privateinfo`, 'get', apiKey, {}, {}, returnXML);
	}
}


async resourceItemGetTransformedURLAsync(apiKey, resourceName, itemID, type, transformationID, pageNum, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemGetTransformedURL', {apiKey: apiKey, resourceName: resourceName, itemID: itemID, type: type, transformationID: transformationID, pageNum: pageNum}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/transformedurl`, 'get', apiKey, {}, {type: type, transformationID: transformationID, pageNum: pageNum }, returnXML);
	}
}


async resourceItemGetTransformedURLWithDebugInfoAsync(apiKey, resourceName, itemID, type, transformationID, pageNum, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemGetTransformedURLWithDebugInfo', {apiKey: apiKey, resourceName: resourceName, itemID: itemID, type: type, transformationID: transformationID, pageNum: pageNum}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/transformedurldebug`, 'get', apiKey, {}, {type: type, transformationID: transformationID, pageNum: pageNum }, returnXML);
	}
}


async resourceItemGetURLAsync(apiKey, resourceName, itemID, type, pageNum, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemGetURL', {apiKey: apiKey, resourceName: resourceName, itemID: itemID, type: type, pageNum: pageNum}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/url`, 'get', apiKey, {}, {type: type, pageNum: pageNum }, returnXML);
	}
}


async resourceItemGetURLForAnonymousUserAsync(apiKey, resourceName, itemID, type, pageNum, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemGetURLForAnonymousUser', {apiKey: apiKey, resourceName: resourceName, itemID: itemID, type: type, pageNum: pageNum}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/anonymousurl`, 'get', apiKey, {}, {type: type, pageNum: pageNum }, returnXML);
	}
}


async resourceItemGetURLWithDebugInfoAsync(apiKey, resourceName, itemID, type, pageNum, returnXML = false) {
	if (!this.options.rest){
		return await this.makeSoapCall('ResourceItemGetURLWithDebugInfo', {apiKey: apiKey, resourceName: resourceName, itemID: itemID, type: type, pageNum: pageNum}, returnXML);
	}
	else {
		return await this.makeRestCall(`/rest-api/v1/resources/${resourceName}/items/${itemID}/debugurl`, 'get', apiKey, {}, {type: type, pageNum: pageNum }, returnXML);
	}
}


}
module.exports = ChiliConnector;
