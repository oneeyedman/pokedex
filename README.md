# Pokedex

El resultado del ejercicio se puede ver en [https://oneeyedman.github.io/pokedex/public/](https://oneeyedman.github.io/pokedex/public/).

En cualquier caso se puede clonar/descargar el repositorio, instalar las dependencias con `$ npm install` y ejecutar con `$ gulp go`.

## Ejercicio

El ejercicio consiste en desarrollar una aplicación web front-end usando <del>React</del> JS que sea un
listado de Pokemon.
Para obtener la información de los pokemon, usaremos su API abierta en [https://pokeapi.co/](https://pokeapi.co/). Para no cargar demasiado el API podemos trabajar con 20-50 pokemon en nuestra app, no hace falta que sean todos.
En la página principal tendremos un listado paginado de pokemon. De cada pokemon mostraremos al menos esta información:

- Número
- Nombre
- Tipo (puede ser múltilple)
- Imagen
- Información de evolución: si es un pokemon base o una evolución de otro

En la parte superior del listado tendremos un campo de búsqueda para filtrar los pokemon por su nombre. Según escribimos se van filtrando los pokemon que aparecen en pantalla.
El diseño de la web es libre a vuestra elección, pero podéis tomar inspiración de [https://www.pokedex.org/](https://www.pokedex.org/).
