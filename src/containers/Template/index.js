import React, { Component } from 'react'
import { Form, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { stateToHTML } from 'draft-js-export-html';

import { Editor, EditorState, RichUtils, ContentState, convertToRaw, convertFromHTML, DefaultDraftBlockRenderMap } from 'draft-js';
import Immutable from 'immutable';

import Modal from '../../components/Modals/StandardModal'

import { getTermCondition, updateTermCondition } from '../../core/api/company'

class Template extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'quote',
      emailBody: false,
      editorState: ''
    };

    this.onChange = (editorState) => this.setState({ editorState });
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  componentDidMount() {
    let type = 5;
    const self = this;

    getTermCondition(type).then((termCondition) => {
      //let terms = html;
      let terms = termCondition ? termCondition.TermCondition ? (termCondition.TermCondition.text && termCondition.TermCondition.text !== '') ? termCondition.TermCondition.text : 'Template is missing' : 'Template is missing' : 'Template is missing';

      const contentBlock = convertFromHTML(terms);

      if (contentBlock) {
        const editorState = EditorState.createWithContent(ContentState.createFromBlockArray(contentBlock.contentBlocks));

        self.setState({ emailBody: true, editorState: editorState });
      }
    });
  }

  handleSubmit() {
    let html = stateToHTML(this.state.editorState.getCurrentContent())

    updateTermCondition(html, 5).then(result => {
      alert('saved data');
    })
  }

  render() {
    const { editorState } = this.state;
    const blockRenderMap = DefaultDraftBlockRenderMap.merge(
      Immutable.Map({
        'header-five': {
          element: 'div',
          wrapper: <CodeBlock />
        }
      })
    );

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';

    // const contentState = editorState && editorState.getCurrentContent();
    // if (contentState && !contentState.hasText()) {
    //   if (contentState.getBlockMap().first().getType() !== 'unstyled') {
    //     className += ' RichEditor-hidePlaceholder';
    //   }
    // }

    return (
      <Modal btnText='Save' heading='Manage Email Template' handleSubmit={() => this.handleSubmit()} show={this.props.show} lgClose={() => this.props.lgClose(false)} handleModelClick={this.props.handleModelClick}>
        <Form>
          {/* <Tabs
            id="controlled-tab-example"
            activeKey={this.state.key}
            onSelect={key => this.setState({ key })}
          >
            <Tab eventKey="quote" title="Quote Reminder">
              Home
            </Tab>
          </Tabs> */}
        </Form>

        {this.state.emailBody && <div className={"RichEditor-root"}>
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />

          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />

          <Editor
            blockStyleFn={getBlockStyle}
            blockRenderMap={blockRenderMap}
            // customStyleMap={styleMap}
            editorState={editorState}
            // handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            // onTab={this.onTab}
            ref="editor"
            spellCheck={true}
          />
        </div>
        }
      </Modal>
      // <Modal btnText='Save' heading='Add Currency' show={this.props.show} lgClose={() => this.props.lgClose(false)} handleModelClick={this.props.handleModelClick}>

      //   <Tabs
      //     id="controlled-tab-example"
      //     activeKey={this.state.key}
      //     onSelect={key => this.setState({ key })}
      //   >
      //     <Tab eventKey="home" title="Home">
      //       Home
      //     </Tab>
      //     <Tab eventKey="profile" title="Profile">
      //       profile
      //     </Tab>
      //   </Tabs>
      // </Modal>
    );
  }
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class CodeBlock extends React.Component {
  render() {
    return (
      <div
        className="justified-row"
        data-offset-key={this.props["data-offset-key"]}
        width='100%'
      >
        {this.props.children}
      </div>
    );
  }
}


class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];


const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default Template;