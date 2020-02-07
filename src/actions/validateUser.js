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
        'user': payload.user.split('-')[0],
        'pass': payload.password
    }

    const response =  await requester.sendPostRequest('/v1/backoffice/captador-auth', data);
    if(response && response.status == 200) {
        if(response.data.loginStatus) {
            onSuccess(response.data.token, response.data.adminType);
        } else {
            onFailure();
        }
    } else {
        onFailure();
    }

}

export default validateUser;