/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
// Função tela
const exibirTelaAula = require('./telaAula.js');
const exibirTelaNota = require('./telaNotas.js');
const exibirTelaCoordenador = require('./telaCoordenador.js');
const parTelaHome = require('./telaHome.js');
const parTelaPosGraduacao = require('./telaPosGraduacao.js');
const parTelaMestrado = require('./telaMestrado.js');
const parTelaInscricao = require('./telaInscricao.js');

// Função alexa use
const encontrarObjetoPorSemestre = require('./fitraNotasSemestre.js')
const returnInfoAulas = require('./returnInfoAulas.js');
const returnConsoleAula = require('./returnConsoleAula.js');
const returnDiaSemana = require('./returnDiaSemana.js');
const removerSegundos = require('./fitrasegs.js');
const diaMaisProximo = require('./filterdiacoordenador.js');
const abreviacaoParaDiaExtenso = require('.//diaextenso.js');

const axios = require('axios');

const fetchApi = async (value) => {
    const apiUrl = value;
    try {
        const response = await axios.get(apiUrl);
        const dados = response;
        return dados;
    } catch (error) {
        console.error('Erro ao fazer a requisição à API:', error);
        throw error; // Rejeitar a promessa em caso de erro
    }
}


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        try {
            const dados_usuario = await fetchApi('https://659ecf0447ae28b0bd36be64.mockapi.io/api/user');
            const speakOutput = ` Bem vindo ${dados_usuario.data[0].data.aluno_nome}, ao Centro Universitário Augusto Motta. Compromisso para a vida toda. Aqui você poderá acessar o seu calendário de aulas, o boletim de notas, horário do seu coordenador e mais. O que você gostaria ?`;
            parTelaHome.ExibirTelaHome(handlerInput);

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        } catch (error) {
            const speakOutput = 'Você tentou acessar o app do Centro Universitário Augusto Motta sem estar logado, logue para acessá-lo.';
            parTelaHome.ExibirTelaHome(handlerInput);

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();

        }
    }
};


const AulaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AulaIntent';
    },

    async handle(handlerInput) {
        const parDiaSemana = handlerInput.requestEnvelope.request.intent.slots.diaSemana.value;
        let speakOutput = 'não entendi. pode repitir?';
        var diaSemanaDesejado;
        var materiasComAulasNoDia;
        var frase;
        var tempo = true;

        try {

            const quadroHorario = await fetchApi('https://659ecf0447ae28b0bd36be64.mockapi.io/api/quadro-horario');
            switch (parDiaSemana) {

                case "hoje":
                    diaSemanaDesejado = returnDiaSemana(parDiaSemana);
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia, tempo);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia);
                    break;

                case "amanhã":
                    diaSemanaDesejado = returnDiaSemana(parDiaSemana);
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia, tempo);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia);
                    break;

                case "2ª": case "2.ª": case "2.ª feira": case "segunda": case "segunda feira":
                    diaSemanaDesejado = 'Segunda-Feira';
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia, tempo);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia);
                    break;

                case "3ª": case "3.ª": case "3.ª feira": case "terça": case "terça feira":
                    diaSemanaDesejado = 'Terça-Feira';
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia, tempo);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia);
                    break;

                case "4ª": case "4.ª": case "4.ª feira": case "quarta": case "quarta feira":
                    diaSemanaDesejado = 'Quarta-Feira';
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia, tempo);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia);
                    break;

                case "5ª": case "5.ª": case "5.ª feira": case "quinta": case "quinta feira":
                    diaSemanaDesejado = 'Quinta-Feira';
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia, tempo);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia);
                    break;

                case "6ª": case "6.ª": case "6.ª feira": case "sexta": case "sexta feira":
                    diaSemanaDesejado = 'Sexta-Feira';
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia, tempo);
                    break;

                case "sábado":
                    diaSemanaDesejado = 'Sábado';
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia, tempo);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia);
                    break;

                case "domingo":
                    diaSemanaDesejado = 'Domingo';
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia, tempo);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia);
                    break;
            }

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();

        } catch (error) {
            const speakOutput = 'Houve um erro no servidor.';
            parTelaHome.ExibirTelaHome(handlerInput);

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();

        }
    }
};

const AulaPassadoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AulaPassadoIntent';
    },

    async handle(handlerInput) {

        const parDiaSemana = handlerInput.requestEnvelope.request.intent.slots.diaSemanaPas.value;
        let speakOutput = 'não entendi. pode repitir?';
        var diaSemanaDesejado;
        var materiasComAulasNoDia;
        var frase;
        var tempo = false;

        try {
            const quadroHorario = await fetchApi('https://659ecf0447ae28b0bd36be64.mockapi.io/api/quadro-horario');
            switch (parDiaSemana) {

                case "hoje":
                    diaSemanaDesejado = returnDiaSemana(parDiaSemana);
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia, tempo);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia);
                    break;

                case "ontem":
                    diaSemanaDesejado = returnDiaSemana(parDiaSemana);
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia, tempo);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia);
                    break;

                case "2ª": case "2.ª": case "2.ª feira": case "segunda": case "segunda feira":
                    diaSemanaDesejado = "Segunda-Feira";
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia, tempo);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia);
                    break;

                case "3ª": case "3.ª": case "3.ª feira": case "terça": case "terça feira":
                    diaSemanaDesejado = "Terça-Feira";
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia, tempo);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia);
                    break;

                case "4ª": case "4.ª": case "4.ª feira": case "quarta": case "quarta feira":
                    diaSemanaDesejado = "Quarta-Feira";
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia, tempo);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia);
                    break;

                case "5ª": case "5.ª": case "5.ª feira": case "quinta": case "quinta feira":
                    diaSemanaDesejado = "Quinta-Feira";
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia, tempo);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia);
                    break;

                case "6ª": case "6.ª": case "6.ª feira": case "sexta": case "sexta feira":
                    diaSemanaDesejado = "Sexta-Feira";
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia, tempo);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia);
                    break;

                case "sábado":
                    diaSemanaDesejado = "Sábado";
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia, tempo);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia);
                    break;

                case "domingo":
                    diaSemanaDesejado = "Domingo";
                    materiasComAulasNoDia = returnInfoAulas(quadroHorario.data, diaSemanaDesejado);
                    frase = returnConsoleAula(materiasComAulasNoDia, tempo);

                    speakOutput = frase;
                    exibirTelaAula(handlerInput, materiasComAulasNoDia);
                    break;
            }

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();

        } catch (error) {
            const speakOutput = 'Houve um erro no servidor.';
            parTelaHome.ExibirTelaHome(handlerInput);

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();

        }


    }

};

const HorarioCoordenadorIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HorarioCoordenadorIntent';
    },
     async handle(handlerInput) {
        try {
            const coordenadorResponse = await fetchApi('https://65a53f6952f07a8b4a3eb0f4.mockapi.io/api/coordenador');

            const coordenadorInfo = coordenadorResponse.data[0];

            const horaInicio = removerSegundos(coordenadorInfo.quadroHorario[0].horaInicio);

            const horaFim = removerSegundos(coordenadorInfo.quadroHorario[0].horaFim);

            const diaProximo = diaMaisProximo(coordenadorResponse.data);
            
            const diaExtenso = abreviacaoParaDiaExtenso(diaProximo);

            const speakOutput = `O coordenador ${coordenadorInfo.nome} está disponível na unidade ${coordenadorInfo.quadroHorario[0].descricao}, na ${diaExtenso}-feira, a partir das ${horaInicio} até as ${horaFim}.`;
            
            exibirTelaCoordenador(handlerInput,coordenadorInfo,diaExtenso,horaInicio,horaFim);

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        } catch (error) {
            const speakOutput = 'Parece que o servidor esta passando por um problema tente pelo site ou mais tarde';
            parTelaHome.ExibirTelaHome(handlerInput);

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();

        }
    }
};

const PosGraduacaoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PosGraduacaoIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'A universidade fornece os seguintes cursos de Pós Graduação. Análises Clínicas e Patológicas, Engenharia Estrutural, Planejamento Tributário e Produção de Conteúdo Digital.';
        parTelaPosGraduacao.ExibirTelaPosGraduacao(handlerInput);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const MestradoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MestradoIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'A universidade fornece os seguintes cursos de Mestrado. Mestrado Acadêmico em Ciências da Reabilitação, Mestrado Profissional em Desenvolvimento Local.';
        parTelaMestrado.ExibirTelaMestrado(handlerInput);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const InscricaoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'InscricaoIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Você precisa ter concluído o ensino médio para realizar a inscrição. Tendo atendido estes requisitos, inscreva-se pelo site www.unisuam.edu.br, ou ligue para o telefone 21 3882-9797. Ainda também é possível inscrever se pelo Whatsapp através da operação coruja no número 21 996-807-990.';
        parTelaInscricao.ExibirTelaInscricao(handlerInput);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const notasMateriasIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'notasMateriasIntent';
    },
    async handle(handlerInput) {
        try{
            const boletim = await fetchApi('https://65a53f6952f07a8b4a3eb0f4.mockapi.io/api/boletim');

            const boletimInfo = encontrarObjetoPorSemestre(boletim.data,'2024-1');
            const colunaBoletim= boletimInfo.colunas
            const notaBoletim = boletimInfo.notas

            // if(notaBoletim[2]==''){
            //     const speakOutput = `Sua notas são ${colunaBoletim[0]} : ${notaBoletim[0]},${colunaBoletim[1]} : ${notaBoletim[1]} e sua media final e : ${notaBoletim[3]}`;
            //     return speakOutput
            // }
                const speakOutput = `Sua notas são ${colunaBoletim[0]} : ${notaBoletim[0]},${colunaBoletim[1]} : ${notaBoletim[1]} e sua media final e : ${notaBoletim[3]}`;

            exibirTelaNota(handlerInput,notaBoletim,colunaBoletim,boletimInfo)
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
        catch(err){
            const speakOutput = `erro ao acessar o servidor por favor tente mais tarde obrigado.`;
    
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Tchau!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Desculpe, eu não entendi. Pode repetir?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        AulaIntentHandler,
        AulaPassadoIntentHandler,
        HorarioCoordenadorIntentHandler,
        PosGraduacaoIntentHandler,
        MestradoIntentHandler,
        InscricaoIntentHandler,
        notasMateriasIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();