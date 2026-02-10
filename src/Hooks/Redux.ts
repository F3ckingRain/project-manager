import store from '../Store';
import { shallowEqual, type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/** Типизированный селектор приложения. */
export const useAppSelector: TypedUseSelectorHook<typeof store> = useSelector;

/** Типизированный селектор приложения с глубоким сравнением. */
export function useAppShallowSelector<R = unknown> (selector: (state: typeof store) => R): R {
    return useAppSelector<R>(selector, shallowEqual);
}

/** Типизированный диспатч приложения. */
export const useAppDispatch: () => typeof store.dispatch = useDispatch;