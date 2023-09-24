function Banner() {
  return (
    <div className=" container mx-auto pb-3">
      <h1 className="text-slate-800 text-4xl text-center md:w-2/3 mx-auto">
        Bienvenido a mi App de Administración de Series para PragmaSoft
      </h1>
      <p className="text-xl text-slate-800  mt-5 mb-10 text-center">
        ¡Hola! Mi nombre es Francisco Torres y soy un estudiante de la
        Tecnicatura en Desarrollo y Calidad de Software de la UNSTA. Me complace
        presentarte esta aplicación que he desarrollado como parte de mi proceso
        de selección en PragmaSoft.
      </p>

      <p className="text-xl text-slate-800  mt-5 mb-10 text-center">
        Decidí aprovechar la oportunidad para usar mis conocimientos mas
        recientes sobre desarrollo web y bases de datos (tengo conocimientos en
        python y tkinter pero hace mucho que no lo uso), lo que me llevó a
        utilizar las siguientes tecnologías:
      </p>

      <p className="text-lg text-slate-800  text-left ml-2">
        - JavaScript: Para la lógica del lado del cliente.
      </p>
      <p className="text-lg text-slate-800  text-left ml-2">
        - ReactJS con Vite: Para la creación de la interfaz de usuario.
      </p>
      <p className="text-lg text-slate-800  text-left ml-2">
        - Tailwind CSS: Para el diseño y la apariencia de la aplicación.
      </p>
      <p className="text-lg text-slate-800  text-left ml-2">
        - Express: Para la creación de un servidor web.
      </p>
      <p className="text-lg text-slate-800  text-left ml-2">
        - MySQL: Como base de datos para almacenar la información de las series.
      </p>
      <p className="text-lg text-slate-800  text-left ml-2">
        - Node.js: Para el entorno de ejecución del servidor.
      </p>
      <p className="text-lg text-slate-800  text-left ml-2">
        - Axios: Para realizar solicitudes HTTP desde la aplicación.
      </p>

      <h2 className="text-slate-800 my-5 text-3xl text-center md:w-2/3 mx-auto">
        Para que puedas comenzar a usar la aplicación, utiliza las siguientes
        credenciales:
      </h2>

      <p className="text-lg text-slate-800 text-center">Usuario: pragmasoft</p>
      <p className="text-lg text-slate-800 text-center">
        Contraseña: desafio2023
      </p>
      <h2 className="text-slate-800  my-5 text-3xl text-center md:w-2/3 mx-auto">
        Espero que esta aplicación les agrade y cumpla con los requisitos
        establecidos.
      </h2>

      <h2 className="text-slate-800 my-5 text-lg text-center md:w-2/3 mx-auto">
        ¡Gracias por considerarme como candidato para unirme al equipo de
        PragmaSoft!
      </h2>
      <p className="text-lg text-slate-800 text-right ">
        Atentamente, Francisco Torres
      </p>
    </div>
  );
}

export default Banner;
