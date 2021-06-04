/* import logo from './logo.svg'; */
import "./App.scss";
import "./scss/index.scss";
import { useState, useEffect } from "react";
import CreateAndUpdateUser from "./components/createAndUpdateUser";
import SeeList from "./components/seeList";
const axios = require("axios").default;

function dataUser() {
  return {
    idAlumno: "",
    name: "",
    lastName: "",
  };
}

function App() {
  const [form, setForm] = useState(dataUser);
  const [data, setData] = useState([]);
  const [act, setAct] = useState(false);

  const api = () => {
    axios.get("https://apirestmario.herokuapp.com/").then((response) => {
      /* console.log(response.data); */
      setData(response.data);
    });
  };

  useEffect(() => {
    api();
  });

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6 margin-content">
            <div className="contenedor">
              <CreateAndUpdateUser
                setForm={setForm}
                form={form}
                act={act}
                setAct={setAct}
              />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="contenedor listSee">
              <SeeList
                setForm={setForm}
                form={form}
                data={data}
                setAct={setAct}
              />
            </div>
          </div>
          {/* <h2 className="mr-4">asdasdasdasdasdasdasdasdasdasdasd </h2> */}
        </div>
      </div>
    </div>
  );
}

export default App;
