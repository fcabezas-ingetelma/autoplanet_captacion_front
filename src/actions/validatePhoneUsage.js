import HttpRequester from '../http/sms/httpRequester';
import * as CONSTANTS from '../utils/constants';

const validatePhoneUsage = (payload, onSuccess, onFailure) => {
    validatePhoneUsageService(payload, 
        () => {
            onSuccess();
        }, 
        (error) => {
            onFailure(error);
        });

    return {
        type: 'validate_phone_usage',
        payload
    }
}

const validatePhoneUsageService = async (payload, onSuccess, onFailure) => {
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

export default validatePhoneUsage;
