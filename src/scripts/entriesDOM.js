// function to create any elements (el) with any content (cont or null) and you can designate if it has a child
const elementCreator = {
  elementFactory(el, cont, clazz, id, ...children) {
    let element = document.createElement(el)
    $(element).html(cont || null)
    $(element).addClass(clazz || null)
    element.setAttribute("id", id || null)
    children.forEach(child => {
      element.appendChild(child)
    })
    // returns our created elements when called
    return element
  },
  dropdownFactory(id, label) {
    let holder = document.createElement("select")
    let element = document.createElement("option")
    element.setAttribute("value", id)
    element.innerHTML =label
    holder.appendChild(element)
  }
}


export default elementCreator