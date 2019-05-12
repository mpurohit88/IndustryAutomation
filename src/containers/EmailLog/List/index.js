import React, { Component, Fragment } from 'react'
import { Table } from 'react-bootstrap'

import { getEmailLog } from '../../../core/api/emailLog'

import { getISODateTime } from '../../helper'

/* component styles */
import { styles } from './styles.scss'

// List Of Error logs Component
class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errorLogs: {},
			isLoading: true
		};
	}

	componentDidMount() {
		getEmailLog().then((result) => {
			this.setState({ errorLogs: result, isLoading: false });
			this.props.setErrorCount(result.length);
		})
	}

	render() {
		const { errorLogs, isLoading } = this.state;

		if (isLoading) {
			return <div>...Loading</div>
		}

		return (
			<Fragment>
				<hr />
				<Table responsive striped bordered hover className={styles}>
					<thead>
						<tr>
							<td>Quote Id</td>
							<td>Schedule Id</td>
							<td>Error Message</td>
							<td>Stack Trace</td>
							<td>Created Time</td>
						</tr>
					</thead>
					<tbody>
						{
							errorLogs && errorLogs.map((log, index) => {
								return <tr key={index}>
									<td>{log.quote_id}</td>
									<td>{log.schedule_id}</td>
									<td>{log.error_msg}</td>
									<td>{log.stack_trace}</td>
									<td>{getISODateTime(log.dateTimeCreated)}</td>
								</tr>
							})
						}
					</tbody>
				</Table>
			</Fragment>
		)
	}
}

export default List;
