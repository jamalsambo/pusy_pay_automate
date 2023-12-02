var axios = require('axios');

exports.api = (param, params, method) => {
    var username = "solar.works@angaza.com";
    var password = "I@bZ4b7Sxx9Sd879Fc1";
    var url = `https://payg.angazadesign.com/data/${param}`;

    const token = `${username}:${password}`;
    const encodedToken = Buffer.from(token).toString('base64');
    const session_url = url;

    var config = {
        method: method,
        url: session_url,
        data: params,
        headers: { 'Authorization': 'Basic ' + encodedToken }
    };

    const response = axios(config)
        .then((response) => {
            return response.data;
        })
        .catch(function (error) {
           return `error + ${error}`
        });

    return response
};