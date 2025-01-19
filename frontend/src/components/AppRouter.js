import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { privateRoutes, publicRoutes } from "../routes";
import ErrorPage from "../pages/ErrorPage";


const AppRouter = () => {
  const { store } = useContext(Context);

  console.log(store);

  // return <Routes>
  //   <Route path="/" key="/" element={<StartPage />} />
  //   <Route path="/workouts" key="/workouts" element={<WorkoutsPage />} />
  //   <Route path="/patients" key="/patients" element={<PatientsPage />} />
  //   <Route path="/register" key="/register" element={<RegisterPage />} />
  //   <Route path="/login" key="/login" element={<LoginPage />} />
  //   <Route path="*" element={<ErrorPage/>} />
  // </Routes>

  // return store.getAuth() ? (
  //   <Routes>
  //     {/* {privateRoutes.map((route) => (
  //       <Route path={route.path} key={route.path} element={route.component} />
  //     ))} */}
  //     <Route path="*" element={<ErrorPage />} />
  //   </Routes>
  // ) : (
  //   <Routes>
  //     {/* {publicRoutes.map((route) => (
  //       <Route path={route.path} key={route.path} element={route.component} />
  //     ))} */}
  //     <Route path="/login" key= element={<LoginPage />} />
  //     <Route path="*" element={<ErrorPage />} />
  //   </Routes>
  // );

  return store.getAuth() ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route path={route.path} key={route.path} element={<route.component />} />
      ))}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="*" element={<Navigate to="/login" replace />} />
      {publicRoutes.map((route) => (
        <Route path={route.path} key={route.path} element={<route.component />} />
      ))}
    </Routes>
  );
};

export default observer(AppRouter);
