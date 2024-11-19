const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const bodyParser = require('body-parser');
const app = express();
const port = 3003;

// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dynamic React component that accepts props
const DynamicComponent = ({ title, content, items = [] }) => {
    return React.createElement('div', null,
        React.createElement('h1', null, title),
        React.createElement('p', null, content),
        React.createElement('ul', null,
            items.map((item, index) =>
                React.createElement('li', { key: index }, item)
            )
        )
    );
};

// GET endpoint - simple render
app.get('/render', (req, res) => {
    const html = ReactDOMServer.renderToString(
        React.createElement(DynamicComponent, {
            title: 'Simple GET Request',
            content: 'This was rendered using a GET request'
        })
    );

    res.send(wrapHtml(html));
});

// POST endpoint - render with custom data
app.post('/render', (req, res) => {
    const { title, content, items } = req.body;

    const html = ReactDOMServer.renderToString(
        React.createElement(DynamicComponent, {
            title: title || 'Default Title',
            content: content || 'Default Content',
            items: items || []
        })
    );

    res.send(wrapHtml(html));
});

// Helper function to wrap rendered React in HTML
function wrapHtml(component) {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR with CURL</title>
      </head>
      <body>
        <div id="root">${component}</div>
      </body>
    </html>
  `;
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
