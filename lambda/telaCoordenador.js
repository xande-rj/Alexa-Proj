const Alexa = require("ask-sdk-core");

const DOCUMENT_ID = "telaCoordenador";

const fs = require('fs');
const data = fs.readFileSync('./dados.json');
const usuarios = JSON.parse(data).usuarios;
const filtrarCurso = require('./filterUser.js');

function exibirTelaCoordenador(handlerInput){
    
const coordenador = filtrarCurso(usuarios, handlerInput);

const datasource = {
    "detailImageRightData": {
        "type": "object",
        "objectId": "detailImageRightSample",
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
        "title": "Horários  do Coordenador",
        "subtitle": "",
        "image": {
            "contentDescription": "",
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": `${coordenador.coordenador.foto}`,
                    "size": "large"
                }
            ]
        },
        "textContent": {
            "primaryText": {
                "type": "PlainText",
                "text": `${coordenador.coordenador.nome}`,
            },
            "rating": {
                "text": ""
            },
            "locationText": {
                "type": "PlainText",
                "text": `Disponibilidade: Segunda e Sexta, das ${coordenador.coordenador.horario}.`
            },
            "secondaryText": {
                "type": "PlainText",
                "text": `e-mail: ${coordenador.coordenador.email}`
            }
        },
        "buttons": [
            {
                "text": ""
            },
            {
                "text": ""
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

if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID, datasource);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

}

module.exports = exibirTelaCoordenador;

