import React from 'react';

export function Example() {
  const [count, setCount] = React.useState(0);

  return (
    <button onClick={() => setCount(count + 1)} type="button">
      click {count}
    </button>
  );
}
