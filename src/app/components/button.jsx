'use client';

import { useRouter } from 'next/navigation';

export default function Button(props) {
  const router = useRouter();

  return (
    <button
      type={props.type || 'button'}
      className={`${props.className_} rounded-lg border-2`}
      onClick={() => router.push(props.pushTo)}
    >
      {props.text}
    </button>
  );
}
