import HttpRequester from '../http/sms/httpRequester';

const updateAttendanceInfo = (payload, onSuccess, onFailure) => {
    updateAttendanceInfoService(payload, onSuccess, onFailure);
    return {
        type: 'update_attendance_info', 
        payload
    }
}

const updateAttendanceInfoService = async (payload, onSuccess, onFailure) => {
    let requester = new HttpRequester();
    let requestBody = {
        rut_cliente: payload.rut.split('-')[0]
    }

    if(payload.attenderRut) {
        requestBody.rut_captador = payload.attenderRut.split('-')[0];
    }

    if(payload.canal) {
        requestBody.canal = payload.canal;
    }

    const response = await requester.sendPatchRequest('/v1/user/set-attendance-data', requestBody);
    if(response && response.data) {
        onSuccess(response.data.message);
    } else {
        onFailure();
    }
}

export default updateAttendanceInfo;