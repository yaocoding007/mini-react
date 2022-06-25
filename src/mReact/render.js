export default function render(element, container) {
    window.nextUnitOfWork = {
        dom: container,
        props: {
            children: [element],
        }
    }
}