import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import './Auth.module.scss'; // Импортируем стили

const LoginPage = observer(() => {
   const navigate = useNavigate();
   const { store } = useContext(Context);
   const [credentials, setCredentials] = useState({ email: "", password: "" });

   async function login(e) {
      e.preventDefault();
      await store.login(credentials.email, credentials.password);
      if (store.error === "") {
         navigate("/");
      }
   }

   return (
      <div className="loginPage d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#f8f9fa' }}>
         <div className="card" style={{ width: '400px' }}>
            <div className="card-body">
               <h3 className="text-center">Вход в систему</h3>
               <form onSubmit={login}>
                  <div className="mb-4">
                     <label htmlFor="InputLogin" className="form-label">E-mail</label>
                     <input 
                        type="text" 
                        className="form-control" 
                        id="InputLogin"
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        placeholder="Введите email"
                     />
                  </div>
                  <div className="mb-4">
                     <label htmlFor="InputPassword" className="form-label">Пароль</label>
                     <input 
                        type="password" 
                        className="form-control" 
                        id="InputPassword"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        placeholder="Введите пароль"
                     />
                  </div>
                  {store.getError() !== "" && <h5 className="error-message text-danger">{store.getError()}</h5>}
                  <button type="submit" className="btn btn-dark w-100">Войти</button>
                  <div className="mt-3 text-center">
                     <p>
                        Нет учетной записи? 
                        <button 
                           type="button" 
                           onClick={() => navigate("/register")}
                           style={{ background: 'none', border: 'none', color: 'black', cursor: 'pointer', textDecoration: 'underline' }}
                           onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
                           onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                        >
                           Регистрация
                        </button>
                     </p>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
});

export default LoginPage;
