import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import logo from "../../img/sun_logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);

  async function logout(e) {
    e.preventDefault();
    await store.logout();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light green-navbar fixed-top">
      {/* <button onClick={logout}>
      Выйти
  </button> */}
      <div className="navbar-collapse ">
        <ul className="nav nav-pills me-auto order-0 ">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <div className="container">
                <img src={logo}/>
                <h1>StrokeRehab</h1>
              </div>
            </Link>
            
          </li>
        </ul>
      </div>
      <div className="navbar nav-right">
        <ul className="nav nav-pills ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/patients">Пациенты</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/workouts">Тренировки</Link>
          </li>
          <li className="nav-item">
          {store.getAuth() ? (
            <button onClick={logout} className="btn light-btn">Выйти</button>
          ) : (
            <button onClick={() => navigate("/login")} className="btn light-btn">Войти</button>
          )}
          </li>
        </ul>
      </div>
    
    </nav>
  );
};

export default observer(Navbar);
