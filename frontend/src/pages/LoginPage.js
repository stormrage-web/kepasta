import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Link } from "react-router-dom";
import Input from "../components/UI/Input/Input";

const LoginPage = observer(() => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  async function login(e) {
    e.preventDefault();
    console.log(credentials);
    await store.login(credentials.email, credentials.password);
    if (store.error === "") {
      navigate("/");
    }
  }

  return (
    <div className="loginPage">
      <div className="justify-content-center">
        <div className="card">
          <div className="row g-0">
              <div className="card-body p-4 p-lg-5">
                <form>
                  <h3 className="text-center">Вход в систему</h3>
                  <div className="form-outline mb-4">
                    <label htmlFor="InputLogin">E-mail</label>
                    <Input className="form-control"
                      id="InputLogin"
                      value={credentials.email}
                      onChange={(e) =>
                        setCredentials({ ...credentials, email: e.target.value })
                      }
                      type="text"
                      placeholder="Введите email"
                    />
                    </div>
                    <div className="form-outline mb-4">
                      <label htmlFor="InputPassword">Пароль</label>
                      <Input className="form-control"
                        id="InputPassword"
                        type="password"
                        value={credentials.password}
                        onChange={(e) =>
                          setCredentials({ ...credentials, password: e.target.value })
                        }
                        placeholder="Введите пароль"
                      />
                    </div>
                </form>
                {store.getError() !== "" && <h3>{store.getError()}</h3>}
                <button className="btn green-btn" onClick={login}>Войти</button>
                <div className="link-register">
                  <p>Нет учетной записи? 
                  <Link className="green-link" to="/register"> Регистрация</Link></p>
                </div>
              </div>
          </div>
        </div>  
      </div>
    </div>
  );
});

export default LoginPage;
