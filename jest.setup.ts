import '@testing-library/jest-dom';
import fetch, { Headers, Request, Response } from 'cross-fetch';

/* global jest */

if (!globalThis.fetch) {
    globalThis.fetch = fetch;
    globalThis.Headers = Headers;
    globalThis.Request = Request;
    globalThis.Response = Response;
}

jest.mock('firebase/app', () => ({
    __esModule: true,
    initializeApp: jest.fn(() => ({})),
}));
jest.mock('firebase/firestore', () => ({
    __esModule: true,
    getFirestore: jest.fn(() => ({})),
    collection: jest.fn(),
    getDocs: jest.fn(),
    addDoc: jest.fn(),
    doc: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
    onSnapshot: jest.fn(),
    query: jest.fn(),
    orderBy: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
    __esModule: true,
    getAuth: jest.fn(() => ({})),
}));
