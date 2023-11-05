# hck4-guía

## Paso 1: Crear un proyecto demo de Spring Boot

1. De este repositorio copia los archivos de `main`.

## Paso 2: Asegurarse de las Configuraciones de la Base de Datos

1. En el proyecto, busca el archivo de configuración de la base de datos. En el ejemplo anterior, esto se hizo en el archivo `application.properties` o `application.yml`.

2. Asegúrate de que las configuraciones de la base de datos sean correctas, incluyendo la URL, el nombre de usuario y la contraseña. Deben coincidir con la configuración de tu base de datos.

3. Si es necesario, realiza las modificaciones en el archivo de configuración y guárdalas.


## Paso 2: Empezando con DevExtreme!

1. Nos vamos al directorio padre de nuestro proyecto.
```
cd '/ejemplo/de/ruta/hck4-gu-a' 
```

2. Iniciamos un nuevo proyecto dev-extreme
```
npx devextreme-cli new react-app app-name
```

Seleccionamos:
* Specify desired template type: › JavaScript
* Specify desired application layout: Side navigation (outer toolbar)


## Paso 3: Probamos el proyecto! 

1. Luego de haber creado este ambiente, entramos a app-name e iniciamos el programa!
```
cd app-name
npm start
```

## Paso 4:

1. Vamos a crear los siguientes 2 archivos y persons.js dentro de la carpeta src:

![La configuración se tiene que ver de esta manera](https://cdn.discordapp.com/attachments/834907040886554694/1169004877138120734/image.png?ex=6553d3a1&is=65415ea1&hm=94c2b89e99ade43bc7c13e0ee21223aafe7cfae30dc4b727fff4f0fd3434fcc1&)

2. Realizamos los siguientes cambios en `index.js`:

```js
export { default as HomePage } from './home/home';
export { default as ProfilePage } from './profile/profile';
export { default as TasksPage } from './tasks/tasks';
export { default as GroupsPage } from './groups/groups';
export { default as PersonsPage } from './persons/persons';
```

3. Realizamos los siguientes cambios en `app-navigation.js`:

```js
export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text: 'Examples',
    icon: 'folder',
    items: [
      {
        text: 'Profile',
        path: '/profile'
      },
      {
        text: 'Tasks',
        path: '/tasks'
      },
      {
        text: 'Groups',
        path: '/groups'
      },
      {
        text: 'Persons',
        path: '/persons'
      }
    ]
  }
  ];
```

4. Escribimos el siguiente código en `dataService.js`:

```js
import axios from 'axios';

// Definición de la URL base para las solicitudes al servidor.
const BASE_URL = 'http://localhost:8080';

// Función asincrónica para recuperar grupos desde el servidor.
export const fetchGroups = async () => {
    // Utiliza Axios para hacer una solicitud GET a la URL de grupos.
    return axios.get(`${BASE_URL}/groups`)
}
// Función asincrónica para recuperar personas desde el servidor.
export const fetchPersons = async () => {
    // Utiliza Axios para hacer una solicitud GET a la URL de personas.
    return axios.get(`${BASE_URL}/persons`)

}
```

Nota*: Asegurence de instalar axios 
```
npm install axios
```
 
5. Escribimos el siguiente código en `groups.js`:

```js 
import { useEffect, useState } from "react"
import { fetchGroups } from "../../api/dataService"
import 'devextreme/data/odata/store';
import DataGrid, { Column } from 'devextreme-react/data-grid';

export default function Group() {
  // Se declara un estado llamado 'groupsWithPersonCount' utilizando useState.
  const [groupsWithPersonCount, setGroupsWithPersonCount] = useState();

  // Utiliza useEffect para realizar la solicitud a la API cuando el componente se monta.
  useEffect(() => {
    fetchGroups()
      .then((response) => {
        // Extrae los datos de respuesta de la solicitud.
        const groupsData = response.data;

        // Registra los datos de grupos en la consola.
        console.log(groupsData);

        // Modifica el estado 'groupsWithPersonCount' transformando los datos de grupos.
        setGroupsWithPersonCount(groupsData.map(group => ({
          id: group.id,
          name: group.name,
          personCount: group.persons ? group.persons.length : 0    
        })))
      })
      .catch((error) => {
        console.log(error);
      })
  }, []); // El [] como segundo argumento asegura que useEffect se ejecute solo una vez al montar el componente.

  return (
      <DataGrid
        // Establece la fuente de datos para el DataGrid como 'groupsWithPersonCount'.
        dataSource={groupsWithPersonCount}
        
        // Muestra bordes alrededor de las celdas de la tabla.
        showBorders={true}
      >
        {/* Define la primera columna con el campo 'id' y un ancho de 50 píxeles. */}
        <Column dataField="id" width={50} />
        
        {/* Define la segunda columna con el campo 'name'. */}
        <Column dataField="name" />
        
        {/* Define la tercera columna con el campo 'personCount' y un título personalizado 'Number of Persons'. */}
        <Column dataField="personCount" caption="Number of Persons" />
      </DataGrid>

  )
}

5. Escribimos el siguiente código en `persons.js`:
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

5. Otra manera de hacerlo es descargar la carpeta src de este repositorio y reemplazarla en el proyecto devextreme app-name creado. 
 
```


