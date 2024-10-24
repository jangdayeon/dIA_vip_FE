'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {}, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <div className='w-full overflow-scroll text-red-500'>
        {error.stack || error.message}
      </div>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
