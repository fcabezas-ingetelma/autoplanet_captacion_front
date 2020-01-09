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

    async sendPostRequest(path, requestBody) {
        try {
            return await axios.post(this.url + path, qs.stringify(requestBody), this.config);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async sendGetRequest(path, requestBody) {
        try {
            return await axios.get(this.url + path, qs.stringify(requestBody), this.config);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async sendPutRequest(path, requestBody) {
        try {
            return await axios.put(this.url + path, qs.stringify(requestBody), this.config);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async sendPatchRequest(path, requestBody) {
        try {
            return await axios.patch(this.url + path, qs.stringify(requestBody), this.config);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

export default HttpRequester;