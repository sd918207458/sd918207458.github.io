import { useState, useEffect } from 'react';

const usePageState = (initialState) => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        const savedState = JSON.parse(localStorage.getItem('loginPageState'));
        if (savedState) {
            setState(savedState);
        }
        return () => {
            localStorage.removeItem('loginPageState');
        };
    }, []);

    const savePageState = () => {
        localStorage.setItem('loginPageState', JSON.stringify(state));
    };

    useEffect(() => {
        savePageState();
    }, [state]);

    return [state, setState, savePageState];
};

export default usePageState;
