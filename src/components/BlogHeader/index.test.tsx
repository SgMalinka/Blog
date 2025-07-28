import { render, screen, fireEvent } from '@testing-library/react';
import { BlogHeader } from './index';

interface ModalWindowMockProps {
    toggleModalWindow: () => void;
}

jest.mock('../ModalWindow', () => ({
    ModalWindow: ({ toggleModalWindow }: ModalWindowMockProps) => (
        <div data-testid="modal-window">
            Modal
            <button onClick={toggleModalWindow}>Close</button>
        </div>
    ),
}));

describe('BlogHeader', () => {
    it('renders header and create button', () => {
        render(<BlogHeader />);
        expect(screen.getByText('Blog Posts')).toBeInTheDocument();
        expect(screen.getByText('Create post')).toBeInTheDocument();
    });

    it('opens modal when create button is clicked', () => {
        render(<BlogHeader />);
        fireEvent.click(screen.getByText('Create post'));
        expect(screen.getByTestId('modal-window')).toBeInTheDocument();
    });

    it('closes modal when close button is clicked', () => {
        render(<BlogHeader />);
        fireEvent.click(screen.getByText('Create post'));
        fireEvent.click(screen.getByText('Close'));
        expect(screen.queryByTestId('modal-window')).not.toBeInTheDocument();
    });
});
