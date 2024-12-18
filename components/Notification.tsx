'use client';

import { BellIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import noti from '../assets/notification.png';

export type Notification = {
  id: number;
  title: string;
  text: string;
  read: boolean;
};

export default function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notiRef.current && !notiRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:8080/vip/notifications');
        if (!response.ok) throw new Error('Failed to fetch notifications');
        const data: Notification[] = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const markAllAsRead = async () => {
    try {
      await fetch('http://localhost:8080/vip/notifications', {
        method: 'PATCH',
      });
      setNotifications(
        notifications.map((notification) => ({ ...notification, read: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const deleteAll = async () => {
    try {
      await fetch('http://localhost:8080/vip/notifications', {
        method: 'DELETE',
      });
      setNotifications([]);
    } catch (error) {
      console.error('Error deleting all notifications:', error);
    }
  };

  return (
    <div className='relative inline-block' ref={notiRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='relative p-2 hover:text-[#3F6886] focus:outline-none'
      >
        <BellIcon className='h-6 w-6' />
        {notifications.filter((notification) => !notification.read).length >
          0 && (
          <span className='absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full'>
            {notifications.filter((notification) => !notification.read).length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50'>
          <div className='flex items-center justify-between px-4 py-2 border-b'>
            <span className='font-semibold text-gray-700'>알림</span>
            <div className='space-x-2'>
              <button
                onClick={markAllAsRead}
                className='text-sm text-blue-500 hover:underline'
              >
                전체 읽음
              </button>
              <button
                onClick={deleteAll}
                className='text-sm text-blue-500 hover:underline'
              >
                전체 삭제
              </button>
            </div>
          </div>

          <div className='max-h-60 overflow-y-auto'>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex px-4 py-3 border-b ${
                    notification.read ? 'bg-gray-100' : 'bg-white'
                  }`}
                >
                  <Image src={noti} alt='nav_noti' className='w-6 h-6 mr-3' />
                  <div>
                    <p className='text-sm text-gray-700'>
                      {notification.title}
                    </p>
                    <span className='text-xs text-gray-500'>
                      {notification.text}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className='p-4 text-center text-gray-500'>알림 없음</div>
            )}
          </div>

          <div className='px-4 py-2 text-center border-t'></div>
        </div>
      )}
    </div>
  );
}
