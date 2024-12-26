'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function SignupCard() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function signinCheck(formData: FormData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const pw = formData.get('pw');
    const pwCheck = formData.get('pwCheck');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
    const phoneRegex =
      /^(01[0|1|6|7|8|9])[-]?\d{3,4}[-]?\d{4}$|^(0\d{1,2})[-]?\d{3,4}[-]?\d{4}$/;
    const addressRegex = /^[가-힣0-9\s\-,.]+$/;

    if (!name || !email || !pw || !pwCheck || !phone || !address) {
      setErrorMsg('입력을 확인해주세요.');
      return;
    }

    if (pw !== pwCheck) {
      setErrorMsg('비밀번호를 다시 한 번 확인해주세요.');
      return;
    }

    if (name.toString().length < 2 || name.toString().length > 20) {
      setErrorMsg('이름을 다시 한 번 확인해주세요.');
      return;
    }
    if (!emailRegex.test(email.toString())) {
      setErrorMsg('이메일 형식이 맞지 않습니다.');
      return;
    }

    if (!passwordRegex.test(pw.toString())) {
      setErrorMsg(
        '비밀번호는 영어 대소문자, 숫자, $@$!%*#?& 기호 중 하나 이상 포함된 8~20자이어야 합니다.'
      );
      return;
    }
    if (!phoneRegex.test(phone.toString())) {
      setErrorMsg('연락처 형식이 맞지 않습니다.');
      return;
    }
    if (!addressRegex.test(address.toString())) {
      setErrorMsg('주소 형식이 맞지 않습니다.');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/vip/signup`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // JSESSIONID 포함
          body: JSON.stringify({
            name,
            email,
            password: pw,
            tel: phone,
            address,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Invalid credentials');
      }
    } catch (error) {
      setErrorMsg('회원가입에 실패했습니다. 다시 시도해 주세요.');
      console.error('🚀 ~ handleSubmit error:', error);
    }
    alert('회원가입 성공!');
    router.push('/signin');
  }

  return (
    <div className='flex flex-col items-center p-20'>
      <div className='w-2/5'>
        <div className='border-b border-gray-400 mb-8 w-full pb-8'>
          <h1 className='text-3xl font-extrabold mb-3'>회원가입</h1>
          <p className='text-lg font-medium'>
            로그인을 통해 VIP만을 위한 간편한 비대면 PB 상담을 경험해 보세요!
          </p>
        </div>
        <form action={signinCheck} className='flex flex-col gap-6 w-full'>
          <div>
            <Label>성함</Label>
            <Input
              type='text'
              name='name'
              placeholder='성함을 입력하세요.'
              className='w-full h-14 p-3 mt-2 font-medium border border-gray-400 rounded-lg focus-within:#F2F9FF focus-within:ring-2 focus-within:#F2F9FF'
            />
          </div>
          <div>
            <Label>아이디(이메일)</Label>
            <Input
              name='email'
              placeholder='이메일을 입력하세요.'
              className='  w-full h-14 p-3 mt-2 font-medium border border-gray-400 rounded-lg focus-within:#F2F9FF focus-within:ring-2 focus-within:#F2F9FF'
            />
          </div>
          <div>
            <Label>비밀번호</Label>
            <Input
              type='password'
              name='pw'
              placeholder='비밀번호를 입력하세요.'
              className='  w-full h-14 p-3 mt-2 font-medium border border-gray-400 rounded-lg focus-within:#F2F9FF focus-within:ring-2 focus-within:#F2F9FF'
            />
          </div>
          <div>
            <Label>비밀번호 확인</Label>
            <Input
              type='password'
              name='pwCheck'
              placeholder='비밀번호를 다시 입력하세요.'
              className='  w-full h-14 p-3 mt-2 font-medium border border-gray-400 rounded-lg focus-within:#F2F9FF focus-within:ring-2 focus-within:#F2F9FF'
            />
          </div>
          <div>
            <Label>연락처</Label>
            <Input
              type='tel'
              name='phone'
              placeholder='연락처를 입력하세요.'
              className='  w-full h-14 p-3 mt-2 font-medium border border-gray-400 rounded-lg focus-within:#F2F9FF focus-within:ring-2 focus-within:#F2F9FF'
            />
          </div>
          <div>
            <Label>주소</Label>
            <Input
              name='address'
              placeholder='주소를 입력하세요.'
              className='  w-full h-14 p-3 mt-2 font-medium border border-gray-400 rounded-lg focus-within:#F2F9FF focus-within:ring-2 focus-within:#F2F9FF'
            />
          </div>

          {errorMsg && <div className='text-red-600 mb-3'>{errorMsg}</div>}

          <button
            type='submit'
            className='bg-[#F2F9FF] w-full h-16 rounded-lg text-lg font-medium hover:opacity-80 mb-5 border border-[#B4B4B4] shadow-[2px_2px_0px_rgba(0,0,0,0.25)]'
          >
            회원가입 완료
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupCard;
