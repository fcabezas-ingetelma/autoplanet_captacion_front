import HttpRequester from '../http/sms/httpRequester';

const updateAttendanceInfo = (payload, onSuccess, onFailure) => {
    gupdateAttendanceInfoService(payload, onSuccess, onFailure);
    return {
        type: 'update_attendance_info', 
        payload
    }
}

const gupdateAttendanceInfoService = async (payload, onSuccess, onFailure) => {
    let requester = new HttpRequester();
    let requestBody = {
        canal: payload.canal, 
        rut_captador: payload.attenderRut.split('-')[0], 
        rut_cliente: payload.rut.split('-')[0]
    }
    const response = await requester.sendPatchRequest('/v1/user/set-attendance-data', requestBody);
    if(response && response.data) {
        onSuccess(response.data.message);
    } else {
        onFailure();
    }
}

export default updateAttendanceInfo;