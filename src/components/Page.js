import React from 'react';


class Page extends React.Component {
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
                  <li className={`pokemon__item pokemon__item--1 js__pokemon-item pokemon__item--pending`}>
                    <div className="pokemon__pic"></div>

                    <ul className="pokemon__info">
                      <li className="pokemon__info-id">1</li>
                      <li className="pokemon__info-name">
                        <h2>Pikachu</h2>
                      </li>
                      <li className="pokemon__info-types">
                        <ul className="types"></ul>
                      </li>
                      <li className="pokemon__info-evolution"></li>
                    </ul>
                  </li>
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
