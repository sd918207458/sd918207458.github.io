import { useState } from 'react';

const usePageState = (initialState) => {
    const [state, setState] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem('pageState'));
        return savedState || initialState;
    });

    const savePageState = () => {
        localStorage.setItem('pageState', JSON.stringify(state));
    };

    return [state, setState, savePageState];
};

export default usePageState;
