import { useEffect, useState } from "react"
import { fetchPersons } from "../../api/dataservice" // You need to implement this
import 'devextreme/data/odata/store';
import DataGrid, { Column } from 'devextreme-react/data-grid';

export default function Person() {
  // Se declara un estado llamado 'personsData' utilizando useState.
  const [personsData, setPersonsData] = useState([]);

  // Utiliza useEffect para realizar la solicitud a la API cuando el componente se monta.
  useEffect(() => {
    fetchPersons() // You need to create this function in your dataservice
      .then((response) => {
        // Extrae los datos de respuesta de la solicitud.
        const persons = response.data;

        // Registra los datos de personas en la consola.
        console.log(persons);

        // Modifica el estado 'personsData' con los datos recibidos.
        setPersonsData(persons);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return (
    <DataGrid
      // Establece la fuente de datos para el DataGrid como 'personsData'.
      dataSource={personsData}
      
      // Muestra bordes alrededor de las celdas de la tabla.
      showBorders={true}
    >
      {/* Define las columnas según los datos de las personas que quieres mostrar. */}
      <Column dataField="id" width={50} />
      <Column dataField="name" caption="Nombre" />
      <Column dataField="lastName" caption="Apellido" />
      <Column dataField="career" caption="Carrera" />
    </DataGrid>
  );
}
