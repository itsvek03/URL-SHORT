import { postRequest } from "../utils/axiosHelper.utils";
import { checkIfLoggedIn } from '../utils/login.util'

export const Header = () => {
    const { token } = checkIfLoggedIn();
    if (token) {
        return { Authorization: `Bearer ${token}` }
    }
    else {
        return {}
    }
}


export const urlApi = (data) => {
    return postRequest("url", data, { headers: Header() });
}