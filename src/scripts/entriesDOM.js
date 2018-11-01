// function to create any elements (el) with any content (cont or null) and you can designate if it has a child
const elementCreator = {
  elementFactory(el, cont, ...children) {
    let element = document.createElement(el)
    element.innerHTML = cont || null
    children.forEach(child => {
      element.appendChild(child)
    })
    // returns our created elements when called
    return element
  }
}
