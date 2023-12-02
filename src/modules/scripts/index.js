var nodeoutlook = require('nodejs-nodemailer-outlook');

// Função para verificar se um horário está no intervalo
exports.horarioNoIntervalo = (horario) => {
  const partesHorario = horario.split(':');
  const hora = parseInt(partesHorario[0]);
  const minuto = parseInt(partesHorario[1]);

  if (
    (hora === 20 && minuto >= 0) ||
    (hora > 20 && hora < 24) ||
    (hora === 0 && minuto <= 59) ||
    (hora >= 0 && hora < 6)
  ) {
    return true;
  } else {
    return false;
  }
}

exports.adicionarPrefixoMocambique = (numero) => {
  // Verifique se o número já começa com "+258"
  if (numero.startsWith("+258")) {
    return numero; // Não faça nada se já tiver o prefixo
  } else {
    // Adicione o prefixo "+258" ao número e retorne
    return "+258" + numero;
  }
}

exports.senderMessage = (phone, message) => {
  const axios = require('axios');

  const headers = {
    'Content-Type': 'application/json',
    'cache-control': 'no-cache'
  };

  const url = 'https://api-prod.solarworksmalawi.lamt.app/message-hub/message/sms';

  // Supondo que 'phone' e 'message' já estejam definidos anteriormente
  const payload = {
    sender: 'SolarWorks',
    recipient: phone,
    content: message
  };

  const promise = new Promise((resolve, reject) => {
    const resultado = axios.post(url, payload, {
      headers: headers,
      auth: {
        username: 'solarworksmalawi',
        password: 'R85^Pqduf5z5&QU2RtQI7ID;sMzp[,'
      }
    })

    resolve(resultado);
  });

  // Retornar a Promise
  promise
    .then((resultado) => {
      return resultado
    })
    .catch((erro) => {
      return erro
    });

}

exports.sendMail = (link, dataActual) => {
  nodeoutlook.sendEmail({
    auth: {
      user: "power.platform@solar.works",
      pass: "PowerPlatform2022"
    },
    from: 'power.platform@solar.works',
    to: 'j.sambo@solar-works.co.mz',
    subject: `Contas ao cobrar no dia ${dataActual}`,
    html: `<div>Por favor, clique no link a seguir para acessar as contas que serão cobradas no dia${dataActual}
      <a href="${link}"> Click aqui</a>
       </div>`,
    text: 'This is text version!',
    replyTo: 'receiverXXX@gmail.com',
    attachments: [],
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
  });
};