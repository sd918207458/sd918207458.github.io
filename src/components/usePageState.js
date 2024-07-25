import { useState, useEffect, useRef } from 'react';

const usePageState = (initialState) => {
    const [state, setState] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem('pageState'));
        return savedState || initialState;
    });
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        localStorage.setItem('pageState', JSON.stringify(state));
    }, [state]);

    return [state, setState];
};

export default usePageState;
