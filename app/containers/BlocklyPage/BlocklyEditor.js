/*
 * BlocklyPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import ReactBlocklyComponent from 'react-blockly-component';

const INITIAL_XML = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>';

const INITIAL_TOOLBOX_CATEGORIES_EXT = [{
  type: 'controls_if'
}, {
  type: 'controls_repeat_ext',
  values: {
    TIMES: {
      type: 'math_number',
      shadow: true,
      fields: {
        NUM: 10
      }
    }
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
            TEXT: 'abc'
          }
        }
      }
    }
  }
}];

const INITIAL_TOOLBOX_CATEGORIES = [{
  name: 'Controls',
  blocks: [{ type: 'controls_if' }, {
    type: 'controls_repeat_ext',
    values: {
      TIMES: {
        type: 'math_number',
        shadow: true,
        fields: {
          NUM: 10
        }
      }
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
              TEXT: 'abc'
            }
          }
        }
      }
    }
  }]
}, {
  name: 'Text',
  blocks: [{ type: 'text' }, {
    type: 'text_print',
    values: {
      TEXT: {
        type: 'text',
        shadow: true,
        fields: {
          TEXT: 'abc'
        }
      }
    }
  }]
}];

export class BlocklyEditor extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      toolboxCategories: INITIAL_TOOLBOX_CATEGORIES_EXT
    };
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({
        toolboxCategories: this.state.toolboxCategories.concat([{
          name: 'Text2',
          blocks: [{type: 'text'}, {
            type: 'text_print',
            values: {
              TEXT: {
                type: 'text',
                shadow: true,
                fields: {
                  TEXT: 'abc'
                }
              }
            }
          }]
        }])
      });
    }, 2000);
  };

  workspaceDidChange = workspace => {
    const newXml = BlocklyEditor.Xml.domToText(BlocklyEditor.Xml.workspaceToDom(workspace));
    document.getElementById('generated-xml').innerText = newXml;

    const code = BlocklyEditor.JavaScript.workspaceToCode(workspace);
    document.getElementById('code').value = code;
  };


  render() {
    let editor = React.createElement(ReactBlocklyComponent.BlocklyEditor, {
      toolboxCategories: this.state.toolboxCategories,
      workspaceConfiguration: {
        grid: {
          spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true
        }
      },
      initialXml: INITIAL_XML,
      wrapperDivClassName: 'fill-height',
      workspaceDidChange: this.workspaceDidChange
    });
    let workspace = React.createElement(ReactBlocklyComponent.BlocklyWorkspace, {
      value: editor,
    });
    return (
      workspace
    )
  }

}

export default BlocklyEditor;
