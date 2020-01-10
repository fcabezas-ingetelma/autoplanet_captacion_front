import HttpRequester from '../http/sms/httpRequester';

const createSolicitud = (payload, estado_id, onSuccess, onFailure) => {
    createSolicitudService(payload, estado_id, onSuccess, onFailure);
    return {
        type: 'create_solicitud', 
        payload
    }
}

const createSolicitudService = async (payload, estado_id, onSuccess, onFailure) => {
    let requester = new HttpRequester();
    let requestBody = {
        rut: payload.rut.split('-')[0], 
        estado_id: estado_id
    }
    const response = await requester.sendPutRequest('/v1/user/create-solicitud', requestBody);
    if(response && response.status == 200) {
        onSuccess(response.data.message);
    } else {
        onFailure();
    }
}

export default createSolicitud;