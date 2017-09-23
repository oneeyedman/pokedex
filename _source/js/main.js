SN.ajax = function() {

	var numberOfPokemons = 26;
	var pokemonBaseURL = 'http://pokeapi.co/api/v2/pokemon';
	var pokemonList;

	var $body = $('body');
	var $pokemonList = $body.find('.js__pokemon-list-wrapper');

	var getThemAll = function(pokeURL, pokeArg) {

		var pokemonURL = pokeURL + pokeArg

		$.ajax({
			type: 'POST',
			url: pokemonURL,
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

		});
	};

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

	var getPokemonInfo = function( pokeIndex ) {
		console.log('> ' + pokeIndex);
		if (pokeIndex < numberOfPokemons ) {
			getPokemonInfo( pokeIndex + 1 );
		}
	};

	getThemAll(pokemonBaseURL, '?limit='+numberOfPokemons);


};

/**
 * Initialize SN object
 */
SN.init = function() {
 SN.ajax();
}


$(function() {
	SN.init();
});
