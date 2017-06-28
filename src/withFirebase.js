import React from 'react';
import firebase from 'firebase';

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
      firebase.database(this.state.firebaseApp).ref( refName ).on( 'value', snapshot => {
        const data = snapshot.val();
        this.setState( { data } );
      })
		}
		
		render() {
			return <ExtendedComponent { ...this.props } data={ this.state.data } />
		}
	}
}

export default withFirebase;
