import React, { useState } from 'react';
import Notification from './Notification';

let idCounter = 0;

const NotificationManager = () => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = 'info') => {
        const id = idCounter++;
        setNotifications((prev) => [...prev, { id, message, type }]);
    };

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <div className="fixed top-10 right-10 z-50 flex flex-col items-end gap-2">
            {notifications.map((n) => (
                <Notification
                    key={n.id}
                    id={n.id}
                    message={n.message}
                    type={n.type}
                    onClose={removeNotification}
                />
            ))}
            {/* Testing Button */}
            <div className="mt-4">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={() => addNotification('This is an info notification', 'info')}
                >
                    Show Notification
                </button>
            </div>
        </div>
    );
};

export default NotificationManager;
