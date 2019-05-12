import React, { Component } from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import { getAdmin } from '../../configs/user'


import List from '../Quote/List'
import { ProductList } from '../Product'
import { CompanyList } from '../Company'
import { CustomerList } from '../Customer'
import { UserList } from '../User'
import { EmailLogList } from '../EmailLog'
import { ReminderList } from '../Reminder'

/* component styles */
import { styles } from './styles.scss'

class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      key: 'quote',
      errorCount: 0,
      reminderCount: 0
    };

    this.setErrorCount = this.setErrorCount.bind(this);
    this.setNewReminderCount = this.setNewReminderCount.bind(this);
  }

  setErrorCount(count) {
    this.setState({ errorCount: count })
  }

  setNewReminderCount(count) {
    this.setState({ reminderCount: count })
  }

  render() {
    const isAdmin = getAdmin();

    return (
      <div className={styles}>
        <Tabs
          id="controlled-tab-example"
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
          <Tab eventKey="quote" title="Quote">
            <List isAdmin={isAdmin} />
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
          {
            <Tab eventKey="reminder" title={"Reminder (" + this.state.reminderCount + ")"}>
              <ReminderList setNewReminderCount={this.setNewReminderCount} />
            </Tab>
          }
          {
            isAdmin && <Tab eventKey="email" title={"Email Error Log (" + this.state.errorCount + ")"}>
              <EmailLogList setErrorCount={this.setErrorCount} />
            </Tab>
          }
        </Tabs>
      </div>
    )
  }
}

export default Home
