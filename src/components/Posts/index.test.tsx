import { render, screen, waitFor } from '@testing-library/react';
import { Posts } from './index';
import React from 'react';

interface FirestoreDoc {
    id: string;
    data: () => Record<string, unknown>;
}
interface FirestoreSnapshot {
    docs: FirestoreDoc[];
}

type OnSnapshotCallback = (snapshot: FirestoreSnapshot) => void;

jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    onSnapshot: (query: unknown, cb: OnSnapshotCallback) => {
        cb({
            docs: [
                {
                    id: '1',
                    data: () => ({
                        title: 'Post 1',
                        content: 'Content 1',
                        createdAt: '2023-01-01T00:00:00Z',
                        author: { name: 'Author 1', photoURL: 'img1.png' },
                        comments: [],
                    }),
                },
            ],
        });
        return () => {};
    },
    query: jest.fn(),
    orderBy: jest.fn(),
}));

jest.mock('./components/Details', () => ({
    Details: (props: { title: string }) => <div data-testid="details">{props.title}</div>,
}));

describe('Posts', () => {
    it('renders posts from snapshot', async () => {
        render(<Posts />);
        await waitFor(() => expect(screen.getByTestId('details')).toBeInTheDocument());
        expect(screen.getByText('Post 1')).toBeInTheDocument();
    });
});
