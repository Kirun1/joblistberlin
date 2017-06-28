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
			// create the binding to firebase that will update the local state
      // of the component every time the 'value' event is triggered.
      // that way it will rerender the extended component with the latest
      // value coming from firebase every time.
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
