import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Link } from "react-router-dom";
import Input from "../components/UI/Input/Input";

const RegisterPage = observer(() => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: ""
  });

  console.log("render");

  async function register(e) {
    e.preventDefault();
    console.log(user);
    await store.register(user);
    if (store.error === "") {
      navigate("/login");
    }
  }

  return (
    <div className="loginPage">
      <div className="justify-content-center">
        <div className="card">
          <div className="row g-0">
              <div className="card-body p-4 p-lg-5">
                <form>
                  <h3 className="text-center">Регистрация</h3>
                  <div className="form-outline mb-4">
                    <label htmlFor="InputLogin">E-mail</label>
                    <Input className="form-control"
                      id="InputLogin"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      type="text"
                      placeholder="Введите email"
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label htmlFor="InputPassword">Пароль</label>
                    <Input className="form-control"
                      id="InputPassword"
                      type="password"
                      value={user.password}
                      onChange={(e) => setUser({ ...user, password: e.target.value })}
                      placeholder="Введите пароль"
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label htmlFor="InputName">Имя</label>
                    <Input className="form-control"
                      id="InputName"
                      type="text"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      placeholder="Введите имя"
                    />
                  </div>
                </form>
                {store.getError() !== "" && <h3>{store.getError()}</h3>}
                <button className="btn green-btn" onClick={register}>Создать аккаунт</button>
                <div className="link-register">
                  <p>Есть учетная запись? 
                  <Link className="green-link" to="/login"> Вход</Link></p>
                </div>
              </div>
          </div>
        </div>  
      </div>
    </div>
  );
});

export default RegisterPage;
