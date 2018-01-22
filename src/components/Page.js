import React from 'react';
import Card from './Card';

class Page extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pokemon: {}
		};

		const data = fetch('http://pokeapi.salestock.net/api/v2/pokemon/1', {})
		.then(response => response.json())
		.then(json => {
			console.log(json);
			this.setState({
				pokemon: json
			});
		});
	}

  render() {
    return (
      <div className="page">
        <header className="page__header" id="header">
          <div className="wrapper">
            <form className="filter-bar sfilter-bar--hidden js__filter-bar"><input className="filter-bar__field js__filter-field" placeholder="Filtra pokemons por nombre..." title="Filtra Pokemons por nombre" /></form>
          </div>
        </header>
        <main className="page__main" id="main">
          <section className="pokemon">
            <div className="wrapper">
              <div className="pokemon__list-wrapper js__pokemon-list-wrapper">
                <ul className="pokemon__list">
                  <Card criatura={this.state.pokemon} />
                </ul>
              </div>
              </div>
            </section>
          </main>
          <footer className="page__footer" id="footer"></footer>
        </div>
    );
  }
}

export default Page;
