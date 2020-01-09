import HttpRequester from '../http/sms/httpRequester';

const getEstados = (onSuccess, onFailure) => {
    getEstadosService(onSuccess, onFailure);
    return {
        type: 'get_estados'
    }
}

const getEstadosService = async (onSuccess, onFailure) => {
    let requester = new HttpRequester();
    const response = await requester.sendGetRequest('/v1/user/estados');
    if(response) {
        onSuccess(response.data.message);
    } else {
        onFailure();
    }
}

export default getEstados;