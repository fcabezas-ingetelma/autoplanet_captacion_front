import HttpRequester from '../http/sms/httpRequester';

const validateUser = (payload, onSuccess, onFailure) => {
    validateLoginService(payload, onSuccess, onFailure);
    return {
        type: 'validate_user', 
        payload
    }
}

const validateLoginService = async (payload, onSuccess, onFailure) => {
    let requester = new HttpRequester();

    var data = {
        'user': payload.user,
        'pass': payload.password
    }

    const response =  await requester.sendPostRequest('/v1/backoffice/captador-auth',data);
    if(response && response.status == 200) {
        onSuccess();
    } else {
        onFailure();
    }

}

export default validateUser;