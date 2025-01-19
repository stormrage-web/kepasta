import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import './Auth.module.scss';

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
      try {
         await store.register(user);
         if (store.error === "") {
            navigate("/login");
         } else {
            console.error("Registration failed:", store.error);
         }
      } catch (error) {
         console.error("An error occurred during registration:", error);
      }
   }

   return (
      <div className="registerPage">
         <div className="card">
            <div className="card-body">
               <h3 className="text-center">Register</h3>
               <form onSubmit={register}>
                  <div className="form-outline mb-4">
                     <label htmlFor="InputLogin" className="form-label">E-mail</label>
                     <input 
                        type="text" 
                        className="form-control" 
                        id="InputLogin"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Input email"
                     />
                  </div>
                  <div className="form-outline mb-4">
                     <label htmlFor="InputPassword" className="form-label">Password</label>
                     <input 
                        type="password" 
                        className="form-control" 
                        id="InputPassword"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Input password"
                     />
                  </div>
                  <div className="form-outline mb-4">
                     <label htmlFor="InputName" className="form-label">Name</label>
                     <input 
                        type="text" 
                        className="form-control" 
                        id="InputName"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        placeholder="Input name"
                     />
                  </div>
                  {store.getError() !== "" && <h5 className="error-message text-danger">{store.getError()}</h5>}
                  <button type="submit" className="btn btn-dark w-100">Create account</button>
                  <div className="mt-3 text-center">
                     <p>
                         Have an account? 
                         <button 
                            type="button" 
                            onClick={() => navigate("/login")}
                            style={{ backgroundColor:'none', border:'none', color:'black', cursor:'pointer', textDecoration:'underline' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                         >
                             Log in
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
