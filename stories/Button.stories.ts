import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the button if true',
      defaultValue: false,
    },
    onClick: { action: 'clicked' },
  },
};

export const Reserve: StoryObj<typeof meta> = {
  args: {
    type: 'submit',
    text: '예약하기',
    className: 'bg-gray-300 hover:bg-gray-400 hover:text-white',
  },
};

export const Cancel: StoryObj<typeof meta> = {
  args: {
    type: 'button',
    text: '신청 취소',
    className: 'bg-gray-300 hover:bg-gray-400 hover:text-white',
    onClick: () => {
      alert('취소되었습니다.');
    },
  },
};

export const Submit: StoryObj<typeof meta> = {
  args: {
    type: 'submit',
    text: '목록으로',
    className: 'bg-[#3F6886] hover:bg-[#2c4a5f] hover:text-white',
  },
};

export const LogIn: StoryObj<typeof meta> = {
  args: {
    type: 'submit',
    text: '로그인',
    className:
      'bg-[#F2F9FF] w-full h-16 rounded-lg text-lg font-medium hover:opacity-80 mb-5 border border-[#B4B4B4] shadow-[2px_2px_0px_rgba(0,0,0,0.25)]',
    disabled: false,
  },
};

export const LogOut: StoryObj<typeof meta> = {
  args: {
    type: 'button',
    text: '로그아웃',
    className:
      'h-10 px-4 py-2 my-4 mx-7 bg-gray-300 hover:bg-gray-400 hover:text-white',
    onClick: () => {
      console.log('로그아웃');
    },
  },
};

export const PBModal_reserve: StoryObj<typeof meta> = {
  args: {
    type: 'button',
    text: '상담 예약',
    className: 'h-10 px-4 py-2 bg-gray-300 hover:bg-gray-400',
    onClick: () => {
      console.log('상담 예약으로 이동');
    },
  },
};

export const PBModal_backToMain: StoryObj<typeof meta> = {
  args: {
    type: 'button',
    text: '메인으로',
    className:
      'h-10 px-4 py-2 bg-slate-600 text-white hover:bg-slate-500 hover:text-white',
    onClick: () => {},
  },
};

export default meta;
