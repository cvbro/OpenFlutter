function component() {
  let element = document.createElement('div');

  element.innerHTML = 'Hello Webpack';
  console.log('ok')
  return element;
}

document.body.appendChild(component());
