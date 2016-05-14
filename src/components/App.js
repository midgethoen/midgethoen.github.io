'use strict'

import * as React from 'react'

const { PropTypes } = React

const App = React.createClass({
  propTypes: {
    children: PropTypes.node
  },
  render: function () {
    return <div id="main" className="container">
      <Header />
      <div className="row">
        { this.props.children }
      </div>
      <Footer />
    </div>
  }
})

const Header = ()=>{
  return <header className="row">
    <div className="col-xs-12">
      <h1>midgethoen.github.io</h1>
      <h4>Creating stuff since 1988</h4>
    </div>
  </header>
}

function Footer(){
  return <footer className="row">
    <div className="col-xs-12">
      <p>Yay, footer, yay!!!!! hooray!! wohooooo! freck yeah!</p>
    </div>
  </footer>
}

export default App
