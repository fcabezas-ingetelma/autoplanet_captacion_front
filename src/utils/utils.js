function validaDV(T) {
    var M = 0, S = 1;
	for(; T; T = Math.floor(T/10)) {
        S = (S + T % 10 * (9 - M++ % 6)) % 11;
    } 
	return S ? S-1 : 'k';
}

function validaRut(rutCompleto) {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto )) {
        return false;
    }  
	var tmp 	= rutCompleto.split('-');
	var digv	= tmp[1].toLowerCase(); 
	var rut 	= tmp[0];
	return (validaDV(rut) + '' === digv );
}

function validaPhoneLength(phone) {
    return phone.length >= 8;
}

function getUrlVars(url) {
    var vars = {};
    var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(url, parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(url.indexOf(parameter) > -1){
        urlparameter = getUrlVars(url)[parameter];
    }
    return urlparameter;
}

function getPhoneValidationState(dataStore) {
    return { 
        rut: dataStore.getState().userData.rut !== '' ? dataStore.getState().userData.rut : '', 
        cellphone: dataStore.getState().userData.cellphone !== '' ? dataStore.getState().userData.cellphone : '', 
        ip: dataStore.getState().userData.ip !== '' ? dataStore.getState().userData.ip : '',
        clientType: dataStore.getState().userData.clientType !== '' ? dataStore.getState().userData.clientType : '', 
        attenderRut: dataStore.getState().userData.attenderRut !== '' ? dataStore.getState().userData.attenderRut : '', 
        canal: dataStore.getState().userData.canal !== '' ? dataStore.getState().userData.canal : '', 
        codeToValidate: dataStore.getState().userData.codeToValidate !== '' ? dataStore.getState().userData.codeToValidate : '',
        expires_at: dataStore.getState().userData.expires_at !== '' ? dataStore.getState().userData.expires_at : '', 
        confirmationChoice: dataStore.getState().userData.confirmationChoice !== '' ? dataStore.getState().userData.confirmationChoice : '', 
        email: dataStore.getState().userData.email !== '' ? dataStore.getState().userData.email : '', 
        estados: dataStore.getState().userData.estados !== '' ? dataStore.getState().userData.estados : ''
    };
}

function getConfirmationState(dataStore) {
    return { 
        rut: dataStore.getState().userData.rut !== '' ? dataStore.getState().userData.rut : '', 
        cellphone: dataStore.getState().userData.cellphone !== '' ? dataStore.getState().userData.cellphone : '', 
        ip: dataStore.getState().userData.ip !== '' ? dataStore.getState().userData.ip : '',
        clientType: dataStore.getState().userData.clientType !== '' ? dataStore.getState().userData.clientType : '', 
        attenderRut: dataStore.getState().userData.attenderRut !== '' ? dataStore.getState().userData.attenderRut : '', 
        canal: dataStore.getState().userData.canal !== '' ? dataStore.getState().userData.canal : '', 
        code: dataStore.getState().userData.code !== '' ? dataStore.getState().userData.code : '',
        confirmationChoice: dataStore.getState().userData.confirmationChoice !== '' ? dataStore.getState().userData.confirmationChoice : '', 
        email: dataStore.getState().userData.email !== '' ? dataStore.getState().userData.email : '', 
        estados: dataStore.getState().userData.estados !== '' ? dataStore.getState().userData.estados : ''
    };
}

export { validaRut, validaPhoneLength, getUrlParam, getPhoneValidationState, getConfirmationState };