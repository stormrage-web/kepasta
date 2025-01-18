import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import './Auth.module.scss'; // Импортируем стили

const RegisterPage = observer(() => {
   const navigate = useNavigate();
   const { store } = useContext(Context);
   const [user, setUser] = useState({
      email: "",
      password: "",
      name: ""
   });

   async function register(e) {
      e.preventDefault();
      await store.register(user);
      if (store.error === "") {
         navigate("/login");
      }
   }

   return (
      <div className="loginPage d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#f8f9fa' }}>
         <div className="card" style={{ width: '400px' }}>
            <div className="card-body">
               <h3 className="text-center">Регистрация</h3>
               <form onSubmit={register}>
                  <div className="mb-4">
                     <label htmlFor="InputLogin" className="form-label">E-mail</label>
                     <input 
                        type="text" 
                        className="form-control" 
                        id="InputLogin"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Введите email"
                     />
                  </div>
                  <div className="mb-4">
                     <label htmlFor="InputPassword" className="form-label">Пароль</label>
                     <input 
                        type="password" 
                        className="form-control" 
                        id="InputPassword"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Введите пароль"
                     />
                  </div>
                  <div className="mb-4">
                     <label htmlFor="InputName" className="form-label">Имя</label>
                     <input 
                        type="text" 
                        className="form-control" 
                        id="InputName"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        placeholder="Введите имя"
                     />
                  </div>
                  {store.getError() !== "" && <h5 className="error-message text-danger">{store.getError()}</h5>}
                  <button type="submit" className="btn btn-dark w-100">Создать аккаунт</button>
                  <div className="mt-3 text-center">
                     <p>
                         Есть учетная запись? 
                         <button 
                            type="button" 
                            onClick={() => navigate("/login")}
                            style={{ background: 'none', border: 'none', color: 'black', cursor: 'pointer', textDecoration: 'underline' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                         >
                             Вход
                         </button>
                     </p>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
});

export default RegisterPage;
