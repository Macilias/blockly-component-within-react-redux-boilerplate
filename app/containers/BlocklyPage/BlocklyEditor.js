/*
 * BlocklyPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import ReactBlocklyComponent from 'react-blockly-component';
import parseWorkspaceXml from 'react-blockly-component/dist-modules/BlocklyHelper';
import ConfigFiles from './config';
import BlocklyWrapper from './BlocklyWrapper';
import FilledHeightDiv from './FilledHightDiv';

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
      toolboxCategories: parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML),
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
      initialXml: ConfigFiles.INITIAL_XML,
      wrapperDivClassName: 'fill-height',
      workspaceDidChange: this.workspaceDidChange,
    });

    return (
      <BlocklyWrapper>
        <FilledHeightDiv>{editor}</FilledHeightDiv>
        <pre id="generated-xml" />
        <textarea id="code" value="" />
      </BlocklyWrapper>
    );
  }
}

export default BlocklyEditor;
