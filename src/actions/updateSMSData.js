import HttpRequester from '../http/sms/httpRequester';

const updateSMSData = (payload, onSuccess, onFailure) => {
    updateSMSDataService(payload, onSuccess, onFailure);
    return {
        type: 'update_sms_data', 
        payload
    }
}

const updateSMSDataService = async (payload, onSuccess, onFailure) => {
    let requester = new HttpRequester();
    let requestBody = {
        rut: payload.rut.split('-')[0], 
        validatedSMSCode: payload.code
    }
    const response = await requester.sendPatchRequest('/v1/user/update-validated-sms', requestBody);
    if(response && response.status == 200) {
        onSuccess(response.data.message);
    } else {
        onFailure();
    }
}

export default updateSMSData;