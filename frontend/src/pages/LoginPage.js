import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import './Auth.module.scss';

const LoginPage = observer(() => {
   const navigate = useNavigate();
   const { store } = useContext(Context);
   const [credentials, setCredentials] = useState({ email: "", password: "" });

   async function login(e) {
      e.preventDefault();
      try {
         await store.login(credentials.email, credentials.password);
         if (store.error === "") {
            navigate("/", { state: { userStatus: "authenticated", userName: credentials.email } });
         } else {
            console.error("Login failed:", store.error);
          }
      } catch (error) {
          console.error("An error occurred during login:", error);
      }
   }

   return (
      <div className="loginPage">
         <div className="card">
            <div className="card-body">
               <h3 className="text-center">Log in</h3>
               <form onSubmit={login}>
                  <div className="form-outline mb-4">
                     <label htmlFor="InputLogin" className="form-label">E-mail</label>
                     <input 
                        type="text" 
                        className="form-control" 
                        id="InputLogin"
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        placeholder="Input email"
                     />
                  </div>
                  <div className="form-outline mb-4">
                     <label htmlFor="InputPassword" className="form-label">Password</label>
                     <input 
                        type="password" 
                        className="form-control" 
                        id="InputPassword"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        placeholder="Input password"
                     />
                  </div>
                  {store.getError() !== "" && <h5 className="error-message text-danger">{store.getError()}</h5>}
                  <button type="submit" className="btn btn-dark w-100">Log in</button>
                  <div className="mt-3 text-center">
                     <p>
                        No account? 
                        <button 
                           type="button" 
                           onClick={() => navigate("/register")}
                           style={{ backgroundColor:'none', border:'none', color:'black', cursor:'pointer', textDecoration:'underline' }}
                           onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
                           onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                        >
                           Register
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
