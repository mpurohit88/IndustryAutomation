import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { appConfig }          from 'configs/config-main'
import AppBar from 'components/AppBar'
import { getAdmin, getUserName, getCompanyName }                from '../../../configs/user'
import { itemsFetchQuoteDetails } from '../../../core/api/quote'
import { getISODateTime } from '../../helper'
import Button from '../../../components/Button'

/* component styles */
import { styles } from './styles.scss'

// Home Of Quote Component
class Home extends Component {
	componentDidMount() {
		const { quoteId } = this.props.match.params;

		this.props.fetchQuoteDetails(quoteId);

		this.handleStart = this.handleStart(this);
	}

	handleStart() {

	}

  render() {
		const isAdmin = getAdmin(), userName = getUserName(), cname = getCompanyName();
		const { details } = this.props;

		if(!details[0]) {
			return (<div>data is loading...</div>)
		}
		const data = details[0];

    return (
			<Fragment>
				<AppBar isAdmin={isAdmin} name={userName} cname={cname}>{appConfig.name}</AppBar>
				<div className={styles}>
					<div className='flex-center'>
						<div>
							Quote #{data.id} | Customer Name: {data.companyName} | created By: {data.userName} | Created Date: {getISODateTime(data.dateTimeCreated)} 
						</div>
						<div>
							<Button variant="primary" type="button"
							onClick={(e) => this.props.handleStart(e)}
							>
								Start Quote
						</Button>
						</div>
					</div>
				</div>
			</Fragment>
		)
  }
}

const mapStateToProps = (state) => {
	return {
			details: state.quote.details
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchQuoteDetails: (quoteId) => dispatch(itemsFetchQuoteDetails(quoteId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

