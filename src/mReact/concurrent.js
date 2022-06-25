import { createDom } from './createElement'
import { commitRoot } from './render'

function workLoop(deadline) {
    let shouldYield = false;
    while (window.nextUnitOfWork && !shouldYield) {
      window.nextUnitOfWork = performUnitOfWork(window.nextUnitOfWork);
      shouldYield = deadline.timeRemaining() < 1;
    }
    if (!window.nextUnitOfWork && window.wipRoot) {
      commitRoot();
    }
}

function performUnitOfWork(fiber) {
    if(!fiber.dom) {
      fiber.dom = createDom(fiber);
    }
  
    if(fiber.parent) {
      fiber.parent.dom.appendChild(fiber.dom);
    }
  
    const elements = fiber.props.children;
    let index = 0;
    let prevSibling = null;
  
    while(index < elements.length) {
      const element = elements[index];
      const newFiber = {
        type: element.type,
        props: element.props,
        parent: fiber,
        dom: null,
      };
  
      if(index === 0) {
        fiber.child = newFiber;
      } else {
        prevSibling.sibling = newFiber;
      }
  
      prevSibling = newFiber;
      index++;
    }
  
    if(fiber.child) {
      return fiber.child;
    }
  
    let nextFiber = fiber;
  
    while(nextFiber) {
      if(nextFiber.sibling) {
        return nextFiber.sibling;
      }
      nextFiber = nextFiber.parent;
    }
}


export {
    workLoop,
    performUnitOfWork,
}