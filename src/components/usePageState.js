import { useState, useCallback } from 'react';

const usePageState = (initialState) => {
    const [state, setState] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem('pageState'));
        return savedState || initialState;
    });

    const savePageState = useCallback(() => {
        localStorage.setItem('pageState', JSON.stringify(state));
    }, [state]);

    return [state, setState, savePageState];
};

export default usePageState;
