export default (state, action) => {
    switch (action.type) {
      case "validate_user":
        return {
          userData: action.payload
        };
      case "get_enrolls":
        return {
          userData: action.payload
        };
      case "update_cellphone":
        return {
          userData: action.payload
        };
      case "validate_token":
        return {
          userData: action.payload
        };
      case "get_short_url":
        return {
          userData: action.payload
        };
      case "get_sinacofi_data":
        return {
          userData: action.payload
        };
      case "set_tracker":
        return {
          userData: action.payload
        };
      case "update_attendance_info":
        return {
          userData: action.payload
        };
      case "update_sms_data":
        return {
          userData: action.payload
        };
      case "create_solicitud":
        return {
          userData: action.payload
        };
      case "set_estados":
        return {
          userData: action.payload
        };
      case "get_estados":
        return {
          userData: action.payload
        };
      case "add_user_basic_data":
        return {
          userData: action.payload
        };
      case "validate_code":
        return {
          userData: action.payload
        };
      case "delete_session":
        return {
          userData: action.payload
        };
      default:
        return state;
    }
  };