import HttpRequester from '../http/sms/httpRequester';

const getShortUrl = (payload, onSuccess, onFailure) => {
    getShortUrlService(payload, onSuccess, onFailure);
    return {
        type: 'get_short_url'
    }
}

const getShortUrlService = async (payload, onSuccess, onFailure) => {
    let requester = new HttpRequester();
    let requestBody = {
        url: payload.url,
        rut_captador: payload.attenderRut, 
        cellphone: payload.cellphone
    }
    const response = await requester.sendPostRequest('/v1/url/url-shortener-service', requestBody);
    if(response && response.data) {
        onSuccess(response.data.shortLink);
    } else {
        onFailure();
    }
}

export default getShortUrl;