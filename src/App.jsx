import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoSeries from "./components/ListadoSeries";
import { useState, useEffect } from "react";
import { deleteSerieRequest, getSeriesRequest } from "./api/series.api";
import LoginAdm from "./components/LoginAdm";
import Banner from "./components/Banner";

function App() {
  const [series, setSeries] = useState([]);
  const [serie, setSerie] = useState({});
  const [logged, setLogged] = useState(false);
  const [datos, setDatos] = useState([]);
  const [errorLogin, setErrorLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = localStorage.getItem("user");

      if (user) {
        setLogged(true);
      }
    }
  }, [datos]);

  useEffect(() => {
    async function loadSeries() {
      const respuesta = await getSeriesRequest();

      setSeries(respuesta);
    }
    loadSeries();
  }, []);
  const convertirFechaParaInput = (fecha) => {
    const fechaDate = new Date(fecha);

    const yyyy = fechaDate.getFullYear();
    const mm = String(fechaDate.getMonth() + 1).padStart(2, "0");
    const dd = String(fechaDate.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const eliminarSerie = async (idSerie) => {
    try {
      await deleteSerieRequest(idSerie);
      const seriesActualizadas = series.filter(
        (serie) => serie.idSerie !== idSerie
      );
      setSeries(seriesActualizadas);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-100 ">
      <LoginAdm
        logged={logged}
        setLogged={setLogged}
        datos={datos}
        setDatos={setDatos}
        errorLogin={errorLogin}
        setErrorLogin={setErrorLogin}
      />
      {logged ? (
        <div className="container mx-auto mt-10">
          <Header />

          <main className="mt-12 md:flex ">
            <Formulario
              serie={serie}
              series={series}
              setSeries={setSeries}
              setSerie={setSerie}
              convertirFechaParaInput={convertirFechaParaInput}
            />
            <ListadoSeries
              convertirFechaParaInput={convertirFechaParaInput}
              series={series}
              setSeries={setSeries}
              setSerie={setSerie}
              eliminarSerie={eliminarSerie}
            />
          </main>
        </div>
      ) : (
        <Banner />
      )}
    </div>
  );
}

export default App;
