export default (state, action) => {
    switch (action.type) {
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