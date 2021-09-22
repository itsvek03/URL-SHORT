export const checkIfLoggedIn = (varName = "user") => {
    //varName should be name of the local storage's key
    var loginInfo = localStorage.getItem(varName);
    if (!loginInfo || !JSON.parse(loginInfo)) {
        return false;
    } else {
        return { ...JSON.parse(loginInfo) }
    }
};