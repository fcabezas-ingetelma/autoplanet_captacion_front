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

export { validaRut, validaPhoneLength, getUrlParam };