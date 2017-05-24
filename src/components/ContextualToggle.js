import React, { Component } from 'react';

export default class ContextualToggle extends Component {

	handleChange(event) {
		const select = event.target;
		const selectedIndex = event.target.selectedIndex - 1;
		const childProps = this.props.children[selectedIndex].props;
		childProps.action();
		this.resetSelect(select);
	}
	resetSelect(el) {
		el.selectedIndex = 0;
	}
	render() {
		return (
			<div className="ContextualToggle">
				<span className="Button--contextualToggle Button Button--rotate">
					<span>•••</span>
				</span>
				<select className="Contextual-nav"
								onChange={ this.handleChange.bind(this)}>
					<option disabled defaultValue style={{display: 'none'}}>Default</option>
					{ this.props.children }
				</select>
			</div>
		)
	}
}
