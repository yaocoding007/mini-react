import mReact from './mReact';

import { workLoop } from './mReact/concurrent'

window.nextUnitOfWork = null;

requestIdleCallback(workLoop)

/** @jsx mReact.createElement */
const element = (
  <div>
    <h1>mini-react</h1>
    <h2>hello-world</h2>
  </div>
)

const container = document.querySelector('#root')

mReact.render(element, container)