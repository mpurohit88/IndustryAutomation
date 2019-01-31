import React, { Component } from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import List from '../Quote/List'
import { ProductList } from '../Product'
import { CompanyList } from '../Company'
import { CustomerList } from '../Customer'
import { UserList } from '../User'

import { getAdmin } from '../../containers/helper'

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
    const isAdmin = getAdmin();

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
            <ProductList />
          </Tab>
          <Tab eventKey="customer" title="Customer">
            <CustomerList />
          </Tab>
          {
          isAdmin && <Tab eventKey="company" title="Company">
                      <CompanyList />
                    </Tab>
          }
          {
          isAdmin && <Tab eventKey="user" title="User">
                      <UserList />
                    </Tab>
          }
        </Tabs>
      </div>
    )
  }
}

export default Home
