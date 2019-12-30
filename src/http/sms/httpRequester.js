import axios from 'axios';
import qs from 'querystring';
import dotenv from 'dotenv';

dotenv.config();

class HttpRequester {
    constructor() {
        this.url = process.env.REACT_APP_AP_BACKEND_URL;
        this.config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
    }

    async sendSMS(requestBody) {
        try {
            return await axios.post(this.url + '/v1/sms/send_sms', qs.stringify(requestBody), this.config);
        } catch (error) {
            console.log(error);
        }
    }
}

export default HttpRequester;