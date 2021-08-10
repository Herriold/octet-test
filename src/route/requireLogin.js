import { key_session_user } from "../utils/constants";
import { isValidToken } from "../utils/utils";


const requireLogin = (to, from, next) => {
    const currentUser = JSON.parse(localStorage.getItem(key_session_user));
    const isRequiredLogin = to.meta ?  (to.meta.auth ? to.meta.auth : false) : false;
    const isValid = isValidToken(currentUser?.token);
    if (isRequiredLogin && !isValid) {
        localStorage.removeItem(key_session_user);
        next.redirect('/login');
    }
    const isNotStatic = to?.meta?.isNotStatic;
    if (isValid && isNotStatic) {
        return next.redirect('/');
    }
    next();
};

export default requireLogin;
