import React from "react";
import Serie from "./Serie";
import { getSeriesRequest } from "../api/series.api";

const ListadoSeries = ({
  series,
  setSeries,
  convertirFechaParaInput,
  setSerie,
  eliminarSerie,
}) => {
  const handleActualizarSeriesBdd = async () => {
    const respuesta = await getSeriesRequest();

    setSeries(respuesta);
  };

  return (
    <div className="md:w-1/2 lg:w-3/5 ml-1 h-screen">
      {series?.length == 0 ? (
        <>
          <h2 className="font-black text-slate-800 text-3xl text-center">
            No hay Series
          </h2>
          <div className="absolute right-4">
            <button
              onClick={handleActualizarSeriesBdd}
              className="transition-colors shadow-md py-2 px-6 bg-teal-500 hover:bg-teal-600 hover:text-slate-50 font-bold text-slate-100 rounded-md m-1  text-center"
            >
              Consultar🔎
            </button>
          </div>
          <p className="text-xl text-slate-800 mt-5 mb-20 text-center">
            Comienza agregando series {""}
            <span className="text-indigo-600 font-bold">
              y aparecerán en este lugar
            </span>
          </p>
        </>
      ) : (
        <section className="relative ">
          <h2 className="font-black text-slate-800 text-3xl text-center">
            Listado Series
          </h2>
          <div className="absolute top-20 md:right-4">
            <button
              onClick={handleActualizarSeriesBdd}
              className="transition-colors shadow-md py-2 px-6 bg-teal-500 hover:bg-teal-600 hover:text-slate-50 font-bold text-slate-100 rounded-md m-1  text-center"
            >
              Consultar🔎
            </button>
          </div>

          <p className="text-xl text-slate-800 mt-5 mb-10 text-center">
            Administra tus {""}
            <span className="text-indigo-600 font-bold">series</span>
          </p>

          {series.length > 0 ? (
            <ul className="w-full p-1 h-screen overflow-y-scroll ">
              {series?.map((serie) => (
                <Serie
                  key={serie.idSerie}
                  convertirFechaParaInput={convertirFechaParaInput}
                  setSeries={setSeries}
                  series={series}
                  serie={serie}
                  setSerie={setSerie}
                  eliminarSerie={eliminarSerie}
                />
              ))}
            </ul>
          ) : null}
        </section>
      )}
    </div>
  );
};

export default ListadoSeries;
