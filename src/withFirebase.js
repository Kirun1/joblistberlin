import React from 'react';
import firebase from 'firebase';
import { map } from 'lodash';

const withFirebase = (refName) => {
	return ExtendedComponent => class extends React.Component {
		constructor() {
			super();
			this.state = {};
		}

		componentDidMount() {
      firebase.database().ref(refName).orderByChild('createdAt').on('value', snapshot => {
        let data = map(snapshot.val(), this.serialize).reverse();
        this.setState( { data } );
      })
		}

		serialize(data, id) {
			data.id = id
			return data;
		}

		render() {
			return <ExtendedComponent { ...this.props } data={ this.state.data } />
		}
	}
}

export default withFirebase;
