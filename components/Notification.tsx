
import React, { useState, useEffect } from 'react';

interface NotificationProps {
    message: string | null;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 2700); // hide slightly before the 3s timeout in App.tsx
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div
            className={`fixed top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 transform
                ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        >
            {message}
        </div>
    );
};

export default Notification;
