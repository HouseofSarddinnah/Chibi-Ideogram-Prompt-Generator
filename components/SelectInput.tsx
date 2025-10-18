import React from 'react';
import { Option } from '../types';

interface SelectInputProps {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    disabled?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, id, value, onChange, options, disabled = false }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;