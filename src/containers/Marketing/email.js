import React, { Component, Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'

import { StandardModal } from '../../components/Modals'
import { getTemplate } from '../../components/Email'

import Input from '../../components/Input'
import Button from '../../components/Button'
import { Success } from '../../components/Alerts'

import { getMarketingTemplate, sendEmail } from '../../core/api/marketing'

export default class Email extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isSuccess: false
        }

        this.sendMarketingEmail = this.sendMarketingEmail.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        getMarketingTemplate().then(data => {
            this.setState({ emailBody: data[0].template_path });
        });
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;

        this.setState({ [name]: value })
    }

    sendMarketingEmail() {
        if (this.state.subject.trim() !== "") {
            const self = this;
            // let body = getTemplate();

            // let html = stateToHTML(this.state.editorState.getCurrentContent())

            self.setState({ isLoading: true });

            // let data = { body: body, from: this.state.from, to: this.state.to || this.props.details.quoteDetails.email, cc: this.state.cc || '', bcc: this.state.bcc || '', subject: this.state.subject };
            // const formData = new FormData();
            // formData.append('data', JSON.stringify(data));

            sendEmail({ from: this.state.from, to: this.state.to, cc: this.state.cc || '', bcc: this.state.bcc || '', subject: this.state.subject }).then((result) => {
                if (result === 'success') {
                    self.setState({ isLoading: false, from: '', to: '', cc: '', bcc: '', subject: '', isSuccess: true });
                }
            });
        } else {
            alert('Subject is required');
        }
    }

    render() {
        return (
            <Fragment>
                <hr />
                <div id='filter' style={{ border: '1px solid #ef851c', padding: '10px', borderRadius: '0.90rem', marginBottom: '14px' }}>
                    {this.state.isSuccess ? <Success id='userSuccess'>Email Send Successfully</Success> : null}

                    <Row className="show-grid">
                        <Col xs={4} md={6}>
                            <Input hint='Please Use Comma(,) or Semicolon(;) to send Multiple Emails' label='From:' onChange={this.handleInput} value={this.state.from} name='from' id='from' type='email' />
                        </Col>
                        <Col xs={4} md={6}>
                            <Input hint='Please Use Comma(,) or Semicolon(;) to send Multiple Emails' label='To:' onChange={this.handleInput} value={this.state.to} name='to' id='to' type='email' />
                        </Col>
                        <Col xs={4} md={6}>
                            <Input hint='Please Use Comma(,) or Semicolon(;) to send Multiple Emails' label='CC:' onChange={this.handleInput} value={this.state.cc} name='cc' id='cc' type='email' />
                        </Col>
                        <Col xs={4} md={6}>
                            <Input hint='Please Use Comma(,) or Semicolon(;) to send Multiple Emails' label='BCC:' onChange={this.handleInput} value={this.state.bcc} name='bcc' id='bcc' type='email' />
                        </Col>
                        <Col xs={12} md={12}>
                            <Input label='Subject:' onChange={this.handleInput} value={this.state.subject} name='subject' id='subject' type='input' />
                        </Col>
                        <Col xs={12} md={12}>
                            <Button variant={"primary"} type="button" onClick={() => this.sendMarketingEmail()} className="float-right" >
                                Send Email
                        </Button>
                        </Col>
                    </Row>
                    <hr />

                    {/* <Main lgClose={this.lgClose} show={this.state.showEditor} handleSubmit={(body) => this.sendEmailToCustomer(this.state.acivityTaskId, this.state.nextActivityTaskId, this.state.userActivityId, body)} subject={this.state.subject} to={this.state.to} from={this.state.from} isLoading={this.state.isLoading} text={getTemplate(1, products, quoteDetails)} quoteDetails={quoteDetails} products={products} /> */}
                    <div id="printEmail" dangerouslySetInnerHTML={{ __html: this.state.emailBody }} />

                    {/* Editor */}

                    {/* {this.state.emailBody && this.state.editorState != '' ? '' : <div className={styles + " RichEditor-root"}>
							<BlockStyleControls
								editorState={editorState}
								onToggle={this.toggleBlockType}
							/>
							<InlineStyleControls
								editorState={editorState}
								onToggle={this.toggleInlineStyle}
							/>
							<div className={className} onClick={this.focus}>
								<Editor
									blockStyleFn={getBlockStyle}
									blockRenderMap={blockRenderMap}
									customStyleMap={styleMap}
									editorState={editorState}
									handleKeyCommand={this.handleKeyCommand}
									onChange={this.onChange}
									onTab={this.onTab}
									ref="editor"
									spellCheck={true}
								/>
							</div>
						</div>
						} */}

                    {/* End */}

                    {/* </StandardModal> */}
                </div>`
            </Fragment>
        )
    }
}