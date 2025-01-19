import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";

export default class Store {
  user = {};
  isAuth = false;
  isLoading = true;
  error = "";

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(isAuth) {
    this.isAuth = isAuth;
  }

  setUser(user) {
    this.user = user;
  }

  setError(error) {
    this.error = error;
  }

  getAuth() {
    return this.isAuth;
  }

  getUser() {
    return this.user;
  }

  getError() {
    return this.error;
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response.data);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data);
      this.setError("");
    } catch (e) {
      console.log(e.response?.data);
      this.setError(e.response?.data?.error);
    }
  }

  async register(user) {
    try {
      const response = await AuthService.register(user);
      console.log(response.data);
      this.setAuth(true);
      this.setUser(response.data);
      this.setError("");
    } catch (e) {
      console.log(e.response?.data);
      console.log(e.response?.data);
      this.setError(e.response?.data?.error);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      console.log(response.data);
    } catch (e) {
      console.log(e.response?.data);
    } finally {
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    }
  }

  async refresh() {
    try {
      const response = await AuthService.refresh();
      localStorage.setItem("token", response.data.accessToken);
      console.log(response.data);
    } catch (e) {
      console.log(e.response?.data);
    }
  }
}
