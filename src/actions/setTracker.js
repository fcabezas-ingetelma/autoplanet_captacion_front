import HttpRequester from '../http/sms/httpRequester';

const setTracker = (payload, onSuccess, onFailure) => {
    setTrackerService(payload, onSuccess, onFailure);
    return {
        type: 'set_tracker', 
        payload
    }
}

const setTrackerService = async (payload, onSuccess, onFailure) => {
    let requester = new HttpRequester();
    let requestBody = {
        ip: payload.ip, 
        userAgent: payload.userAgent, 
        os: payload.os, 
        page: payload.page 
    }

    if(payload.rut) {
        requestBody.rut_cliente = payload.rut.split('-')[0];
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

    if(payload.cellphone) {
        requestBody.cellphone = payload.cellphone;
    }

    if(payload.canalPromotor) {
        requestBody.canalPromotor = payload.canalPromotor;
    }

    const response = await requester.sendPutRequest('/v1/user/set-tracker', requestBody);
    if(response && response.status == 200) {
        onSuccess(response.data.message);
    } else {
        onFailure();
    }
}

export default setTracker;