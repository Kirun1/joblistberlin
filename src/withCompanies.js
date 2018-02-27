import withFirebase from './withFirebase';
import serializeCompany from './utils/serializers/company';

export default withFirebase('links', serializeCompany);
