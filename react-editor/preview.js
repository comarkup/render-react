// server.js
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const app = express();

// Basic CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

// Simple component renderer
app.post('/render', (req, res) => {
    try {
        const { code } = req.body;

        // Basic security check
        if (code.includes('process.') || code.includes('require(')) {
            throw new Error('Unsafe code detected');
        }

        // Create component function
        const ComponentFunction = new Function('React', `
            with (React) {
                ${code}
                return ExampleComponent;
            }
        `);

        const Component = ComponentFunction(React);
        const html = ReactDOMServer.renderToString(React.createElement(Component));

        res.json({ html, error: null });
    } catch (error) {
        res.json({ html: null, error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});