const Alexa = require("ask-sdk-core");

const DOCUMENT_ID = "telaNotas";

function exibirTelaNota(handlerInput,notaBoletim,colunaBoletim,boletim){

    
const datasource = {
    
    multipleChoiceTemplateData: {
        type: "object",
        properties: {
            backgroundImage: "https://i.pinimg.com/736x/85/5c/54/855c54f81ab1836750a28580715482e9.jpg",
            titleText: `${boletim.disciplina}`,
            choices: [
                `${colunaBoletim[0]}: ${notaBoletim[0]}`,
                `${colunaBoletim[1]}: ${notaBoletim[1]}`, 
                `${colunaBoletim[3]}: ${notaBoletim[3]}`,
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


