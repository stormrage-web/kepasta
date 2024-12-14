import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const publicRoutes = [
    {path: '/login', component: LoginPage, exact: true},
    {path: '/register', component: RegisterPage, exact: true},
]