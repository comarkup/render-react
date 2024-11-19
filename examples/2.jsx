function ExampleComponent() {
    return React.createElement('div', {
            style: {
                padding: '20px',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                fontFamily: 'Arial'
            }
        },
        React.createElement('h1', {
            style: {
                color: 'blue',
                marginBottom: '10px'
            }
        }, 'Interactive Component'),
        React.createElement('p', {
            style: {
                color: '#666',
                lineHeight: '1.5'
            }
        }, 'This is a test component with styled elements'),
        React.createElement('button', {
            style: {
                backgroundColor: '#007bff',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }
        }, 'Click Me')
    );
}