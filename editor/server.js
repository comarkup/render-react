// server.js
import express from 'express';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const require = createRequire(import.meta.url);
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Serve the editor page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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
    console.log(`Server running at http://localhost:${PORT}`);
});