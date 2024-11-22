// En el componente principal
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { UserProvider } from './context/UserContext';
import UserList from "./UserList";
import UserDetails from "./UserDetails";
import UserForm from "./UserForm";
import UserEdit from "./UserEdit";
import UserDelete from './UserDelete';
// import UserDelete from './UserDelete';

const App = () => {

  const addUser = async (newUser) => {
    try {
      const response = await fetch(
        "https://671be1cf2c842d92c3819c03.mockapi.io/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUsers([...users, data]); // Agregar el nuevo usuario al estado
      } else {
        console.error("Error al agregar usuario");
      }
    } catch (error) {
      console.error("Error en la solicitud: ", error);
    }
  };

  return (
    <UserProvider>
<Router>
<nav>
    <Link to={"/"}>Lista de Usuarios </Link>
    <Link to={"/create"}>Crear usuario</Link>
  </nav>
<Routes>
<Route path="/" element={<UserList />} />
<Route path="/users/:id" element={<UserDetails />} />
<Route path="/create" element={<UserForm />} />
<Route path="/edit/:id" element={<UserEdit />} />
<Route path="/delete/:id" element={<UserDelete />} />
</Routes>
</Router>
</UserProvider>
  );
};

export default App;
