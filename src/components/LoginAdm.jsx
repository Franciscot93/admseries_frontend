import { useState } from "react";
import { getUsersRequest } from "../api/series.api";
import ErrorForm from "./ErrorForm";

const LoginAdm = ({
  logged,
  setLogged,
  datos,
  setDatos,
  errorLogin,
  setErrorLogin,
}) => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if ([usuario, password].includes("")) {
      setErrorLogin(true);
      return;
    }
    try {
      const listaDeUsuarios = await getUsersRequest();
      setDatos(listaDeUsuarios);
    } catch (error) {
      return console.error(error);
    }

    const user = datos.find(
      (user) => user.username === usuario && user.password === password
    );
    if (user) {
      setErrorLogin(false);

      setLogged(true);

      window.localStorage.setItem("user", user.username);
    } else {
      setErrorLogin(true);
    }
  };

  const logout = () => {
    const confirmar = confirm("Desea cerrar sesion?");
    if (confirmar) {
      localStorage.removeItem("user");
      setLogged(false);
    }
    setUsuario("");
    setPassword("");
  };

  return (
    <form
      onSubmit={(e) => handleLogin(e)}
      className="flex gap-1 content-around py-2 justify-center w-full bg-slate-900"
    >
      <div className=" place-content-center items-center md:w-1/5 flex">
        <label
          className=" text-slate-50 align-middle text-center uppercase font-normal"
          htmlFor="username"
        >
          Usuario:
        </label>
        <input
          id="username"
          type="text"
          name="username"
          className="border-2 p-1 ml-2 w-full  placeholder-gray-400 rounded-md"
          placeholder="usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
      </div>
      <div className=" place-content-center items-center md:w-1/5 flex">
        <label
          className=" text-slate-50 align-middle text-center uppercase font-semibold"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="border-2 p-1 ml-2 w-full  placeholder-gray-400 rounded-md"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className=" place-content-center items-center md:w-1/5 flex">
        {!logged ? (
          <input
            type="submit"
            className=" border-emerald-500 shadow-md hover:shadow-emerald-800 border-2 bg-slate-900 md:w-auto px-3 py-1 text-sm rounded-md my-auto text-emerald-500 hover:bg-emerald-500 hover:text-slate-50 cursor-pointer transition-colors uppercase font-semibold"
            value={"Ingresar"}
          />
        ) : (
          <button
            type="button"
            onClick={logout}
            className=" border-orange-500 border-2 bg-slate-900  shadow-md hover:shadow-orange-800 md:w-auto px-3 py-1 text-sm rounded-md my-auto text-orange-500 hover:bg-orange-500  hover:text-slate-900 cursor-pointer transition-colors uppercase font-bold"
          >
            {"cerrar sesion"}
          </button>
        )}
      </div>

      {errorLogin && <ErrorForm mensaje={"Datos de login incorrectos"} />}
    </form>
  );
};

export default LoginAdm;
