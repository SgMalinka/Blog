import { render, screen } from '@testing-library/react';
import { Details } from './index';
import React from 'react';
import type { ImageProps } from 'next/image';

jest.mock('@/core/utils', () => ({
    getTimeAgo: () => '1 hour ago',
}));

jest.mock('next/image', () => (props: ImageProps) => {
    const { src, width, height, className } = props;
    return (
        <img
            src={typeof src === 'string' ? src : ''}
            alt="mocked"
            width={width}
            height={height}
            className={className}
        />
    );
});

describe('Details', () => {
    it('renders author, title, content, and time ago', () => {
        render(
            <Details
                title="Test Title"
                content="Test content for details."
                createdAt="2023-01-01T00:00:00Z"
                authorName="Author Name"
                authorImage="img.png"
            />,
        );
        expect(screen.getByText('Author Name')).toBeInTheDocument();
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test content for details.')).toBeInTheDocument();
        expect(screen.getByText('1 hour ago')).toBeInTheDocument();
        expect(screen.getByAltText('mocked')).toBeInTheDocument();
    });
});
