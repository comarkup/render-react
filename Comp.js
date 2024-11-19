import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function LiveEditor() {
    const [code, setCode] = useState(`// Paste your React component here
function ExampleComponent() {
  return (
    <div className="p-4 bg-blue-100 rounded">
      <h1 className="text-xl font-bold">Hello React!</h1>
      <p>Start editing to see live changes</p>
    </div>
  );
}

export default ExampleComponent;`);

    const [preview, setPreview] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const timerRef = useRef(null);

    const updatePreview = async () => {
        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Clear existing timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // Set new timer for auto-update
        timerRef.current = setTimeout(() => {
            updatePreview();
        }, 1000);

        // Cleanup on unmount
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [code]);

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        setCode(text);
    };

    return (
        <div className="flex h-screen bg-gray-100 p-4">
            <div className="flex flex-col w-1/2 mr-2">
                <div className="bg-white rounded-lg shadow-lg p-4 h-full">
                    <h2 className="text-lg font-semibold mb-2">React Component Editor</h2>
                    <textarea
                        className="w-full h-[calc(100%-3rem)] p-4 font-mono text-sm border rounded"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onPaste={handlePaste}
                        placeholder="Paste your React component here..."
                    />
                </div>
            </div>

            <div className="flex flex-col w-1/2 ml-2">
                <div className="bg-white rounded-lg shadow-lg p-4 h-full">
                    <h2 className="text-lg font-semibold mb-2">Live Preview</h2>

                    {isLoading && (
                        <div className="text-blue-500 flex items-center mb-2">
                            <span className="animate-spin mr-2">⟳</span>
                            Rendering...
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-4 flex items-start">
                            <AlertCircle className="mr-2 mt-1 flex-shrink-0" />
                            <pre className="whitespace-pre-wrap text-sm">{error}</pre>
                        </div>
                    )}

                    {!error && preview && (
                        <div className="border rounded p-4">
                            <div dangerouslySetInnerHTML={{ __html: preview }} />
                        </div>
                    )}

                    {!error && !preview && !isLoading && (
                        <div className="text-gray-500 flex items-center justify-center h-full">
                            <p>Preview will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}