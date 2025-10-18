
import React from 'react';

interface TextInputProps {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, id, value, onChange, placeholder }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
            <input
                type="text"
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 transition"
            />
        </div>
    );
};

export default TextInput;
