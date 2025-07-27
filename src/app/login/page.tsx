'use client';

import { auth } from '@/core/lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';

import s from './index.module.scss';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const token = await result.user.getIdToken();

        await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ token }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        router.push('/blog');
    };

    return (
        <div className={s.login}>
            <button onClick={handleLogin} className={s.login__btn}>
                Login with Google
            </button>
        </div>
    );
}
