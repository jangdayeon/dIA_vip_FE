'use client';

import { notificationsData } from '@/data/notificationsData';
import { BellIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useState } from 'react';
import noti from '../assets/notification.png';

export default function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  return (
    <div className='relative inline-block'>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='relative p-2 text-gray-700 hover:text-gray-900 focus:outline-none'
      >
        <BellIcon className='h-6 w-6' />
        {/* Notification count */}
        {notifications.filter((notification) => !notification.read).length >
          0 && (
          <span className='absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full'>
            {notifications.filter((notification) => !notification.read).length}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className='absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg'>
          {/* Header */}
          <div className='flex items-center justify-between px-4 py-2 border-b'>
            <span className='font-semibold text-gray-700'>알림</span>
            <div className='space-x-2'>
              <button
                onClick={markAllAsRead}
                className='text-sm text-blue-500 hover:underline'
              >
                전체 읽음
              </button>
              <button className='text-sm text-blue-500 hover:underline'>
                전체 삭제
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className='max-h-60 overflow-y-auto'>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-center px-4 py-3 border-b ${
                    notification.read ? 'bg-gray-100' : 'bg-white'
                  }`}
                >
                  <Image src={noti} alt='nav_noti' className='mr-3' />
                  <div>
                    <p className='text-sm text-gray-700'>{notification.text}</p>
                    <span className='text-xs text-gray-500'>
                      {notification.time}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className='p-4 text-center text-gray-500'>
                No notifications
              </div>
            )}
          </div>

          {/* Footer */}
          <div className='px-4 py-2 text-center border-t'>
            {/* <a href='#' className='text-sm text-blue-500 hover:underline'>
              See All
            </a> */}
          </div>
        </div>
      )}
    </div>
  );
}
