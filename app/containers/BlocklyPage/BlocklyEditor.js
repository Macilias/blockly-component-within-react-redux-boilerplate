/*
 * BlocklyPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import ReactBlocklyComponent from 'react-blockly-component';
import ConfigFiles from './config';
import BlocklyWrapper from "./BlocklyWrapper";
import FilledHightDiv from "./FilledHightDiv";

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
  blocks: [{type: 'controls_if'}, {
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
}];

export class BlocklyEditor extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      toolboxCategories: INITIAL_TOOLBOX_CATEGORIES
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
    // Blockly.Blocks['kategorie_constant_instance_door'] = {
    //   init: function () {
    //     this.appendDummyInput()
    //       .appendField("Tür");
    //     this.setInputsInline(true);
    //     this.setType("type");
    //     this.setOutput(true, "categorie_constant");
    //     this.setColour(60);
    //     this.setTooltip("Diese Konstante soll verwendet werden um die Kategorie eines Produktes und der damit zu erzeugenden Lösung zu definieren.");
    //     this.setHelpUrl("");
    //   }
    // };
    let toolbox = React.createElement(ReactBlocklyComponent.BlocklyToolbox, {
      initialXml: ConfigFiles.ExampleToolboxXML,
    });
    let workspace = React.createElement(ReactBlocklyComponent.BlocklyWorkspace, {
      toolbox: toolbox,
    });
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
      initialXml: ConfigFiles.ExampleToolboxXML,
      wrapperDivClassName: 'fill-height',
      workspace: workspace,
      workspaceDidChange: this.workspaceDidChange
    });

    return (
      <BlocklyWrapper id="blockly">
        <FilledHightDiv>
          {editor}
        </FilledHightDiv>
      </BlocklyWrapper>
    )
  }

  /*
  *
  * Editor Class is the outer one containing toolbox and workspace!
  * <div className={this.props.wrapperDivClassName}>
        <BlocklyToolbox
          categories={Immutable.fromJS(this.props.toolboxCategories)}
          blocks={Immutable.fromJS(this.props.toolboxBlocks)}
          didUpdate={this.toolboxDidUpdate}
          processCategory={this.props.processToolboxCategory}
          ref={(toolbox) => { this.toolbox = toolbox; }}
        />
        <BlocklyWorkspace
          ref={(workspace) => { this.workspace = workspace; }}
          initialXml={this.props.initialXml}
          onImportXmlError={this.props.onImportXmlError}
          toolboxMode={toolboxMode}
          xmlDidChange={this.xmlDidChange}
          workspaceDidChange={this.workspaceDidChange}
          wrapperDivClassName={this.props.wrapperDivClassName}
          workspaceConfiguration={this.props.workspaceConfiguration}
        />
      </div>
  *
  *
  *
  *
  *
  *
  * */

}

export default BlocklyEditor;
