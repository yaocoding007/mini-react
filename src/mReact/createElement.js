function createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: []
      }
    };
}

function createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map(child =>
          typeof child === "object" ? child : createTextElement(child)
        )
      }
    };
}

function createDom(fiber) {
  const dom =
  fiber.type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(fiber.type);
  const isProperty = key => key !== "children";
  Object.keys(fiber.props)
      .filter(isProperty)
      .forEach(name => {
          dom[name] = fiber.props[name];
      });
  return dom;
}

export {
  createDom,
  createElement,
}