import React from "react";
import "./CreateAndUpdateUser.scss";
import "../../scss/index.scss";
const axios = require("axios").default;

function dataUser() {
  return {
    idAlumno: "",
    name: "",
    lastName: "",
  };
}

export default function CreateAndUpdateUser(props) {
  const { act, setAct, form, setForm } = props;

  /* const [form, setForm] = useState(dataUser); */

  const updateForm = (e) => {
    e.preventDefault();
    axios
      .put("https://apirestmario.herokuapp.com/actualizar", form)
      .then((response) => {
        const data = response.data;
        if(data["saludo"] === "Actualizado"){
          alert("Se actualizó");
          rebootForm();
        }else{
          alert("No se pudo actualizar");
        }
      });
  };

  const sendForm = (e) => {
    e.preventDefault();
    /* console.log(form); */

    axios
      .post("https://apirestmario.herokuapp.com/agregar", form)
      .then((response) => {
        let data = response.data;
        if (
          data["saludo"] !==
          "Error, no se pudo registrar o realizar la operación"
        ) {
          alert("Se registró");
        } else {
          alert("No se registró");
        }
      });
  };

  const rebootForm = () => {
    setForm(dataUser());
    setAct(false);
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="contenedorU">
      <form className="container">
        <h1 className="text-center mt-2 mb-4 display-5">
          {act ? "Actualizar" : "Registro"}
        </h1>
        <div className="row">
          <div className="col-12">
            <input
              type="text"
              placeholder="ID"
              name="idAlumno"
              value={form.idAlumno}
              disabled={act}
              className="form-control w-100"
              onChange={onChange}
            />
          </div>
          <div className="col-12">
            <input
              type="text"
              placeholder="Nombre"
              name="name"
              value={form.name}
              className="form-control w-100 mt-2"
              autoComplete="off"
              onChange={onChange}
            />
          </div>
          <div className="col-12">
            <input
              type="text"
              autoComplete="off"
              name="lastName"
              value={form.lastName}
              placeholder="Apellido"
              className="form-control w-100 mt-2"
              onChange={onChange}
            />
          </div>
          <div className="col-12">
            {act ? (
              <>
                <button
                  onClick={updateForm}
                  className="button-create w-100 mt-3"
                >
                  Actualizar
                </button>
                <button
                  onClick={rebootForm}
                  className="button-create w-100 mb-3 mt-3"
                >
                  Volver
                </button>
              </>
            ) : (
              <button onClick={sendForm} className="button-create w-100 mt-3">
                Crear
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
