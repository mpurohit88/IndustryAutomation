import React, { Component } from 'React'
import { connect } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap'

import { StandardModal } from '../../../components/Modals'

import Dropdown from '../../../components/Dropdown'
import Input from '../../../components/Input'
import { getById } from '../../../core/api/company'
import { setReminder, getScheduleDetails } from '../../../core/api/schedule'

class Scheduler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newSchedule: {
                scheduleId: props.scheduleId,
                to: props.quoteDetails.email,
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
                self.setState(prevState => {
                    return {
                        newSchedule: {
                            ...prevState.newSchedule, ['schedule_day']: data.schedule[0].Frequency, ['schedule_time']: data.schedule[0].Time
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
        }, () => console.log(this.state.newSchedule)
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
                            <Input label='From:' handleError={() => { }} isRequired={true} onBlur={() => { }} type='input' onChange={this.handleInput} value='reminder@somiconveyor.com' name='companyEmailId' id='companyEmailId' placeholder='Enter Company EmailId' />
                        </Col>
                        <Col xs={8} md={6}>
                            <Input label='To:' handleError={() => { }} isRequired={true} onBlur={() => { }} type='input' onChange={this.handleInput} value={this.state.newSchedule.to} name='to' id='to' placeholder='Enter To' />
                        </Col>
                        <Col xs={8} md={4}>
                            <Dropdown
                                id='schedule_day'
                                name='schedule_day'
                                label='Every'
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
                            />
                        </Col>
                        <Col xs={8} md={4}>
                            <Dropdown
                                id='schedule_time'
                                name='schedule_time'
                                label='Set Scheduler Time:'
                                value={this.state.newSchedule.schedule_time}
                                defaultValue={this.state.newSchedule.schedule_day}
                                onChange={this.handleInput}
                                placeholder='--Select Time--'
                                options={[
                                    { text: '1 AM', value: 1 },
                                    { text: '2 AM', value: 2 },
                                    { text: '3 AM', value: 3 },
                                    { text: '4 AM', value: 4 },
                                    { text: '5 AM', value: 5 },
                                    { text: '6 AM', value: 6 },
                                    { text: '7 AM', value: 7 },
                                    { text: '8 AM', value: 8 },
                                    { text: '9 AM', value: 9 },
                                    { text: '10 AM', value: 10 },
                                    { text: '11 AM', value: 11 },
                                    { text: '12 AM', value: 12 },
                                    { text: '1 PM', value: 13 },
                                    { text: '2 PM', value: 14 },
                                    { text: '3 PM', value: 15 },
                                    { text: '4 PM', value: 16 },
                                    { text: '5 PM', value: 17 },
                                    { text: '6 PM', value: 18 },
                                    { text: '7 PM', value: 19 },
                                    { text: '8 PM', value: 20 },
                                    { text: '9 PM', value: 21 },
                                    { text: '10 PM', value: 22 },
                                    { text: '11 PM', value: 23 },
                                    { text: '12 PM', value: 24 }]}
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
