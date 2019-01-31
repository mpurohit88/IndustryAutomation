import React, { Component, Fragment } from 'react'
import { Table } from 'react-bootstrap'

import { all as getAllCompany } from '../../../core/api/company'

import { getISODateTime } from '../../helper'

/* component styles */
import { styles } from './styles.scss'

// List Of Company Component
class List extends Component {
	constructor(props){
		super(props);

		this.state = {
			companyList: []
		}
	}

	componentDidMount() {
		const that = this;

        getAllCompany().then((companyList) => {
      that.setState({companyList: companyList})
    });
  }

  render() {
    return (
			<Fragment>
				<hr />
				<Table responsive striped bordered hover className={styles}>
					<thead>
						<tr>
							<td>Id</td>
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
							this.state.companyList && this.state.companyList.map((company, index) => {
								return <tr key={index}>
									<td>{company.id}</td>
									<td>{company.name}</td>
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
			</Fragment>
		)
  }
}

export default List
