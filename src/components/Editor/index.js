import React from 'react';

import mainFields from './mainFields';
import { Field, reduxForm } from 'redux-form';

const Main = props => {
    return <Field {...props} component={mainFields} />
};

export default reduxForm({
    form: 'editForm'
})(Main)