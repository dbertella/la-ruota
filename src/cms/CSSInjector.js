import React from 'react'
import { StyleSheetManager } from 'styled-components'

export class CSSInjector extends React.Component {
  state = {
    iframeRef: ''
  }

  componentDidMount() {
    const iframe = document.getElementsByTagName('iframe')[0]
    const iframeHeadElem = iframe.contentDocument.head;
    this.setState({ iframeRef: iframeHeadElem })
  }

  render() {
    return (
      <div>
        { this.state.iframeRef && (
          <StyleSheetManager target={this.state.iframeRef}>
            { this.props.children }
          </StyleSheetManager>
        )}
      </div>
    )
  }
}
