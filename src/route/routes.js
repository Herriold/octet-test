import { Pagination } from "../components/Pagination";
import Login from "../pages/Login";


export const routes = [
    {
        path: '/login',
        exact: true,
        component: Login,
        meta: {
            isNotStatic: true
        }
    },
    {
        path: '/',
        exact: true,
        component: Pagination,
        meta: {
            auth: true
        }
    }
];
