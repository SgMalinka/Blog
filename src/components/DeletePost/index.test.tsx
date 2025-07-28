import { render, screen, fireEvent } from '@testing-library/react';
import { DeletePost } from './index';

const mockDispatch = jest.fn();
const mockPush = jest.fn();

jest.mock('@/hooks', () => ({
    useAppDispatch: () => mockDispatch,
}));
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
}));

describe('DeletePost', () => {
    beforeEach(() => {
        mockDispatch.mockClear();
        mockPush.mockClear();
    });

    it('renders delete button if author', () => {
        render(<DeletePost postId="1" authorId="1" currentUserId="1" />);
        expect(screen.getByText('Delete Post')).toBeInTheDocument();
    });

    it('does not render if not author', () => {
        render(<DeletePost postId="1" authorId="1" currentUserId="2" />);
        expect(screen.queryByText('Delete Post')).not.toBeInTheDocument();
    });

    it('calls dispatch and router on click', () => {
        render(<DeletePost postId="1" authorId="1" currentUserId="1" />);
        fireEvent.click(screen.getByText('Delete Post'));
        expect(mockDispatch).toHaveBeenCalled();
        expect(mockPush).toHaveBeenCalled();
    });
});
