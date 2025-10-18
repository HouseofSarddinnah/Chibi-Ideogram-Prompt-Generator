
import React from 'react';

interface OutputDisplayProps {
    prompts: string[];
    onClear: () => void;
    showNotification: (message: string) => void;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ prompts, onClear, showNotification }) => {
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Prompt copied! 💄');
        }).catch(() => {
            showNotification('Could not copy to clipboard.');
        });
    };
    
    const copyWithNewline = (text: string) => {
        navigator.clipboard.writeText(text + '\n').then(() => {
            showNotification('Prompt copied with newline! ✨');
        });
    };

    const copyAll = () => {
        if (prompts.length === 0) return;
        const all = prompts.join('\n\n');
        copyToClipboard(all);
    };

    const downloadFile = (content: string, fileName: string, contentType: string) => {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadTxt = () => {
        if (prompts.length === 0) return;
        const content = prompts.join('\n\n---\n\n');
        downloadFile(content, 'chibi_prompts.txt', 'text/plain;charset=utf-8');
        showNotification('Downloaded as TXT! 📁');
    };

    const downloadCSV = () => {
        if (prompts.length === 0) return;
        const header = ['prompt'];
        const rows = prompts.map(p => [`"${p.replace(/"/g, '""')}"`]);
        const csvContent = [header.join(','), ...rows.map(r => r.join(','))].join('\n');
        downloadFile(csvContent, 'chibi_prompts.csv', 'text/csv;charset=utf-8');
        showNotification('Downloaded as CSV! 📊');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg text-gray-800">🔎 Preview & Output</h3>
                {prompts.length > 0 && (
                    <button onClick={onClear} className="px-3 py-1 rounded border text-xs text-gray-600 hover:bg-gray-100 transition-colors">Clear</button>
                )}
            </div>

            <div id="promptContainer" className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                {prompts.length === 0 ? (
                    <div className="text-sm text-gray-500 p-4 bg-gray-50 rounded-md">
                        Click "Generate Prompt" to see the magic happen!
                    </div>
                ) : (
                    prompts.map((prompt, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                            <div className="text-xs text-gray-500 mb-2 font-medium">Prompt #{index + 1}</div>
                            <p className="whitespace-pre-wrap text-sm text-gray-700 mb-3 break-words">{prompt}</p>
                            <div className="flex gap-2 flex-wrap">
                                <button onClick={() => copyToClipboard(prompt)} className="px-3 py-1 text-xs rounded border bg-white hover:bg-gray-100 transition-colors">Copy</button>
                                <button onClick={() => copyWithNewline(prompt)} className="px-3 py-1 text-xs rounded border bg-white hover:bg-gray-100 transition-colors">Copy + Newline</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {prompts.length > 0 && (
                 <div className="flex gap-2 mt-4 flex-wrap">
                    <button onClick={downloadTxt} className="px-3 py-2 rounded bg-pink-600 text-white text-sm hover:bg-pink-700 transition-colors">Download .txt</button>
                    <button onClick={downloadCSV} className="px-3 py-2 rounded border bg-white text-sm hover:bg-gray-50 transition-colors">Download .csv</button>
                    <button onClick={copyAll} className="px-3 py-2 rounded border bg-white text-sm hover:bg-gray-50 transition-colors">Copy all</button>
                </div>
            )}
             <div className="mt-4 text-xs text-gray-600 p-3 bg-pink-50 rounded-md">
                <strong>Tip:</strong> Paste the generated prompt into Ideogram or your preferred AI image generator for stunning chibi results!
            </div>
        </div>
    );
};

export default OutputDisplay;
