import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

/* component styles */
import { styles } from './styles.scss'

// Home Of Quote Component
class Home extends Component {
  render() {
    return (
			<Fragment>
				<div className={styles}>
					<h3>Quote Detail Page</h3>
				</div>
			</Fragment>
		)
  }
}

const mapStateToProps = (state) => {
	return {
			
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

