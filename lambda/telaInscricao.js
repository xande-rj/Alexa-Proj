const Alexa = require("ask-sdk-core");

const DOCUMENT_ID = "telaInscricao";

const datasource = {
    "simpleTextTemplateData": {
        "type": "object",
        "properties": {
            "backgroundImage": "https://i.pinimg.com/736x/85/5c/54/855c54f81ab1836750a28580715482e9.jpg",
            "foregroundImageLocation": "left",
            "foregroundImageSource": "data:image/png;base64,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",
            "headerTitle": "",
            "headerSubtitle": "",
            "hintText": "UNISUAM, Compromisso para a vida toda!",
            "headerAttributionImage": "",
            "primaryText": "Inscreva-se pelo site www.unisuam.edu.br, ou ligue para o telefone 21 3882-9797. Ainda também é possível inscrever se pelo Whatsapp através da operação coruja no número 21 996-807-990",
            "textAlignment": "start",
            "titleText": "Inscrição"
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

exports.ExibirTelaInscricao = function(handlerInput) {
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID, datasource);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
};
