'use strict'

import * as React from 'react'

const { PropTypes } = React

const App = React.createClass({
  propTypes: {
    children: PropTypes.node
  },
  render: function () {
    return <div className="container">
      <div className="row">
        <div className="col-md-offset-3 col-md-4">
      { this.props.children }
        </div>
      </div>
    </div>
  }
})

export default App
