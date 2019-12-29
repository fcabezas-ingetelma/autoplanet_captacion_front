import axios from 'axios';
import qs from 'querystring';
import dotenv from 'dotenv';

dotenv.config();

class HttpRequester {
    constructor() {
        this.url = 'http://ec2-35-167-42-164.us-west-2.compute.amazonaws.com:4000';
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