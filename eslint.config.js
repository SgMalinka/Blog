import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jest from 'eslint-plugin-jest';

export default [
    js.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
        },
    },
    {
        files: ['**/*.{js,ts,jsx,tsx}'],
        ignores: ['node_modules', 'dist', 'build', '.next'],
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                React: true,
                document: true,
                window: true,
                process: true,
                console: true,
                localStorage: true,
                fetch: true,
                URL: true,
                HTMLSelectElement: true,
                HTMLInputElement: true,
                HTMLTextAreaElement: true,
                setTimeout: true,
                HTMLDivElement: true,
                Node: true,
                MouseEvent: true,
                Response: true,
                Request: true,
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
        },
        rules: {
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'no-undef': 'error',
        },
    },
    {
        files: ['**/*.test.{js,ts,jsx,tsx}'],
        plugins: {
            jest,
        },
        languageOptions: {
            globals: {
                describe: true,
                it: true,
                test: true,
                expect: true,
                beforeEach: true,
                afterEach: true,
                jest: true,
            },
        },
        rules: {
            ...jest.configs.recommended.rules,
        },
    },
    {
        files: ['**/enum/*.ts'],
        rules: {
            'no-unused-vars': 'off',
        },
    },
];
