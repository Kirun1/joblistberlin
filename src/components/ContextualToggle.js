import React, { Component } from 'react';

export default class ContextualToggle extends Component {
	constructor() {
		super();
		this.state = {
			selectValue: ''
		}
	}

	handleChange(event) {
		const select = event.target;

		// get the <Option> index in the <select>
		// -1 because we don't count the default option
		const selectedIndex = select.selectedIndex - 1;
		// get the props of the selected <Option>
		const childProps = this.props.children[selectedIndex].props;
		// run the function stored in the `action` prop
		childProps.action();

		this.resetSelect(select);
	}

	resetSelect(el) {
		el.selectedIndex = 0;
	}

	render() {
		return (
			<div className="ContextualToggle">

				<select ref="Select" className="ContextualToggle-select"
								value={ this.state.selectValue }
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
