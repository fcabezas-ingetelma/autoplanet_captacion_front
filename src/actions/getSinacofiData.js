import HttpRequester from '../http/sms/httpRequester';

const getSinacofiData = (payload, onSuccess, onFailure) => {
    getSinacofiDataService(payload, onSuccess, onFailure);
    return {
        type: 'get_sinacofi_data', 
        payload
    }
}

const getSinacofiDataService = async (payload, onSuccess, onFailure) => {
    let requester = new HttpRequester();

    const response = await requester.sendGetRequest('/v1/user/get-sinacofi-data/' + payload.rut.replace('-', ''));
    if(response) {
        onSuccess(response);
    } else {
        onFailure();
    }
}

export default getSinacofiData;