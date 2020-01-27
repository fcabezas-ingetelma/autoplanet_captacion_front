import HttpRequester from '../http/sms/httpRequester';

const getShortUrl = (payload, onSuccess, onFailure) => {
    getShortUrlService(payload, onSuccess, onFailure);
    return {
        type: 'get_short_url'
    }
}

const getShortUrlService = async (payload, onSuccess, onFailure) => {
    let requester = new HttpRequester();
    const tokenResponse = await requester.sendPutRequest('/v1/token/init-ws-token', { cellphone: payload.cellphone });
    if(tokenResponse.data.token) {
        let requestBody = {
            url: payload.url,
            rut_captador: payload.attenderRut, 
            cellphone: payload.cellphone, 
            token: tokenResponse.data.token
        }
        const response = await requester.sendPostRequest('/v1/url/url-shortener-service', requestBody);
        if(response && response.data) {
            onSuccess(response.data.shortLink);
        } else {
            onFailure();
        }
    } else {
        onFailure();
    }
}

export default getShortUrl;