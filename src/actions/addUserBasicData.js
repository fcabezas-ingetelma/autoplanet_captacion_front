import HttpRequester from '../http/sms/httpRequester';
import * as CONSTANTS from '../utils/constants';

const addUserBasicData = (payload, onSuccess, onFailure) => {
    payload.codeToValidate = Math.floor(1000 + Math.random() * 9000);
    payload.expires_at = Date.now() + 900000;

    sendSms(payload, 
        () => {
            createUser(payload, onSuccess, onFailure);
        }, 
        (error) => {
            onFailure(error);
        }
    );

    return {
        type: 'add_user_basic_data',
        payload
    }
}

const sendSms = async (payload, onSuccess, onFailure) => {
    let requester = new HttpRequester();
    const phoneValidationResponse = await requester.sendGetRequest('/v1/user/validations/phone/' + payload.cellphone, null);
    if(phoneValidationResponse && !phoneValidationResponse.data.exists) {
        let requestBody = {
            phone: '569' + payload.cellphone,
            code: payload.codeToValidate
        }
        const response = await requester.sendPostRequest('/v1/sms/send-sms', requestBody);
        if(response && response.status == 200) {
            onSuccess();
        } else {
            onFailure();
        }
    } else {
        onFailure(CONSTANTS.PHONE_EXISTS_ERROR_MESSAGE);
    }
}

const createUser = async (payload, onSuccess, onFailure) => {
    let requester = new HttpRequester();
    let rutData = payload.rut.split('-');
    let requestBody = {
        rut: rutData[0],
        dv: rutData[1], 
        cellphone: payload.cellphone, 
        type: payload.clientType, 
        sended_sms_code: payload.codeToValidate
    }

    const response = await requester.sendPutRequest('/v1/user/set-client', requestBody);
    if(response) { 
        if(response.status == 200) {
            onSuccess();
        } else {
            onFailure(CONSTANTS.USER_EXISTS_ERROR_MESSAGE);
        }
    } else {
        onFailure();
    }
}

export default addUserBasicData;