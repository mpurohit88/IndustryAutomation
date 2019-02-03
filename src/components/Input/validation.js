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
        console.log("****************8", this.props);
        const { validationType, min, max, isRequired, value } = this.props;
        let result = {error: null}; 
        
        if(e.target.type === 'email') {
            const schema = Joi.object().keys({
                input: Joi.string().min(min || 0).max(max || 2000).email().required(),
            });

            result = Joi.validate({input: value}, schema);
        } else if(validationType === "string" && isRequired) {
            const schema = Joi.object().keys({
                input: Joi.string().min(min || 0).max(max || 2000).required(),
            });

            result = Joi.validate({input: value}, schema);
        } else if(isRequired) {
            const schema = Joi.object().keys({
                input: Joi.string().required(),
            });

            result = Joi.validate({input: value}, schema);
        }

        if(result.error) {
            this.setState({error:result.error.details[0].message});
            this.props.handleError({id: e.target.id, isError: true});
        } else {
            this.setState({error:''});
            this.props.handleError({id: e.target.id, isError: false});
        }
        
        this.props.onBlur && this.props.onBlur();
    }

    render() {
      return <WrappedComponent {...this.props} onBlur={this.handleBlur} error={this.state.error}/>;
    }
  }
    
  return ValidationHOC;
};

export default validation;
