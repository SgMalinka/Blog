import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Jest/ts-jest sanity', () => {
    it('renders JSX', () => {
        render(<div>hello</div>);
        expect(screen.getByText('hello')).toBeInTheDocument();
    });
});
