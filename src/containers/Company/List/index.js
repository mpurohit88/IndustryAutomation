import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap'

import { itemsFetchData } from '../../../core/api/company'
import { Registration as CompanyEdit } from '../index';

import { getISODateTime } from '../../helper'

/* component styles */
import { styles } from './styles.scss'

// List Of Company Component
class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			companyRegShow: false,
			company: {}
		};
	}

	componentDidMount() {
		this.props.fetchCompanyList();
	}

	handleCompanyRegClick = (flag, company) => this.setState({ companyRegShow: flag, company: company });

	render() {
		const { companyList, hasError, isLoading } = this.props;

		if (isLoading) {
			return <div>...Loading</div>
		}

		return (
			<Fragment>
				<hr />
				<Table responsive striped bordered hover className={styles}>
					<thead>
						<tr>
							{/* <td>Id</td> */}
							<td>Name</td>
							<td>Address</td>
							<td>City</td>
							<td>State</td>
							<td>Country</td>
							<td>Tele No</td>
							<td>Fax</td>
							<td>Mobile No</td>
							<td>Email</td>
							<td>Website</td>
							<td>GSTN</td>
							<td>ManufacturerOf</td>
							<td>Created Time</td>
						</tr>
					</thead>
					<tbody>
						{
							companyList && companyList.map((company, index) => {
								return <tr key={index}>
									{/* <td>{company.id}</td> */}
									<td className='imgEdit'>
										<img height='17' src='/img/userEdit.png' />
										<a style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => this.handleCompanyRegClick(true, company)}>{company.name}</a>
									</td>
									<td>{company.address}</td>
									<td>{company.city}</td>
									<td>{company.state}</td>
									<td>{company.country}</td>
									<td>{company.tele}</td>
									<td>{company.fax}</td>
									<td>{company.mobileNo}</td>
									<td>{company.email}</td>
									<td>{company.website}</td>
									<td>{company.gstn}</td>
									<td>{company.manufacturerOf}</td>
									<td>{getISODateTime(company.dateTimeCreated)}</td>
								</tr>
							})
						}
					</tbody>
				</Table>

				{
					this.state.companyRegShow ? <CompanyEdit heading='Company Edit' show={this.state.companyRegShow} newCompany={this.state.company} lgClose={() => this.handleCompanyRegClick(false)} handleModelClick={this.handleCompanyRegClick} />
						:
						null
				}
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		companyList: state.company.list,
		hasError: state.company.hasError,
		isLoading: state.company.isLoading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCompanyList: () => dispatch(itemsFetchData())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
