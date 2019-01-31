import React, { Component, Fragment } from 'react'
import { Table } from 'react-bootstrap'

/* component styles */
import { styles } from './styles.scss'

// List Of Quote Component
class Table extends Component {
	constructor(props){
		super(props);
	}

  render() {
    const { children } = this.props;
    
    return (
			<Fragment>
				<Table responsive striped bordered hover>
					{children}
				</Table>
			</Fragment>
		)
  }
}

export default Table
