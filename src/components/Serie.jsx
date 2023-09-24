import { updateSerieRequest } from "../api/series.api";

const Serie = ({
  convertirFechaParaInput,
  series,
  setSeries,
  serie,
  setSerie,
  eliminarSerie,
}) => {
  const handleModificarEstado = async (serieData) => {
    if (serieData) {
      const serieEstado = {
        titulo: serieData.titulo,
        estrellas: Number(serieData.estrellas),
        genero: serieData.genero,
        fechaEstreno: convertirFechaParaInput(serieData.fechaEstreno),
        descripcion: serieData.descripcion,
        precio: Number(serieData.precio),
        atp: serieData.atp,
        estado: serieData.estado === "AC" ? "AN" : "AC",
      };
      serieEstado.idSerie = serieData.idSerie;
      const confirmar = confirm(`El estado de la serie ha cambiado`);
      if (confirmar) {
        try {
          const respuesta = await updateSerieRequest(
            serieEstado,
            serieData.idSerie
          );

          const estadoSeriesActualizados = series.map((serieState) =>
            serieState.idSerie === serieData.idSerie ? serieEstado : serieState
          );
          setSeries(estadoSeriesActualizados);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const handleEliminar = () => {
    const confirmar = confirm("Deseas eliminar esta serie?");
    if (confirmar) {
      eliminarSerie(idSerie);
    }
  };

  const {
    titulo,
    estrellas,
    genero,
    fechaEstreno,
    descripcion,
    idSerie,
    precio,
    atp,
    estado,
  } = serie;

  return (
    <div className=" mx-2 my-5 px-3 py-6 rounded-xl bg-white shadow-md">
      <div className="md:flex md:flex-row  gap-2">
        <div className="w-2/3 md:flex gap-1 md:justify-between ">
          <div className="font-bold mb-3 text-[0.8rem] text-gray-700 uppercase">
            Titulo: {""}
            <p className="font-normal normal-case">{titulo}</p>
          </div>
          <div className="font-bold mb-3 text-[0.8rem] text-gray-700 uppercase">
            Genero: {""}
            <p className="font-normal normal-case">{genero}</p>
          </div>

          <div className="font-bold mb-3 text-[0.8rem] text-gray-700 uppercase">
            Fecha de Estreno: {""}
            <p className="font-normal normal-case">
              {fechaEstreno.toString().split("T")[0]}
            </p>
          </div>
        </div>
        <div className="w-1/3 md:flex md:justify-between ">
          <div className="font-bold text-[0.8rem] mb-3 text-gray-700 uppercase">
            Precio: {""}
            <p className="font-normal normal-case">${precio}</p>
          </div>
          <div className="font-bold text-[0.8rem] mb-3 text-gray-700 uppercase">
            ATP: {""}
            <p className="font-normal normal-case">
              {atp === true ? "✅" : "❌"}
            </p>
          </div>
          <div className="font-bold text-[0.8rem] mb-3 text-gray-700 uppercase">
            Estado: {""}
            <p
              className={`font-bold normal-case ${
                estado === "AC" ? "text-emerald-700" : "text-red-700"
              }`}
            >
              {estado}
            </p>
          </div>
        </div>
      </div>
      <div className="text-left">
        <p className="font-bold text-[0.8rem] mb-3 text-gray-700 uppercase">
          Calificacion ⭐: {""}
          <span className="font-normal normal-case">{estrellas}</span>
        </p>
        <p className="font-bold mb-3 text-[0.8rem] text-gray-700 uppercase">
          Descripcion: {""}
          <span className="font-normal normal-case overflow-scroll">
            {descripcion}
          </span>
        </p>
      </div>
      <div className="md:flex md:justify-between mt-2 ">
        <button
          onClick={() => {
            setSerie(serie);
          }}
          disabled={serie.estado === "AN"}
          className="transition-colors shadow-md py-2 px-10 bg-indigo-600 hover:bg-indigo-700 font-bold text-white text-xs rounded-md m-1 text-center"
          type="button"
        >
          {serie.estado === "AC" ? "Modificar" : "Serie AN"}
        </button>

        <button
          onClick={() => handleModificarEstado(serie)}
          className="transition-colors shadow-md py-2 px-10 bg-yellow-500 hover:bg-yellow-700 hover:text-slate-50 text-xs font-bold text-slate-900 rounded-md m-1  text-center"
          type="button"
        >
          {serie.estado === "AC" ? "Anular" : "Activar"}
        </button>

        <button
          onClick={handleEliminar}
          className="transition-colors shadow-md py-2 px-10 bg-red-600 hover:bg-red-700 font-bold text-white rounded-md m-1 text-xs text-center"
          type="button"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Serie;
