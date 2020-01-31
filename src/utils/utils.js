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

function rutChecker(e){
    let value = e.target.value.replace(/\./g, '').replace('-', '');

    if (value.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1$2$3-$4');
    }
    else if (value.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
      value = value.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, '$1$2$3-$4');
    }
    else if (value.match(/^(\d)(\d{3})(\d{0,2})$/)) {
      value = value.replace(/^(\d)(\d{3})(\d{0,2})$/, '$1$2$3');
    }
    else if (value.match(/^(\d)(\d{0,2})$/)) {
      value = value.replace(/^(\d)(\d{0,2})$/, '$1$2');
    }
    e.target.value = value;
}

function validaEmail(email) {
    return email.includes('@');
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

function decodeFromBase64(input) {
    return Buffer.from(input, 'base64').toString('ascii');
}

function getPhoneValidationState(dataStore) {
    return { 
        rut: dataStore.getState().userData.rut !== '' ? dataStore.getState().userData.rut : '', 
        cellphone: dataStore.getState().userData.cellphone !== '' ? dataStore.getState().userData.cellphone : '', 
        ip: dataStore.getState().userData.ip !== '' ? dataStore.getState().userData.ip : '', 
        userAgent: dataStore.getState().userData.userAgent !== '' ? dataStore.getState().userData.userAgent : '', 
        os: dataStore.getState().userData.os !== '' ? dataStore.getState().userData.os : '', 
        clientType: dataStore.getState().userData.clientType !== '' ? dataStore.getState().userData.clientType : '', 
        attenderRut: dataStore.getState().userData.attenderRut !== '' ? dataStore.getState().userData.attenderRut : '', 
        canal: dataStore.getState().userData.canal !== '' ? dataStore.getState().userData.canal : '', 
        sku: dataStore.getState().userData.sku !== '' ? dataStore.getState().userData.sku : '', 
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
        userAgent: dataStore.getState().userData.userAgent !== '' ? dataStore.getState().userData.userAgent : '', 
        os: dataStore.getState().userData.os !== '' ? dataStore.getState().userData.os : '', 
        clientType: dataStore.getState().userData.clientType !== '' ? dataStore.getState().userData.clientType : '', 
        attenderRut: dataStore.getState().userData.attenderRut !== '' ? dataStore.getState().userData.attenderRut : '', 
        canal: dataStore.getState().userData.canal !== '' ? dataStore.getState().userData.canal : '', 
        sku: dataStore.getState().userData.sku !== '' ? dataStore.getState().userData.sku : '', 
        code: dataStore.getState().userData.code !== '' ? dataStore.getState().userData.code : '',
        confirmationChoice: dataStore.getState().userData.confirmationChoice !== '' ? dataStore.getState().userData.confirmationChoice : '', 
        email: dataStore.getState().userData.email !== '' ? dataStore.getState().userData.email : '', 
        estados: dataStore.getState().userData.estados !== '' ? dataStore.getState().userData.estados : ''
    };
}

export { validaRut, rutChecker, validaEmail, validaPhoneLength, getUrlParam, getPhoneValidationState, getConfirmationState, decodeFromBase64 };