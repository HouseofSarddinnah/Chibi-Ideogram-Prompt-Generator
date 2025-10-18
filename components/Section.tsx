
import React from 'react';

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
    return (
        <section className="bg-white/80 backdrop-blur-sm p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
            {children}
        </section>
    );
};

export default Section;
