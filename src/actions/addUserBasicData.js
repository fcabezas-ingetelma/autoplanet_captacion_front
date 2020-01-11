import HttpRequester from '../http/sms/httpRequester';
import * as CONSTANTS from '../utils/constants';

const addUserBasicData = (payload, onSuccess, onFailure) => {
    payload.codeToValidate = Math.floor(1000 + Math.random() * 9000);
    payload.expires_at = Date.now() + 900000;

    createUser(payload, 
        () => {
            sendSms(payload, onSuccess, onFailure);
        }, 
        () => {
            validateUserStatus(payload, onSuccess, onFailure);
        }
    );

    return {
        type: 'add_user_basic_data',
        payload
    }
}

const sendSms = async (payload, onSuccess, onFailure) => {
    let requester = new HttpRequester();
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
}

const reSendSms = async (payload, onSuccess, onFailure) => {
    payload.codeToValidate = Math.floor(1000 + Math.random() * 9000);
    payload.expires_at = Date.now() + 900000;

    let requester = new HttpRequester();
    let requestBody = {
        code: payload.codeToValidate, 
        rut: payload.rut.split('-')[0]
    }
    const response = await requester.sendPostRequest('/v1/sms/re-send-sms', requestBody);
    if(response && response.status == 200) {
        onSuccess();
    } else {
        onFailure();
    }
}

const validateUserStatus = async (payload, onSuccess, onFailure) => {
    let requester = new HttpRequester();
    const userStatusResponse = await requester.sendGetRequest('/v1/user/validations/status/' + payload.rut.split('-')[0], null);
    if(userStatusResponse && 
        userStatusResponse.data && userStatusResponse.data.code) {
        switch (userStatusResponse.data.code) {
            case 150: //SMS Sended but no validated, must send again
                reSendSms(payload, onSuccess, onFailure);
                break;
            case 160: //SMS Sended and validated, must finish process
                onFailure(userStatusResponse.data.code);
                break;
            case 170: //Process finished
                onFailure(userStatusResponse.data.code + "-" + userStatusResponse.data.message);
                break;
            default: //Error
                onFailure(CONSTANTS.PHONE_EXISTS_ERROR_MESSAGE);
        }
    } else {
        onFailure();
    }
}

const createUser = async (payload, onSuccess, onFailure) => {
    let requester = new HttpRequester();
    let rutData = payload.rut.split('-');
    let requestBody = {
        rut: rutData[0],
        dv: rutData[1], 
        cellphone: payload.cellphone, 
        email: payload.email, 
        type: payload.clientType, 
        sended_sms_code: payload.codeToValidate, 
        client_response: payload.confirmationChoice, 
        ip: payload.ip
    }

    if(payload.attenderRut) {
        requestBody.rut_captador = payload.attenderRut.split('-')[0];
    }

    if(payload.canal) {
        requestBody.canal = payload.canal;
    }

    const response = await requester.sendPutRequest('/v1/user/set-client', requestBody);
    if(response) { 
        if(response.status == 200) {
            if(response.data.code == 'ER_DUP_ENTRY') {
                onFailure(CONSTANTS.USER_EXISTS_ERROR_MESSAGE);
            } else {
                const updateDataWithSinacofi = await requester.sendGetRequest('/v1/user/get-sinacofi-data/' + payload.rut.replace('-', ''));
                onSuccess();
            }
        } else {
            onFailure(CONSTANTS.USER_EXISTS_ERROR_MESSAGE);
        }
    } else {
        onFailure();
    }
}

export default addUserBasicData;