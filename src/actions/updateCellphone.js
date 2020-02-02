import HttpRequester from '../http/sms/httpRequester';

const updateCellphone = (payload, onSuccess, onFailure) => {
    reSendSms(payload, onSuccess, onFailure);
    return {
        type: 'update_cellphone', 
        payload
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

export default updateCellphone;