const Alexa = require("ask-sdk-core");

const DOCUMENT_ID = "telaMestrado";

const datasource = {
    "textListData": {
        "type": "object",
        "objectId": "textListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://i.pinimg.com/736x/85/5c/54/855c54f81ab1836750a28580715482e9.jpg",
                    "size": "large"
                }
            ]
        },
        "title": "Cursos de mestrado",
        "listItems": [
            {
                "primaryText": "Mestrado Acadêmico em Ciências da Reabilitação",
                "primaryAction": [
                    {
                        "value": "${payload.textListData.listItems[0].primaryText}"
                    }
                ]
            },
            {
                "primaryText": "Mestrado Profissional em Desenvolvimento Local",
                "primaryAction": [
                    {
                        "value": "${payload.textListData.listItems[1].primaryText}"
                    }
                ]
            }
        ],
        "logoUrl": "https://www.unisuam.edu.br/wp-content/themes/unisuam/images/logo.png"
    }
};

const createDirectivePayload = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

exports.ExibirTelaMestrado = function(handlerInput) {
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID, datasource);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
};
