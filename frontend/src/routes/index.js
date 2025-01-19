import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import RegisterPage from "../pages/RegisterPage";

export const privateRoutes = [
    {path: '/login', component: LoginPage, exact: true},
    {path: '/register', component: RegisterPage, exact: true},
    {path: '/', component: MainPage, exact: true},
]

export const publicRoutes = [
    {path: '/login', component: LoginPage, exact: true},
    {path: '/register', component: RegisterPage, exact: true},
]