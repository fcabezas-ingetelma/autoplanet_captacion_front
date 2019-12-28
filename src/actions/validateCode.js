const validateCode = (payload) => {
    return {
        type: 'validate_code',
        payload
    }
}

export default validateCode;