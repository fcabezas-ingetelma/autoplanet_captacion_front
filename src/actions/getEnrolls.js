import HttpRequester from '../http/sms/httpRequester';

const getEnrolls = (payload, onSuccess, onFailure) => {
    getEnrollsService(payload, onSuccess, onFailure);
    return {
        type: 'get_enrolls'
    }
}

const getEnrollsService = async (payload, onSuccess, onFailure) => {
    let requester = new HttpRequester();

    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': payload.token
        }
    };

    const response = await requester.sendGetRequestWithHeaders('/v1/backoffice/get-captador-dashboard/' + payload.user, config);
    if(response && response.data) {
        onSuccess(response.data.data);
    } else {
        onFailure();
    }
}

export default getEnrolls;