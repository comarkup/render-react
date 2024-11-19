function ExampleComponent() {
  return React.createElement('div', {
    style: {
      padding: '20px',
      backgroundColor: '#f0f0f0'
    }
  },
    React.createElement('h1', {
      style: { color: 'blue' }
    }, 'Hello from React'),
    React.createElement('p', null, 'This is a simple component')
  );
}
