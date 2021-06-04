import React from "react";
import "./SeeList.scss";
import "../../scss/index.scss";

const axios = require("axios").default;

function dataUser() {
  return {
    idAlumno: "",
    name: "",
    lastName: "",
  };
}

export default function SeeList(props) {
  const { data, setAct, setForm } = props;

  /* console.log(data); */

  const getUser = (user) => {
    console.log(user);
    setAct(true);
    setForm(user);
  };

  const deleteUser = (idUser) => {
    console.log(idUser);
    axios
      .delete("https://apirestmario.herokuapp.com/delete", {
        data: {
          idAlumno: idUser,
        },
      })
      .then((response) => {
        const data = response.data;
        if(data["saludo"] === "Se borró correctamente"){
          alert("Se ha eliminado");
          rebootForm();
        }else{
          alert("No se ha eliminado");
        }
      });
  };

  const rebootForm = () => {
    setForm(dataUser());
    setAct(false);
  };

  return (
    <div className="contenedortab">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">DNI</th>
            <th scope="col">Nonbre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Editar</th>
            <th scope="col">Borrar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((datas) => (
            <tr key={datas.idAlumno}>
              <th scope="row">{datas.idAlumno}</th>
              <td>{datas.name}</td>
              <td> {datas.lastName}</td>
              <td>
                <button
                  onClick={() => {
                    getUser(datas);
                  }}
                  className="b-t W-100"
                >
                  Editar
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    deleteUser(datas.idAlumno);
                  }}
                  className="b-t W-100"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {/* <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}
