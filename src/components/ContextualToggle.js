import React, { Component } from 'react';

export default class ContextualToggle extends Component {

	handleChange(event) {
		console.log(event)
		const select = event.target;
		// -1 because we don't count the default option
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

				<select className="ContextualToggle-select"
								onChange={ this.handleChange.bind(this) }>
					<optgroup label={ this.props.label }>
						<option style={{display: 'none'}}>Cancel</option>
						{ this.props.children }
					</optgroup>
				</select>

				<span className="Button Button--contextualToggle Button--rotate">
					<span>•••</span>
				</span>

			</div>
		)
	}
}
