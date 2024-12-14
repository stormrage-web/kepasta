import { guestApi } from "../http/index.js";

export default class AuthService {
  static async login(email, password) {
    return guestApi.post("/auth/login", { email, password });
  }

  static async register(user) {
    return guestApi.post("/auth/register-doctor", {
      email: user.email,
      password: user.password,
      name: user.name
    });
  }

  static async refresh() {
    return guestApi.post("/auth/refresh-web");
  }

  static async logout() {
    return guestApi.post("/auth/logout-web");
  }
}
