/*
 * BlocklyPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import ReactBlocklyComponent from 'react-blockly-component';
import ConfigFiles from './config';
import BlocklyWrapper from './BlocklyWrapper';
import FilledHightDiv from './FilledHightDiv';

const INITIAL_TOOLBOX_CATEGORIES = [
  {
    name: 'Controls',
    blocks: [
      { type: 'controls_if' },
      {
        type: 'controls_repeat_ext',
        values: {
          TIMES: {
            type: 'math_number',
            shadow: true,
            fields: {
              NUM: 10,
            },
          },
        },
        statements: {
          DO: {
            type: 'text_print',
            shadow: true,
            values: {
              TEXT: {
                type: 'text',
                shadow: true,
                fields: {
                  TEXT: 'abc',
                },
              },
            },
          },
        },
      },
    ],
  },
  {
    name: 'Text',
    blocks: [
      { type: 'text' },
      {
        type: 'text_print',
        values: {
          TEXT: {
            type: 'text',
            shadow: true,
            fields: {
              TEXT: 'abc',
            },
          },
        },
      },
    ],
  },
];

export class BlocklyEditor extends React.PureComponent {
  workspaceDidChange = workspace => {
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    document.getElementById('generated-xml').innerText = newXml;

    const code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('code').value = code;
    console.log('workspaceDidChange');
  };

  constructor(props) {
    super(props);
    this.state = {
      toolboxCategories: INITIAL_TOOLBOX_CATEGORIES,
    };
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({
        toolboxCategories: this.state.toolboxCategories.concat([
          {
            name: 'Timeout Mount',
            blocks: [
              { type: 'text' },
              {
                type: 'text_print',
                values: {
                  TEXT: {
                    type: 'text',
                    shadow: true,
                    fields: {
                      TEXT: 'abc',
                    },
                  },
                },
              },
            ],
          },
        ]),
      });
    }, 2000);
  }

  render() {
    const editor = React.createElement(ReactBlocklyComponent.BlocklyEditor, {
      toolboxCategories: this.state.toolboxCategories,
      workspaceConfiguration: {
        grid: {
          spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true,
        },
      },
      initialXml: ConfigFiles.BlockLibraryXml,
      wrapperDivClassName: 'fill-height',
      workspaceDidChange: this.workspaceDidChange,
    });

    return (
      <BlocklyWrapper>
        <FilledHightDiv>{editor}</FilledHightDiv>
        <pre id="generated-xml"/>
        <textarea id="code" value=""/>
      </BlocklyWrapper>
    );
  }
}

export default BlocklyEditor;
