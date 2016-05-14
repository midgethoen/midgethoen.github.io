'use strict'

import Helmet from 'react-helmet'
import React from 'react'

// let head = Helmet.rewind()
// {  head.title.toComponent() }
// {  head.meta.toComponent()  }
// {  head.link.toComponent()  }
const Page = ({children})=>{
  return <html>
    <head>
      <link type="text/css" rel="stylesheet" href="/style.css"/>
    </head>
    <body>
      { children }
    </body>
  </html>
}

export default Page
