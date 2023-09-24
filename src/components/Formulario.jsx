import { useState, useEffect } from "react";
import Error from "./Error";
import { createSerieRequest, updateSerieRequest } from "../api/series.api";
import ErrorForm from "./ErrorForm";

const Formulario = ({
  convertirFechaParaInput,
  series,
  setSeries,
  serie,
  setSerie,
}) => {
  const [titulo, setTitulo] = useState("");
  const [estrellas, setEstrellas] = useState("");
  const [genero, setGenero] = useState("");
  const [fechaEstreno, setFechaEstreno] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [atp, setAtp] = useState(false);
  const [estado, setEstado] = useState("AC");
  const [error, setError] = useState(false);
  const [errores, setErrores] = useState({
    titulo: "",
    estrellas: "",
    descripcion: "",
    precio: "",
    genero: "",
    fechaEstreno: "",
  });

  useEffect(() => {
    if (Object.keys(serie).length > 0) {
      setTitulo(serie.titulo);
      setEstrellas(serie.estrellas);
      setGenero(serie.genero);
      setFechaEstreno(convertirFechaParaInput(serie.fechaEstreno));
      setDescripcion(serie.descripcion);
      setPrecio(serie.precio);
      setAtp(serie.atp);
      setEstado(serie.estado);
    }
  }, [serie]);

  const generarId = () => {
    const date = `${Date.now()}`;
    return date.substring(date.length - 8);
  };

  const validarCampo = (e) => {
    const { name, value } = e.target;
    const alertas = { ...errores };
    const campoNoVacioRegex = /^(.+)$/;

    switch (name) {
      case "titulo":
        const tituloRegex = /^.{1,35}$/;
        alertas.titulo =
          tituloRegex.test(value.trim()) && campoNoVacioRegex.test(value)
            ? ""
            : "El titulo es obligatorio.";

        break;
      case "estrellas":
        const estrellasRegex = /^[1-5]$/;
        alertas.estrellas =
          estrellasRegex.test(Number(value.trim())) &&
          campoNoVacioRegex.test(value)
            ? ""
            : "La calificación es requerida y debe ser un número entre 1 y 5. ";
        break;
      case "descripcion":
        const descripcionRegex = /^.{0,150}$/;
        alertas.descripcion =
          descripcionRegex.test(value.trim()) && campoNoVacioRegex.test(value)
            ? ""
            : "La descripción es requerida y no debe exceder los 150 caracteres.";
        break;
      case "fechaEstreno":
        alertas.fechaEstreno = campoNoVacioRegex.test(value)
          ? ""
          : "La fecha de estreno es requerida.";
        break;
      case "genero":
        alertas.genero = campoNoVacioRegex.test(value)
          ? ""
          : "El género es requerido.";
        break;
      case "precio":
        const precioRegex = /^\d+(\.\d{1,2})?$/;
        alertas.precio =
          precioRegex.test(Number(value.trim())) &&
          campoNoVacioRegex.test(value)
            ? ""
            : "El precio es requerido";
        break;
      default:
        break;
    }
    setErrores(alertas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const alertas = { ...errores };
    // validacion
    if (
      [
        titulo || estrellas || genero || descripcion || fechaEstreno || precio,
      ].includes("")
    ) {
      titulo.trim().includes("")
        ? (alertas.titulo = "Campo vacio")
        : (alertas.titulo = "");
      estrellas.includes("")
        ? (alertas.estrellas = "Campo vacio")
        : (alertas.estrellas = "");
      genero.includes("")
        ? (alertas.genero = "Campo vacio")
        : (alertas.genero = "");
      descripcion.includes("")
        ? (alertas.descripcion = "Campo vacio")
        : (alertas.descripcion = "");
      fechaEstreno.includes("")
        ? (alertas.fechaEstreno = "Campo vacio")
        : (alertas.fechaEstreno = "");
      precio.includes("")
        ? (alertas.precio = "Campo vacio")
        : (alertas.precio = "");
      setError(true);

      setErrores({ ...alertas });
      return;
    }
    if (Object.values(errores).some((alerta) => alerta !== "")) {
      setError(true);
      return;
    }

    //NUEVO REGISTRO
    setError(false);
    const objetoSerie = {
      titulo: titulo,
      estrellas: Number(estrellas),
      genero: genero,
      fechaEstreno: fechaEstreno,
      descripcion: descripcion,
      precio: Number(precio),
      atp: atp,
      estado: estado,
      idSerie: Number(generarId()),
    };

    //Editando el registro
    if (serie.idSerie) {
      const editadoSerie = {
        titulo: titulo,
        estrellas: Number(estrellas),
        genero: genero,
        fechaEstreno: fechaEstreno,
        descripcion: descripcion,
        precio: Number(precio),
        atp: atp,
        estado: estado,
      };

      editadoSerie.idSerie = serie.idSerie;

      const confirmar = confirm(`La serie ha sido modificada exitosamente`);
      if (confirmar) {
        try {
          const respuesta = await updateSerieRequest(
            editadoSerie,
            serie.idSerie
          );

          const seriesActualizados = series.map((serieState) =>
            serieState.idSerie === serie.idSerie ? editadoSerie : serieState
          );
          setSeries(seriesActualizados);
          setSerie({});
        } catch (error) {
          console.error(error.message);
        }
        setTitulo("");
        setEstrellas("");
        setGenero("");
        setFechaEstreno("");
        setDescripcion("");
        setPrecio("");
        setAtp(false);
        setEstado("AC");
      }
    } else {
      const confirmar = confirm(`La serie ha sido agregada exitosamente`);
      if (confirmar) {
        setSeries([...series, objetoSerie]);
        try {
          const respuesta = await createSerieRequest(objetoSerie);
        } catch (error) {
          console.error(error.message);
        }
        setTitulo("");
        setEstrellas("");
        setGenero("");
        setFechaEstreno("");
        setDescripcion("");
        setPrecio("");
        setAtp(false);
        setEstado("AC");
      }
    }
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 h-1/2">
      <h2 className="font-black text-slate-800 text-3xl text-center">Series</h2>

      <p className="text-xl text-slate-800  mt-5 mb-10 text-center">
        Añade series y {""}
        <span className="text-indigo-600 font-bold">Administralas</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md mb-10 rounded-lg py-10 px-5 mx-5"
        action=""
      >
        {error ? (
          <Error mensaje={"Se registran errores, revisa los datos"} />
        ) : null}

        <div className="mb-5 relative">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="titulo"
          >
            Titulo
          </label>
          <input
            id="titulo"
            type="text"
            name="titulo"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Titulo de la serie"
            value={titulo}
            onKeyUp={(e) => validarCampo(e)}
            onChange={(e) => setTitulo(e.target.value)}
          />
          {errores.titulo !== "" ? (
            <ErrorForm mensaje={errores.titulo} />
          ) : null}
        </div>
        <div className="mb-5 relative">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="estrellas"
          >
            Estrellas / calificacion
          </label>
          <input
            id="estrellas"
            name="estrellas"
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="numero de ⭐"
            value={estrellas}
            onKeyUp={(e) => validarCampo(e)}
            onChange={(e) => setEstrellas(e.target.value)}
          />
          {errores.estrellas !== "" ? (
            <ErrorForm mensaje={errores.estrellas} />
          ) : null}
        </div>
        <div className="mb-5 relative">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="genero"
          >
            Genero
          </label>
          <select
            id="genero"
            name="genero"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={genero}
            onChange={(e) => {
              setGenero(e.target.value), validarCampo(e);
            }}
          >
            <option value="">Selecciona un genero</option>
            <option value="Accion">Accion</option>
            <option value="Animada">Animada</option>
            <option value="Comedia">Comedia</option>
            <option value="Drama">Drama</option>
            <option value="Suspenso">Suspenso</option>
            <option value="Terror">Terror</option>
          </select>
          {errores.genero !== "" ? (
            <ErrorForm mensaje={errores.genero} />
          ) : null}
        </div>
        <div className="mb-5 relative">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="fechaEstreno"
          >
            Fecha de estreno
          </label>
          <input
            id="fechaEstreno"
            type="date"
            name="fechaEstreno"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fechaEstreno}
            onKeyUp={(e) => validarCampo(e)}
            onChange={(e) => setFechaEstreno(e.target.value)}
          />
          {errores.fechaEstreno !== "" ? (
            <ErrorForm mensaje={errores.fechaEstreno} />
          ) : null}
        </div>
        <div className="mb-5 relative">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="descripcion"
          >
            Descripcion
          </label>
          <textarea
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="descripcion"
            placeholder="Descripcion de la serie"
            name="descripcion"
            value={descripcion}
            onKeyUp={(e) => validarCampo(e)}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          {errores.descripcion !== "" ? (
            <ErrorForm mensaje={errores.descripcion} />
          ) : null}
        </div>
        <div className="mb-5 relative">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="precio"
          >
            Precio de Alquiler
          </label>
          <input
            id="precio"
            type="text"
            name="precio"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Precio de alquiler de la serie"
            value={precio}
            onKeyUp={(e) => validarCampo(e)}
            onChange={(e) => setPrecio(e.target.value)}
          />
          {errores.precio !== "" ? (
            <ErrorForm mensaje={errores.precio} />
          ) : null}
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="atp"
          >
            Apta para todo publico (ATP)
          </label>
          <input
            id="atp"
            type="checkbox"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={atp}
            checked={atp}
            onChange={(e) => {
              setAtp(e.target.checked);
            }}
          />
        </div>
        {serie.idSerie && (
          <div className="mb-5">
            <label
              className="block text-gray-700 uppercase font-bold"
              htmlFor="estado"
            >
              Estado
            </label>
            <select
              id="estado"
              type="text"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value={"AC"}>AC</option>
              <option value={"AN"}>AN</option>
            </select>
          </div>
        )}
        <input
          type="submit"
          className=" bg-emerald-600 w-full p-3 rounded-md text-white hover:bg-emerald-700 cursor-pointer transition-colors uppercase font-bold"
          value={serie.idSerie ? "Modificar serie" : "Agregar nueva serie"}
        />
      </form>
    </div>
  );
};

export default Formulario;
