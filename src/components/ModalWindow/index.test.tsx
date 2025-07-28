import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ModalWindow } from './index';
import React from 'react';

const mockDispatch = jest.fn();
const mockPush = jest.fn();
const mockToggle = jest.fn();

jest.mock('@/hooks', () => ({
    useAppDispatch: () => mockDispatch,
    useAppSelector: () => ({ uid: '1', userName: 'Test', photoURL: 'test.png' }),
}));
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
}));

describe('ModalWindow', () => {
    beforeEach(() => {
        mockDispatch.mockClear();
        mockPush.mockClear();
        mockToggle.mockClear();
    });

    it('renders form fields', () => {
        render(<ModalWindow actionType="create" toggleModalWindow={mockToggle} />);
        expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Content')).toBeInTheDocument();
    });

    it('shows validation errors on empty submit', async () => {
        render(<ModalWindow actionType="create" toggleModalWindow={mockToggle} />);
        fireEvent.click(screen.getByText('Create'));
        expect(await screen.findByText('Title must be at least 3 characters')).toBeInTheDocument();
        expect(
            await screen.findByText('Content must be at least 10 characters'),
        ).toBeInTheDocument();
    });

    it('calls toggleModalWindow on close', () => {
        render(<ModalWindow actionType="create" toggleModalWindow={mockToggle} />);
        fireEvent.click(screen.getByText('Close'));
        expect(mockToggle).toHaveBeenCalled();
    });

    it('submits valid form and calls dispatch', async () => {
        render(<ModalWindow actionType="create" toggleModalWindow={mockToggle} />);
        fireEvent.change(screen.getByPlaceholderText('Title'), {
            target: { value: 'Valid Title' },
        });
        fireEvent.change(screen.getByPlaceholderText('Content'), {
            target: { value: 'Valid content for post.' },
        });
        fireEvent.click(screen.getByText('Create'));
        await waitFor(() => expect(mockDispatch).toHaveBeenCalled());
        await waitFor(() => expect(mockToggle).toHaveBeenCalled());
        await waitFor(() => expect(mockPush).toHaveBeenCalled());
    });
});
