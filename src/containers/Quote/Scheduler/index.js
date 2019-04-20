import React, { Component } from 'React'
import { connect } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap'

import { StandardModal } from '../../../components/Modals'

import Dropdown from '../../../components/Dropdown'
import Input from '../../../components/Input'
import { getDateTimePickerDate } from '../../helper'

import { getById } from '../../../core/api/company'
import { setReminder, getScheduleDetails } from '../../../core/api/schedule'

class Scheduler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newSchedule: {
                scheduleId: props.scheduleId,
                to: props.quoteDetails.email,
                cc: '',
                bcc: '',
                schedule_day: '',
                schedule_time: '',
                companyEmailId: ''
            },
            scheduleList: [{ name: "Every", id: "1" }]
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.lgClose = this.lgClose.bind(this);
    }

    componentDidMount() {
        const self = this;

        getById().then((data) => {
            self.setState(prevState => {
                return {
                    newSchedule: {
                        ...prevState.newSchedule, ['companyEmailId']: data
                    }
                }
            });
        });

        if (this.props.scheduleId) {
            getScheduleDetails(this.props.scheduleId).then((data) => {
                document.getElementById('schedule_day').value = getDateTimePickerDate(data.schedule[0].next_reminder_date);

                self.setState(prevState => {
                    return {
                        newSchedule: {
                            ...prevState.newSchedule, ['schedule_day']: getDateTimePickerDate(data.schedule[0].next_reminder_date), ['schedule_time']: data.schedule[0].Frequency,
                            ['cc']: data.schedule[0].cc_address, ['bcc']: data.schedule[0].bcc_address
                        }
                    }
                })
            })
        }
    }

    handleSubmit() {
        const self = this;

        this.props.setReminderAction(self.state.newSchedule, self.props.acivityTaskId, self.props.nextActivityTaskId, self.props.userActivityId, self.props.quoteDetails.id, () => {
            self.lgClose();
        });
    }

    lgClose() {
        this.props.lgClose(false);
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;

        this.setState(prevState => {
            return {
                newSchedule: {
                    ...prevState.newSchedule, [name]: value
                }
            }
        }, () => { }
        )
    }

    render() {
        let scheduleDrpDwn = this.state.scheduleList.map((party) => {
            return { text: party.name, value: party.id };
        });

        return (
            <StandardModal btnText={this.props.scheduleId ? 'Update Schedule' : 'Save Schedule'} heading='Scheduler' isLoading={false} handleSubmit={this.handleSubmit} show={this.props.show} lgClose={this.lgClose} handleModelClick={this.lgClose}>
                <Form>
                    <Row className="show-grid">
                        <Col xs={8} md={6}>
                            <Input label='From:' handleError={() => { }} isRequired={true} onBlur={() => { }} type='input' onChange={this.handleInput} value={this.state.newSchedule.companyEmailId} name='companyEmailId' id='companyEmailId' placeholder='Enter Company EmailId' />
                        </Col>
                        <Col xs={8} md={6}>
                            <Input label='To:' handleError={() => { }} isRequired={true} onBlur={() => { }} type='input' onChange={this.handleInput} value={this.state.newSchedule.to} name='to' id='to' placeholder='Enter To' />
                        </Col>
                        <Col xs={8} md={6}>
                            <Input label='CC:' handleError={() => { }} isRequired={true} onBlur={() => { }} onChange={this.handleInput} value={this.state.newSchedule.cc} name='cc' id='cc' type='input' />
                        </Col>
                        <Col xs={8} md={6}>
                            <Input label='BCC:' handleError={() => { }} isRequired={true} onBlur={() => { }} onChange={this.handleInput} value={this.state.newSchedule.bcc} name='bcc' id='bcc' type='input' />
                        </Col>
                        <Col xs={8} md={4}>
                            <Input label='First Schedule Date:' handleError={() => { }} isRequired={true} onBlur={() => { }} onChange={this.handleInput} value={this.state.newSchedule.schedule_day} name='schedule_day' id='schedule_day' type='date' />

                            {/* <Form.Control type="date" /> */}
                            {/* <Dropdown
                                id='schedule_day'
                                name='schedule_day'
                                label='First Date'
                                value={this.state.newSchedule.schedule_day}
                                onChange={this.handleInput}
                                placeholder='--Select Schedule--'
                                options={[{ text: 'Day', value: 1 },
                                { text: 'Monday', value: 7 },
                                { text: 'Tuesday', value: 7 },
                                { text: 'Wednesday', value: 7 },
                                { text: 'Thursday', value: 7 },
                                { text: 'Friday', value: 7 },
                                { text: 'Satrurday', value: 7 },
                                { text: 'Sunday', value: 7 }
                                ]}
                            /> */}
                        </Col>
                        <Col xs={8} md={4}>
                            <Dropdown
                                id='schedule_time'
                                name='schedule_time'
                                label='Set Interval Day:'
                                value={this.state.newSchedule.schedule_time}
                                defaultValue={this.state.newSchedule.schedule_day}
                                onChange={this.handleInput}
                                placeholder='--Select Inderval--'
                                options={[
                                    { text: '1', value: 1 },
                                    { text: '2', value: 2 },
                                    { text: '3', value: 3 },
                                    { text: '4', value: 4 },
                                    { text: '5', value: 5 },
                                    { text: '6', value: 6 },
                                    { text: '7', value: 7 }]}
                            />
                        </Col>
                    </Row>
                </Form>
            </StandardModal>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setReminderAction: (newSchedule, taskHistId, nextTaskHistId, userActivityId, quoteId, cb) => dispatch(setReminder(newSchedule, taskHistId, nextTaskHistId, userActivityId, quoteId, cb))
    };
};

export default connect(null, mapDispatchToProps)(Scheduler);
