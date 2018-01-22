import React from 'react';

class Card extends React.Component {
	render() {
		return (
		<li className={`pokemon__item pokemon__item--1 js__pokemon-item pokemon__item--pending`}>
			<div className="pokemon__pic"></div>

			<ul className="pokemon__info">
				<li className="pokemon__info-id">{this.props.criatura.id}</li>
				<li className="pokemon__info-name">
					<h2>{this.props.criatura.name}</h2>
				</li>
				<li className="pokemon__info-types">
					<ul className="types"></ul>
				</li>
				<li className="pokemon__info-evolution"></li>
			</ul>
		</li>
		);
	}
}

export default Card
