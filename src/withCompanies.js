import withFirebase from './withFirebase';

function serializeCompanies(data, id) {
	const companyModel = {
		id: '',
		body: '',
		url: '',
		title: '',
		createdAt: 0,
		isApproved: false
	};

	data.id = id;
	return Object.assign(companyModel, data);
};

export default withFirebase('links', serializeCompanies);
