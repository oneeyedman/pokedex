/**
 * PIKA.ajax
 * Gestiona la petición de pokemons
 *
 * @type {Object}
 */
PIKA.ajax = {
	init: function(){

		// > Variables
		var numberOfPokemons = 26;
		var pokemonBaseURL = 'http://pokeapi.co/api/v2/pokemon';
		var pokemonList;

		var $body = $('body');
		var $pokemonList = $body.find('.js__pokemon-list-wrapper');





		// > Funciones
		/**
		 * Hace una primera petición a la api para un número determinado de pokemons
		 * @param  {string} pokeURL url a la que se hace la petición
		 */
		var getThemAll = function(pokeURL) {

			$.ajax({
				type: 'POST',
				url: pokeURL,
				data: ''
			})
			.done(function(data){
				pokemonList = data;

				// Muestra los resultados
				console.log('>> ' +  pokemonList.results.length);

				// Pinta los huecos
				addPokemonPlaceholders( pokemonList.results.length );

				// Pide pokemons
				getPokemonInfo( 1 );

			})
			.fail(function() {
				// pendiente
			});
		};


		/**
		 * Crea los "placeholders" donde luego iremos cargando la información de cada pokemon
		 * @param  {integer} items Número de placeholders a crear
		 */
		var addPokemonPlaceholders = function( items ) {
			var pList = '<ul class="pokemon__list">';
			var id;

			for (var i = 0; i < items; i++) {
				id = (i+1);
				pList += '<li class="pokemon__item pokemon__item--' + id + ' js__pokemon-item--' + id + ' pokemon__item--pending">';

				pList += '<div class="pokemon__pic"></div>';

				pList += '<ul class="pokemon__info">';
				pList += '<li class="pokemon__info-id"></li>';
				pList += '<li class="pokemon__info-name">' + pokemonList.results[i].name + '</li>';
				pList += '<li class="pokemon__info-type"></li>';
				pList += '<li class="pokemon__info-evolution"></li>';
				pList += '</ul>';
				pList += '<li>';
			}

			pList += '</ul>'
			$pokemonList.html(pList);
		};

		/**
		 * Función recursiva que pide, una a una, la información de cada pokemon,
		 * Cuando la recibe, la pinta en su placeholder correspondiente y pide la siguiente.
		 * @param  {integer} pokeIndex Contador para las peticiones
		 */
		var getPokemonInfo = function( pokeIndex ) {
			console.log('> ' + pokeIndex);
			if (pokeIndex < numberOfPokemons ) {
				getPokemonInfo( pokeIndex + 1 );
			}
		};






		// > Si existe el contenedor de pokemons, empezamos.
		getThemAll(pokemonBaseURL + '?limit='+numberOfPokemons);

	}
};
