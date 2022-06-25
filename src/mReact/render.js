

export function commitRoot(root) {
  commitWork(window.wipRoot.child);
  window.wipRoot = null
}

function commitWork(fiber) {
    if(!fiber) {
        return;
    }
    const domParent = fiber.parent.dom;
    domParent.appendChild(fiber.dom);
    commitWork(fiber.child);
    commitWork(fiber.sibling);
}


export default function render(element, container) {
    window.wipRoot = {
        dom: container,
        props: {
            children: [element],
        }
    }

    window.nextUnitOfWork = window.wipRoot;
}