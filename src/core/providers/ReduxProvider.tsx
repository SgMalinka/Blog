'use client';

import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/core/lib/firebase';
import { setUser, clearUser } from '@/store/userSlice';
import { Provider } from 'react-redux';
import { store } from '@/store';

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            console.log(user);

            if (user) {
                store.dispatch(
                    setUser({
                        uid: user.uid,
                        email: user.email,
                        userName: user.displayName,
                        photoURL: user.photoURL,
                    }),
                );
            } else {
                store.dispatch(clearUser());
            }
        });
        return () => unsubscribe();
    }, []);

    return <Provider store={store}>{children}</Provider>;
};
