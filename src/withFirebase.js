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
        let data = map(snapshot.val()).reverse();
        this.setState( { data } );
      })
		}

		render() {
			return <ExtendedComponent { ...this.props } data={ this.state.data } />
		}
	}
}

export default withFirebase;
