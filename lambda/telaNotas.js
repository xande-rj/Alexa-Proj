const Alexa = require("ask-sdk-core");

const DOCUMENT_ID = "telaNotas";

const fs = require('fs');
const data = fs.readFileSync('./dados.json');
const usuarios = JSON.parse(data).usuarios;

const filtrarNotas = require('./filterNotas.js');

function exibirTelaNota(handlerInput){

const notas = filtrarNotas(usuarios, handlerInput);
    
const datasource = {
    
    multipleChoiceTemplateData: {
        type: "object",
        properties: {
            backgroundImage: "https://i.pinimg.com/736x/85/5c/54/855c54f81ab1836750a28580715482e9.jpg",
            titleText: `${notas.nome}`,
            choices: [
                `A1: ${notas.notas.a1}`,
                `A2: ${notas.notas.a2}`, 
                `A3: ${notas.notas.a3}`,
                `Média: ${notas.notas.media}`
            ],
            choiceListType: "",
            headerAttributionImage: "https://www.unisuam.edu.br/wp-content/themes/unisuam/images/logo.png",
            footerHintText: "Universidade UNISUAM, Compromisso para a vida toda!"
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

        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID, datasource);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

}

module.exports = exibirTelaNota;


