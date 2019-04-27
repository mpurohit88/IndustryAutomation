import React from 'react';
import Joi from 'joi'

const validation = (WrappedComponent) => {
    class ValidationHOC extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                error: ''
            }

            this.handleBlur = this.handleBlur.bind(this);
        }

        handleBlur(e) {
            const { validationType, min, max, isRequired, value, isMultipleEmail } = this.props;
            let result = { error: null };

            if (e.target.type === 'email') {
                const schema = Joi.object().keys({
                    // input: Joi.string().min(min || 0).max(max || 2000).email().required(),
                    input: Joi.array().items(Joi.string().allow('').email().max(256))
                });

                let value1 = '';

                if (value.indexOf(',') > 0) {
                    value1 = value.split(',');
                } else {
                    value1 = value.split(';');
                }

                result = Joi.validate({ input: value1 }, schema);
            } else if (validationType === "string" && isRequired) {
                const schema = Joi.object().keys({
                    input: Joi.string().min(min || 0).max(max || 2000).required(),
                });

                result = Joi.validate({ input: value }, schema);
            } else if (isRequired) {
                const schema = Joi.object().keys({
                    input: Joi.string().required(),
                });

                result = Joi.validate({ input: value }, schema);
            } else if (isMultipleEmail) {
                const schema = Joi.object().keys({
                    input: Joi.string().regex(/^[a-zA-Z0-9!@#$%&*]{3,25}$/)
                });

                result = Joi.validate({ input: value }, schema);
            }

            if (result.error) {
                this.setState({ error: result.error.details[0].message });
                this.props.handleError && this.props.handleError({ id: e.target.id, isError: true });
            } else {
                this.setState({ error: '' });
                this.props.handleError && this.props.handleError({ id: e.target.id, isError: false });
            }

            this.props.onBlur && this.props.onBlur();
        }

        render() {
            return <WrappedComponent {...this.props} onBlur={this.handleBlur} error={this.state.error} />;
        }
    }

    return ValidationHOC;
};

export default validation;
