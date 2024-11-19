import React, { useState, useEffect, useRef } from 'react';

const DEFAULT_CODE = `function ExampleComponent() {
  return (
    <div style={{padding: '1rem', backgroundColor: '#f0f0f0'}}>
      <h1 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Hello React!</h1>
      <p>Edit me to see changes</p>
    </div>
  );
}`;

export default function SimpleEditor() {
    const [code, setCode] = useState(DEFAULT_CODE);
    const [preview, setPreview] = useState('');
    const [error, setError] = useState(null);
    const timeoutRef = useRef(null);

    const updatePreview = async () => {
        try {
            const response = await fetch('http://localhost:3001/render', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                setPreview('');
            } else {
                setError(null);
                setPreview(data.html);
            }
        } catch (err) {
            setError('Failed to connect to render server');
        }
    };

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(updatePreview, 1000);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [code]);

    return (
        <div className="grid grid-cols-2 gap-4 p-4 h-screen bg-gray-100">
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-bold mb-2">Editor</h2>
                <textarea
                    className="w-full h-[calc(100%-2rem)] p-2 font-mono border rounded"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck="false"
                />
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-bold mb-2">Preview</h2>
                {error && (
                    <div className="p-4 bg-red-100 text-red-700 rounded mb-4">
                        {error}
                    </div>
                )}
                <div className="border rounded p-4">
                    <div dangerouslySetInnerHTML={{ __html: preview }} />
                </div>
            </div>
        </div>
    );
}