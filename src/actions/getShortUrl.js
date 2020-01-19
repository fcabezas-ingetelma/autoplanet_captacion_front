import HttpRequester from '../http/sms/httpRequester';

const getShortUrl = (onSuccess, onFailure) => {
    getShortUrlService(onSuccess, onFailure);
    return {
        type: 'get_short_url'
    }
}

const getShortUrlService = async (onSuccess, onFailure) => {
    let requester = new HttpRequester();
    const response = await requester.sendPostRequest('/v1/user/estados');
    if(response && response.data) {
        onSuccess(response.data.message);
    } else {
        onFailure();
    }
}

export default getShortUrl;