import HttpRequester from '../http/sms/httpRequester';

const validateToken = (payload, onSuccess, onFailure) => {
    validateTokenService(payload, onSuccess, onFailure);
    return {
        type: 'validate_token', 
        payload
    }
}

const validateTokenService = async (payload, onSuccess, onFailure) => {
    let requester = new HttpRequester();
    const response = await requester.sendGetRequest('/v1/token/validate/' + payload.token + '/' + payload.cellphone);
    if(response && response.data.valid) {
        let requestBody = {
            cellphone: payload.cellphone, 
            token: payload.token
        }
        const tokenSetter = await requester.sendPatchRequest('/v1/token/set-token-used', requestBody);
        if(tokenSetter) {
            onSuccess();
        }
    } else {
        onFailure();
    }
}

export default validateToken;