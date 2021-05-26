import axios from 'axios';
import { toast } from 'react-toastify';
import * as apiUrls from '../helper/apiUrls';

export const SignInAction =(data) => {
    console.log(data);
    return dispatch => {
        // dispatch(ShowLoader(true));
        let request = {
            method: 'POST',
            url: `${apiUrls.apiBaseUrl}${apiUrls.userSignIn}`,
            headers: { 'Content-Type': 'application/json' },
            data: data
        };
        return axios(request).then((data) => {
            console.log(data);
            toast.success(data.data.message, { autoClose: 4000 });
            return data;
        }).catch((error) => {
            console.log(error.response.data.message);
            toast.error(error.response.data.message, { autoClose: 4000 });
        });
    }
}