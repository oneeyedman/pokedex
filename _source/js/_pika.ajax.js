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

				// Todo OK
				pokemonList = data;

				// Pinta los huecos
				addPokemonPlaceholders( pokemonList.results.length );

				// Pide pokemons
				getPokemonInfo( 0 );

			})
			.fail(function() {
				// Todo mal: pendiente
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
				id = i;
				pList += '<li class="pokemon__item pokemon__item--' + id + ' js__pokemon-item pokemon__item--pending">';

				pList += '<div class="pokemon__pic"></div>';

				pList += '<ul class="pokemon__info">';
				pList += '<li class="pokemon__info-id"></li>';
				pList += '<li class="pokemon__info-name">' + pokemonList.results[i].name + '</li>';
				pList += '<li class="pokemon__info-types"><ul class="types"></ul></li>';
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

			var pokemonURL =  pokemonList.results[pokeIndex].url
			console.log('>> ' + pokemonURL);
			// pide el pokemon pokeIndex
			$.ajax({
				type: 'GET',
				url: pokemonURL,
				data: ''
			})
			.done(function(data) {
				var pokemonTypes = new Array;
				var pokemonImg;
				var pokemonEvolutionOf;

				// Si todo está bien recojo los datos
				for (var i = 0; i < data.types.length; i++) {
					console.log('>> tipos: ' + data.types[i].type.name);
					pokemonTypes.push(data.types[i].type.name);
				}
				console.log('>> tipos: ' + data.sprites.front_default);
				pokemonImg = data.sprites.front_default;
				// evoluciona de

				// y los pinto
				writePokemon(pokeIndex, pokemonImg, pokemonTypes);

			})
			.fail(function() {
				// si falla, pones error: pendiente
			});



			// Pide el siguiente pokemon, si se puede, claro.
			if (pokeIndex < (numberOfPokemons - 1) ) {
				getPokemonInfo( pokeIndex + 1 );
			}
		};


		var writePokemon = function(index, img, types) {
			var typeList = '';

			$item = $pokemonList.find('.js__pokemon-item').eq(index);

			$item.find('.pokemon__pic').attr('style', 'background-image:url(' + img + ')');

			$.each(types, function(index, el) {
				typeList += '<li class="type__item">' + types[index] + '</li>'
			});

			$item.find('.pokemon__info-types .types').html(typeList);
			$item.removeClass('pokemon__item--pending');
			$item.addClass('pokemon__item--visible').animate('opacity',1, 500);


		};






		// > Al turrón (si existe el contenedor de pokemons, empezamos)
		getThemAll(pokemonBaseURL + '?limit='+numberOfPokemons);

	}
};
