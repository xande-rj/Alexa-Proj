const Alexa = require("ask-sdk-core");

const DOCUMENT_ID = "telaCoordenador";

function obterDiasSemanaDoQuadroHorario(quadroHorario) {
    return quadroHorario.map(item => item.diaSemana);
}

function converterParaExtenso(diaSemanaAbreviado) {
    const diasSemanaExtenso = {
        'DOM': 'Domingo',
        'SEG': 'Segunda-feira',
        'TER': 'Terça-feira',
        'QUA': 'Quarta-feira',
        'QUI': 'Quinta-feira',
        'SEX': 'Sexta-feira',
        'SAB': 'Sábado'
    };

    const diasSemanaExtensoArray = diaSemanaAbreviado.map(abreviado => diasSemanaExtenso[abreviado] || 'Dia Inválido');
    const disponibilidadeTexto = `ou nos seguintes dias  ${diasSemanaExtensoArray.join(', ')}`;
    return disponibilidadeTexto;
}

function exibirTelaCoordenador(handlerInput,coordenador,diaExtenso,horaInicio,horaFim){
    
const diaSemana = obterDiasSemanaDoQuadroHorario(coordenador.quadroHorario)
const diaSemanaExtenso =converterParaExtenso(diaSemana)

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
                    "url": `https://img.freepik.com/fotos-gratis/empresario-experiente-na-sala-de-escritorio-funcionario-de-escritorio-de-conteudo-indiano-em-oculos-sorrindo-e-posando-com-as-maos-postas-conceito-de-negocios-gestao-e-corporacao_74855-11681.jpg?w=1380&t=st=1704820984~exp=1704821584~hmac=7df555be7a6917d4b0aebc1ead9d780f300e9d607b8b22dc131871f841b3034f`,
                    "size": "large"
                }
            ]
        },
        "textContent": {
            "primaryText": {
                "type": "PlainText",
                "text": `${coordenador.nome}`,
            },
            "rating": {
                "text": ""
            },
            "locationText": {
                "type": "PlainText",
                "text": `Disponibilidade: ${diaExtenso}-feira, das ${horaInicio} ate as ${horaFim} ${diaSemanaExtenso} .`
            },
            "secondaryText": {
                "type": "PlainText",
                "text": `e-mail: ${coordenador.emails}`
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

