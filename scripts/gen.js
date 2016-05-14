'use strict'
import replay from 'Replay'

/* jshint node: true */
replay.fixtures = __dirname + '/fixtures'

import { fetchContent } from '../src/fetchContent'
import genPages from '../src/genPages'

fetchContent('midgethoen/blog')
 .then(genPages('www'))
 .then( console.log.bind(console, 'Yay! done :)') )
 .catch( (err)=>{console.error('Oh, noesss.. ', err.message, err.stack)} )
