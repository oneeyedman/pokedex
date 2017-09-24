/**
 * PIKA.data
 * Gestiona la petición de pokemons
 *
 * @type {Object}
 */
PIKA.data = {
	init: function(){

		// > Variables
		var numberOfPokemons = 25;
		var pokemonBaseURL = 'data/pokemon.json';
		var pokemonList;

		var $pokemonList = PIKA.cache.$body.find('.js__pokemon-list-wrapper');





		// > Funciones
		/**
		 * Hace una primera petición a la api para un número determinado de pokemons
		 * @param  {string} pokeURL url a la que se hace la petición
		 */
		var getThemAll = function(pokeURL) {
			$.ajax({
				type: 'GET',
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

			var pokemonURL =  pokemonList.results[pokeIndex].file
			// pide el pokemon pokeIndex
			$.ajax({
				type: 'GET',
				url: pokemonURL,
				data: ''
			})
			.done(function(data) {
				var pokemonID;
				var pokemonTypes = new Array;
				var pokemonImg;
				var pokemonEvolutionOf;

				// Recojo los datos
				pokemonID = data.id;
				for (var i = 0; i < data.types.length; i++) {
					pokemonTypes.push(data.types[i].type.name);
				}
				pokemonImg = data.sprites.front_default;

				// y los pinto
				writePokemon(pokeIndex, pokemonID, pokemonImg, pokemonTypes);

				// evoluciona de...
				getEvolutionOf(pokemonID);

			})
			.fail(function() {
				// si falla, pones error: pendiente
			});



			// Pide el siguiente pokemon, si se puede, claro.
			if (pokeIndex < (numberOfPokemons - 1) ) {
				getPokemonInfo( pokeIndex + 1 );
			} else {
				showFilterBar();
			}
		};


		var writePokemon = function(index, id, img, types) {
			var typeList = '';

			$item = $pokemonList.find('.js__pokemon-item').eq(index);

			$item.find('.pokemon__pic').attr('style', 'background-image:url(' + img + ')');
			$item.find('.pokemon__info-id').text(id);
			$.each(types, function(index, el) {
				typeList += '<li class="type__item">' + types[index] + '</li>'
			});

			$item.find('.pokemon__info-types .types').html(typeList);
			$item.removeClass('pokemon__item--pending').fadeIn(1000);

		};


		var getEvolutionOf = function( id ) {
			var path = 'data/species-' + id + '.json';

			$.ajax({
				type: 'GET',
				url: path,
				data: ''
			})
			.done(function(data) {
				var species = data;

				if (species.evolves_from_species != null) {
					updatePokemonEvolutionInfo(species.id, species.evolves_from_species.name);
				}

			})
			.fail(function() {
				// pendiente
			});
		};


		var updatePokemonEvolutionInfo = function(id, name) {
			$item = $pokemonList.find('.js__pokemon-item').eq( (id-1) );
			$item.find('.pokemon__info-evolution').text('Evoluciona de: ' + name);
		};


		var showFilterBar =  function() {
			console.log('> Muestra el campo de filtro');
			$filter =  PIKA.cache.$body.find('.js__filter-bar');
			if ($filter.length) {
				$filter.removeClass('filter-bar--hidden');
			}

			$filterField = PIKA.cache.$body.find('.js__filter-field');
			$pokemonItems = PIKA.cache.$body.find('.js__pokemon-item');

			$filterField.on('keyup', function() {
				var filterString = $(this).val();

				$pokemonItems.each(function(index, el) {
					if ( $(this).find('.pokemon__info-name').text().indexOf( filterString ) == -1 ) {
						$(this).fadeOut(400);
					} else {
						$(this).fadeIn(200);
					}
				});

			});
		};




		// > Al turrón (si existe el contenedor de pokemons, empezamos)
		getThemAll(pokemonBaseURL);

	}
};
