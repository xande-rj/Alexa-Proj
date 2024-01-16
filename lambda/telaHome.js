const Alexa = require("ask-sdk-core");

const DOCUMENT_ID = "telaHome";

const datasource = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource114/v4/e8/7f/c5/e87fc582-5bc1-35c6-487e-a0d07f9b0c22/55ce851d-e508-42f3-98cf-0fcf43545bda_Simulator_Screen_Shot_-_iPad_Pro__U002812.9-inch_U0029__U00284th_generation_U0029_-_2020-08-12_at_09.47.37.png/643x0w.jpg",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": ""
                }
            },
            "logoUrl": "",
            "hintText": "Universidade Lima, Compromisso para a vida toda!"
        }
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

exports.ExibirTelaHome = function(handlerInput) {
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID, datasource);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
};