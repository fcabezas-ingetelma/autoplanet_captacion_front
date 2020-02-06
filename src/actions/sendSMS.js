import HttpRequester from '../http/sms/httpRequester';

const sendSMS = (payload, onSuccess, onFailure) => {
    sendSMSService(payload, onSuccess, onFailure);
    return {
        type: 'send_sms',
        payload
    }
}

const sendSMSService = async (payload, onSuccess, onFailure) => {
    payload.codeToValidate = Math.floor(1000 + Math.random() * 9000);
    payload.expires_at = Date.now() + 900000;

    let requester = new HttpRequester();
    let requestBody = {
        phone: '569' + payload.cellphone,
        code: payload.codeToValidate
    }

    if(payload.link) {
        requestBody.link = payload.link;
    }

    if(payload.canal) {
        requestBody.canal = payload.canal;
    }

    const response = await requester.sendPostRequest('/v1/sms/send-sms', requestBody);
    if(response && response.status == 200) {
        onSuccess();
    } else {
        onFailure();
    }
}

export default sendSMS;