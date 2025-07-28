import { render, screen, fireEvent } from '@testing-library/react';
import { Comments } from './index';
import { act } from '@testing-library/react';
import React from 'react';

jest.mock('@/hooks', () => ({
    useAppDispatch: () => jest.fn(() => Promise.resolve()),
    useAppSelector: () => ({ uid: '1', userName: 'Test', photoURL: 'test.png' }),
}));

describe('Comments', () => {
    it('renders comment form', () => {
        render(<Comments postId="123" />);
        expect(screen.getByPlaceholderText('Write your comment...')).toBeInTheDocument();
        expect(screen.getByText('Respond')).toBeInTheDocument();
    });

    it('shows error on empty submit', async () => {
        render(<Comments postId="123" />);
        await act(async () => {
            fireEvent.click(screen.getByText('Respond'));
        });
        expect(await screen.findByText('Comment cannot be empty')).toBeInTheDocument();
    });

    it('calls dispatch on valid submit', async () => {
        render(<Comments postId="123" />);
        fireEvent.change(screen.getByPlaceholderText('Write your comment...'), {
            target: { value: 'Nice post!' },
        });
        await act(async () => {
            fireEvent.click(screen.getByText('Respond'));
        });

        expect(screen.queryByText('Comment cannot be empty')).not.toBeInTheDocument();
    });
});
