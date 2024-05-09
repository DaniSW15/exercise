import "./App.css";
import employees from "./employees";
import React, { useState, useEffect } from "react";

function App() {
  const [employee, setEmployee] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [mostrarMXN, setMostrarMXN] = useState(true);

  const toggleMostrarMXN = () => {
    setMostrarMXN(!mostrarMXN);

    if (mostrarMXN) {
      setEmployee(
        employee.map((employee) => ({
          ...employee,
          salary: (employee.salary * 0.051).toFixed(2),
        }))
      );
    } else {
      setEmployee(
        employee.map((employee) => ({
          ...employee,
          salary: (employee.salary / 0.051).toFixed(2),
        }))
      );
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setFilteredEmployees(
      employee.filter(
        (employee) =>
          employee.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          employee.company
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          employee.phone
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          employee.email
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
      )
    );
  };

  const agregarEmpleado = () => {
    const name = prompt("Ingrese el nombre del empleado");
    if (name === null) {
      return;
    }
    const salary = prompt("Ingrese el salario del empleado");
    if (salary === null) {
      return;
    }
    const company = prompt("Ingrese la empresa del empleado");
    if (company === null) {
      return;
    }
    const phone = prompt("Ingrese el telefono del empleado");
    if (phone === null) {
      return;
    }
    const email = prompt("Ingrese el email del empleado");
    if (email === null) {
      return;
    }

    const newEmployee = {
      id: employee.length + 1,
      name: name,
      salary: salary,
      company: company,
      phone: phone,
      email: email,
    };

    setEmployee([...employee, newEmployee]);
    setFilteredEmployees([...employee, newEmployee]);
    setSearch("");
  };

  const eliminarEmpleado = (id) => {
    setEmployee(employee.filter((employee) => employee.id !== id));
  };

  const editarEmpleado = (id) => {
    const name = prompt("Ingrese el nombre del empleado");
    if (name === null) {
      return;
    }
    const salary = prompt("Ingrese el salario del empleado");
    if (salary === null) {
      return;
    }
    const company = prompt("Ingrese la empresa del empleado");
    if (company === null) {
      return;
    }
    const phone = prompt("Ingrese el telefono del empleado");
    if (phone === null) {
      return;
    }
    const email = prompt("Ingrese el email del empleado");
    if (email === null) {
      return;
    }

    const updatedEmployee = {
      id: id,
      name: name,
      salary: salary,
      company: company,
      phone: phone,
      email: email,
    };

    setEmployee(
      employee.map((employee) =>
        employee.id === id ? updatedEmployee : employee
      )
    );
  };

  const filterEmployees = search.length > 0 ? filteredEmployees : employee;

  useEffect(() => {
    setEmployee(employees);
    setFilteredEmployees(employees);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-4xl">
          Lista de empleados ({filterEmployees.length} empleados)
        </h1>
        <br />
        <input
          type="text"
          placeholder="Buscar empleado..."
          value={search}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:border-blue-500"
        />
        &nbsp;
        <button
          onClick={toggleMostrarMXN}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2"
        >
          Mostrar en {mostrarMXN ? "MXN" : "USD"}
        </button>
        <button
          onClick={agregarEmpleado}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Agregar empleado
        </button>
        <br />
        <div className="overflow-x-auto mt-5">
          <table className="table-auto border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Salario</th>
                <th className="px-4 py-2">Empresa</th>
                <th className="px-4 py-2">Telefono</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filterEmployees.map((employee, index) => (
                <tr key={employee.id} className="bg-white hover:bg-gray-100">
                  <td className="border p-2">{employee.id}</td>
                  <td className="border p-2">{employee.name}</td>
                  <td
                    className={`border p-2 text-right whitespace-nowrap ${
                      employee.salary < 10000 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {employee.salary} {mostrarMXN ? "MXN" : "USD"}
                  </td>
                  <td className="border p-2">{employee.company}</td>
                  <td className="border p-2">{employee.phone}</td>
                  <td className="border p-2">{employee.email}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => editarEmpleado(employee.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Editar
                    </button>
                    &nbsp;
                    <button
                      onClick={() => eliminarEmpleado(employee.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
