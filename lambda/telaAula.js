const Alexa = require("ask-sdk-core");

const DOCUMENT_ID = "telaAula";

const removerSegundos = require('./fitrasegs.js');

function exibirTelaAula(handlerInput, materiasComAulasNoDia){
   

  let datasource;
  if (materiasComAulasNoDia.length === 1) {
    const horaInicio = removerSegundos(materiasComAulasNoDia[0].hora_inicio);

    const horaFim = removerSegundos(materiasComAulasNoDia[0].hora_fim);
    datasource = {
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
        "title": "Aula do dia",
        "listItems": [
            {
                "primaryText": `Aula: ${materiasComAulasNoDia[0].disciplina_nome}`,
                "primaryAction": [
                    {
                        "value": "${payload.textListData.listItems[0].primaryText}"
                    }
                ]
            },
            {
                "primaryText": `Professor: ${materiasComAulasNoDia[0].professor_nome}`,
                "primaryAction": [
                    {
                        "value": "${payload.textListData.listItems[1].primaryText}"
                    }
                ]
            },
            {
                "primaryText": `Data e hora: ${materiasComAulasNoDia[0].dia_semana} das ${horaInicio} as ${horaFim}`,
                "primaryAction": [
                    {
                        "value": "${payload.textListData.listItems[2].primaryText}"
                    }
                ]
            },
            {
                "primaryText": `Sala: ${materiasComAulasNoDia[0].sala_label}`,
                "primaryAction": [
                    {
                        "value": "${payload.textListData.listItems[3].primaryText}"
                    }
                ]
            },
        ],
        "logoUrl": "https://www.unisuam.edu.br/wp-content/themes/unisuam/images/logo.png"
      }
    }
  } else if (materiasComAulasNoDia.length === 2) {
    const horaInicio = removerSegundos(materiasComAulasNoDia[1].hora_inicio);

    const horaFim = removerSegundos(materiasComAulasNoDia[1].hora_fim);
     datasource = {
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
        "title": "Aula do dia",
        "listItems": [
            {
                "primaryText": `Aula: ${materiasComAulasNoDia[0].disciplina_nome}`,
                "primaryAction": [
                    {
                        "value": "${payload.textListData.listItems[0].primaryText}"
                    }
                ]
            },
            {
                "primaryText": `Professor: ${materiasComAulasNoDia[0].professor_nome}`,
                "primaryAction": [
                    {
                        "value": "${payload.textListData.listItems[1].primaryText}"
                    }
                ]
            },
            {
                "primaryText": `Data e hora: ${materiasComAulasNoDia[0].dia_semana} das ${horaInicio} as ${horaFim}`,
                "primaryAction": [
                    {
                        "value": "${payload.textListData.listItems[2].primaryText}"
                    }
                ]
            },
            {
                "primaryText": `Sala: ${materiasComAulasNoDia[0].sala_label}`,
                "primaryAction": [
                    {
                        "value": "${payload.textListData.listItems[3].primaryText}"
                    }
                ]
            },
            {
                "primaryText": `Aula: ${materiasComAulasNoDia[1].disciplina_nome}`,
                "primaryAction": [
                    {
                        "value": "${payload.textListData.listItems[0].primaryText}"
                    }
                ]
            },
            {
                "primaryText": `Professor: ${materiasComAulasNoDia[1].professor_nome}`,
                "primaryAction": [
                    {
                        "value": "${payload.textListData.listItems[1].primaryText}"
                    }
                ]
            },
            {
                "primaryText": `Data e hora: ${materiasComAulasNoDia[1].dia_semana} das ${horaInicio} as ${horaFim}`,
                "primaryAction": [
                    {
                        "value": "${payload.textListData.listItems[2].primaryText}"
                    }
                ]
            },
            {
                "primaryText": `Sala: ${materiasComAulasNoDia[1].sala_label}`,
                "primaryAction": [
                    {
                        "value": "${payload.textListData.listItems[3].primaryText}"
                    }
                ]
            },
        ],
        "logoUrl": "https://www.unisuam.edu.br/wp-content/themes/unisuam/images/logo.png"
      }
    }
  } else {
     datasource = {
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
        "title": "Aula do dia",
        "listItems": [
            {
                "primaryText": `você não tem aulas marcadas neste dia`,
                "primaryAction": [
                    {
                        "value": "${payload.textListData.listItems[0].primaryText}"
                    }
                ]
            },
        ],
        "logoUrl": "https://www.unisuam.edu.br/wp-content/themes/unisuam/images/logo.png"
      }
    }
  }

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

module.exports = exibirTelaAula;
