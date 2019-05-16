import React, { Component, Fragment } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Row, Col, Button } from 'react-bootstrap'

import Input from '../../../components/Input'
import { Badge } from '../../../components/Badge'

import { getAllReminders } from '../../../core/api/reminder'

import { getISODateTime } from '../../helper'

/* component styles */
import { styles } from './styles.scss'

// List Of Reminder Component
class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reminderList: {},
      isLoading: true,
      filterCriteria: {
        from_date: null,
        to_date: null
      }
    };

    this.fetchAllReminders = this.fetchAllReminders.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.filterList = this.filterList.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.fetchAllReminders();
  }

  filterList() {
    const from_date = this.state.filterCriteria.from_date;
    const to_date = this.state.filterCriteria.to_date;

    this.fetchAllReminders(from_date, to_date);
  }

  fetchAllReminders(from_date, to_date) {
    getAllReminders(from_date, to_date).then((result) => {
      this.setState({ reminderList: result, isLoading: false });

      let count = 0;

      result.map(reminder => {
        reminder.is_new && count++;
      });

      this.props.setNewReminderCount(count);
    });
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;

    this.setState(prevState => {
      return {
        filterCriteria: {
          ...prevState.filterCriteria, [name]: value
        }
      }
    }, () => { }
    )
  }

  reset() {
    this.setState(prevState => {
      return {
        filterCriteria: {
          ...prevState.filterCriteria, ['from_date']: '', ['to_date']: ''
        }
      }
    }, () => { }
    )

    this.fetchAllReminders();
  }

  render() {
    const { reminderList, isLoading } = this.state;

    if (isLoading) {
      return <div>...Loading</div>
    }

    return (
      <Fragment>
        <hr />
        <div id='filter' style={{ border: '1px solid #ef851c', padding: '10px', borderRadius: '0.90rem', marginBottom: '14px' }}>
          <Row className="show-grid" style={{ alignItems: 'center' }}>
            <Col xs={2} md={2}>
              <Input label='From Date:' handleError={() => { }} onBlur={() => { }} onChange={this.handleInput} value={this.state.filterCriteria.from_date} name='from_date' id='from_date' type='date' />
            </Col>
            <Col xs={2} md={2}>
              <Input label='To Date:' handleError={() => { }} onBlur={() => { }} onChange={this.handleInput} value={this.state.filterCriteria.to_date} name='to_date' id='to_date' type='date' />
            </Col>
            <Col xs={2} md={2} style={{ paddingTop: '12px' }}>
              <Button variant="primary" type='button' onClick={this.filterList}>
                Filter Reimnder
						</Button>
              <Button variant="secondary" type='button' onClick={this.reset} style={{ marginLeft: '20px' }}>
                Reset
						</Button>
            </Col>
          </Row>
        </div>
        <Table responsive striped bordered hover className={styles}>
          <thead>
            <tr>
              <td>Quote Id</td>
              <td>From</td>
              <td>To</td>
              <td>Subject</td>
              <td>Reminder Date Time</td>
            </tr>
          </thead>
          <tbody>
            {
              reminderList && reminderList.map((reminder, index) => {
                return <tr key={index}>
                  <td>

                    <Link to={`/quote/${reminder.quote_id}`}>{`Quote ${reminder.quote_id}`}&nbsp;</Link>
                    {reminder.is_new === 1 && <Badge variant='success'>New</Badge>}

                  </td>
                  <td>{reminder.from_address}</td>
                  <td>{reminder.to_address}</td>
                  <td>{reminder.subject}</td>
                  <td>{getISODateTime(reminder.dateTimeCreated)}</td>
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
