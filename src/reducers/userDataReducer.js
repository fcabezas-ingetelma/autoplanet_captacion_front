export default (state, action) => {
    switch (action.type) {
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
      case "confirm_options":
        return {
          userData: action.payload
        };
      case "validate_code":
        return {
          userData: action.payload
        };
      default:
        return state;
    }
  };