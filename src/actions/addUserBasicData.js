import HttpRequester from '../http/sms/httpRequester';
import * as CONSTANTS from '../utils/constants';

const addUserBasicData = (payload, onSuccess, onFailure) => {
    payload.codeToValidate = Math.floor(1000 + Math.random() * 9000);
    payload.expires_at = Date.now() + 900000;

    validatePhoneUsage(payload, 
        () => {
            createUser(payload, 
                () => {
                    if(payload.validationMethod == CONSTANTS.SMS) {
                        sendSms(payload, onSuccess, onFailure);
                    } else {
                        onSuccess();
                    }
                }, 
                () => {
                    validateUserStatus(payload, onSuccess, onFailure);
                }
            );
        }, 
        (error) => {
            onFailure(error);
        });

    return {
        type: 'add_user_basic_data',
        payload
    }
}

const validatePhoneUsage = async (payload, onSuccess, onFailure) => {
    let requester = new HttpRequester();
    const response = await requester.sendGetRequest('/v1/user/validations/phone/' + payload.rut.split('-')[0] + "/" + payload.cellphone);
    if(response && response.status == 200) {
        var isValid = response.data.isValid;
        var match = response.data.match;
        if(!isValid && !match) {
            //Rut doesn't match, another client is trying to put your phone
            onFailure(CONSTANTS.PHONE_EXISTS_ERROR_MESSAGE);
        } else {
            //Available to change
            onSuccess();
        }
    } else {
        onFailure(CONSTANTS.PHONE_EXISTS_ERROR_MESSAGE);
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
    let requester = new HttpRequester();

    //Update client basic data
    const updateResponse = updateUserBasicData(payload);

    if(updateResponse) {
        payload.codeToValidate = Math.floor(1000 + Math.random() * 9000);
        payload.expires_at = Date.now() + 900000;

        let requestBody = {
            code: payload.codeToValidate, 
            rut: payload.rut.split('-')[0], 
            cellphone: payload.cellphone
        }
        const response = await requester.sendPostRequest('/v1/sms/re-send-sms', requestBody);
        if(response && response.status == 200) {
            onSuccess();
        } else {
            onFailure();
        }
    } else {
        onFailure();
    }
}

const updateUserBasicData = async (payload) => {
    let requester = new HttpRequester();

    let updateRequestBody = {
        rut: payload.rut.split('-')[0],
        cellphone: payload.cellphone, 
        email: payload.email, 
        type: payload.clientType, 
        client_response: payload.confirmationChoice
    }

    //Update client basic data
    return await requester.sendPatchRequest('/v1/user/set-client', updateRequestBody);
}

const validateUserStatus = async (payload, onSuccess, onFailure) => {
    let requester = new HttpRequester();
    const userStatusResponse = await requester.sendGetRequest('/v1/user/validations/status/' + payload.rut.split('-')[0]);
    if(userStatusResponse && 
        userStatusResponse.data && userStatusResponse.data.code) {
        switch (userStatusResponse.data.code) {
            case 150: //SMS Sended but no validated, must send again
                if(payload.validationMethod == CONSTANTS.SMS) {
                    reSendSms(payload, onSuccess, onFailure);
                } else {
                    const updateResponse = updateUserBasicData(payload);
                    if(updateResponse) {
                        onSuccess();
                    } else {
                        onFailure();
                    }
                }
                break;
            case 160: //SMS Sended and validated, must finish process
                const updateResponse = updateUserBasicData(payload);
                if(updateResponse) {
                    onFailure(userStatusResponse.data.code);
                } else {
                    onFailure();
                }
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
        ip: payload.ip, 
        userAgent: payload.userAgent, 
        os: payload.os, 
        page: payload.page 
    }

    if(payload.attenderRut) {
        requestBody.rut_captador = payload.attenderRut.split('-')[0];
    }

    if(payload.canal) {
        requestBody.canal = payload.canal;
    }

    if(payload.sku) {
        requestBody.sku = payload.sku;
    }

    if(payload.canalPromotor) {
        requestBody.canal_promotor = payload.canalPromotor;
    }

    const response = await requester.sendPutRequest('/v1/user/set-client', requestBody);
    if(response) { 
        if(response.status == 200) {
            if(response.data.code == 'ER_DUP_ENTRY') {
                onFailure(CONSTANTS.USER_EXISTS_ERROR_MESSAGE);
            } else {
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