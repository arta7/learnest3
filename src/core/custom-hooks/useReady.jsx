import { useState, useEffect } from "react";

export const useReady = (dep, initialState) => {
    const [state, set_state] = useState(initialState);
    useEffect(() => {
        if (dep) {
            set_state(dep)
        }
    }, [dep, state]);

    return [state, set_state]
};