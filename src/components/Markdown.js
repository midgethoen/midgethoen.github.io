import React from 'react'
import marked from 'marked'

export default React.createClass({
  propTypes: {
    children: React.PropTypes.string
  },
  render: function(){
      return <div dangerouslySetInnerHTML={{ __html: marked(this.props.children)}}
                                className="marked" />
  }
})


