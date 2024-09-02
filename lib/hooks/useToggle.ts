import { useState, useCallback } from 'react';

export function useToggle(initialState: boolean) {
	const [state, setState] = useState(initialState);

	const toggle = useCallback(
		() => setState((currentState) => !currentState),
		[]
	);

	const setTrue = useCallback(() => setState(true), []);
	const setFalse = useCallback(() => setState(false), []);

	return [state, toggle, setState, setTrue, setFalse] as const;
}
