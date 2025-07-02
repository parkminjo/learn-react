import MyReact, { useState } from './MyReact.mjs';

function FunctionalComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('foo');

  return {
    click: () => setCount((prev) => prev + 1),
    text: (text) => setText(text),
    render: () => {
      console.log('render', { count, text });
    },
  };
}

let App = MyReact.render(FunctionalComponent);
App.click();
App = MyReact.render(FunctionalComponent);
App.text('bar');
App = MyReact.render(FunctionalComponent);
