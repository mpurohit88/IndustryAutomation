import React, { Component } from 'React'
import { Form, Row, Col } from 'react-bootstrap'

import { StandardModal } from '../../../components/Modals'

import Dropdown from '../../../components/Dropdown'

export default class Scheduler extends Component {
    constructor(props) {
		super(props);
        
        this.state = {
            scheduleList: [{name: "Every", id: "1"}]
        }

		this.lgClose = this.lgClose.bind(this);
    }
    
    lgClose() {
		this.props.lgClose(false);
    }
    
    render() {
        let scheduleDrpDwn = this.state.scheduleList.map((party) => {
			return {text: party.name, value: party.id};
		});

        return (
            <StandardModal btnText='Schedule' heading='Scheduler' isLoading={false} handleSubmit={() => {}} show={this.props.showScheduler} lgClose={this.lgClose} handleModelClick={this.lgClose}>
                <Form>
                    <Row className="show-grid">
                        <Col xs={8} md={4}>
                            <Dropdown
                                id='schedule'
                                name='schedule'
                                label='Set Scheduler Sequence:'
                                // value={this.state.newQuote.party_name} 
                                onChange={() => {}}
                                placeholder='--Select Schedule--'
                                options={scheduleDrpDwn}
                            />
                        </Col>
                        <Col xs={8} md={4}>
                            <Dropdown
                                id='schedule_day'
                                name='schedule_day'
                                label='Set Scheduler Day:'
                                // value={this.state.newQuote.party_name} 
                                onChange={() => {}}
                                placeholder='--Select Schedule--'
                                options={[{text: 'Day', value: 0}, {text: 'Monday', value: 1}, {text: 'Tuesday', value: 2}]}
                            />
                        </Col>
                        <Col xs={8} md={4}>
                            <Dropdown
                                id='schedule_time'
                                name='schedule_time'
                                label='Set Scheduler Time:'
                                // value={this.state.newQuote.party_name} 
                                onChange={() => {}}
                                placeholder='--Select Time--'
                                options={[{text: '1 AM', value: 1}, {text: '2 AM', value: 2}]}
                            />
                        </Col>
                    </Row>
                 </Form>
            </StandardModal>
        )
    }
}