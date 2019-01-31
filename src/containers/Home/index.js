import React, { Component } from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import List from '../Quote/List'

/* component styles */
import { styles } from './styles.scss'

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'quote',
    };
  }

  render() {
    return (
      <div className={styles} >
        <Tabs
          id="controlled-tab-example"
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
          <Tab eventKey="quote" title="Quote">
            <List />
          </Tab>
          <Tab eventKey="product" title="Product">
            <List />
          </Tab>
          <Tab eventKey="customer" title="Customer">
            <List />
          </Tab>
          <Tab eventKey="company" title="Company">
            <List />
          </Tab>
          <Tab eventKey="user" title="User">
            <List />
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default Home
