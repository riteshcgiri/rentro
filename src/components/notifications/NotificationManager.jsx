import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './Notification';
import { removeNotification } from '../../redux/slices/notificationSlice';

const NotificationManager = () => {
    const notifications = useSelector((state) => state.notificationSlice);
    const dispatch = useDispatch();

    return (
        <div className="fixed items-end top-5 right-5 flex flex-col space-y-3 z-50">
            {[...notifications].map((n) => (
                <Notification
                    key={n.id}
                    {...n}
                    onClose={(id) => dispatch(removeNotification(id))}
                />
            ))}
        </div>

    );
};

export default NotificationManager;
