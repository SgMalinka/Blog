import { render, screen, fireEvent } from '@testing-library/react';
import { UpdatePost } from './index';
import React from 'react';

jest.mock('../ModalWindow', () => ({
    ModalWindow: ({ toggleModalWindow }: { toggleModalWindow: () => void }) => (
        <div data-testid="modal-window">
            Modal
            <button onClick={toggleModalWindow}>Close</button>
        </div>
    ),
}));

describe('UpdatePost', () => {
    it('renders update button if author', () => {
        render(<UpdatePost postId="1" authorId="1" currentUserId="1" title="t" content="c" />);
        expect(screen.getByText('Update Post')).toBeInTheDocument();
    });

    it('does not render if not author', () => {
        render(<UpdatePost postId="1" authorId="1" currentUserId="2" title="t" content="c" />);
        expect(screen.queryByText('Update Post')).not.toBeInTheDocument();
    });

    it('opens modal when update button is clicked', () => {
        render(<UpdatePost postId="1" authorId="1" currentUserId="1" title="t" content="c" />);
        fireEvent.click(screen.getByText('Update Post'));
        expect(screen.getByTestId('modal-window')).toBeInTheDocument();
    });

    it('closes modal when close button is clicked', () => {
        render(<UpdatePost postId="1" authorId="1" currentUserId="1" title="t" content="c" />);
        fireEvent.click(screen.getByText('Update Post'));
        fireEvent.click(screen.getByText('Close'));
        expect(screen.queryByTestId('modal-window')).not.toBeInTheDocument();
    });
});
