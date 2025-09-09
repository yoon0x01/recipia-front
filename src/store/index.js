import {create} from 'zustand';
import {persist} from 'zustand/middleware';

// region -- 인증 정보
const initialAuthState = {
    isLogin: false,
    token: null,
};

export const useAuthStore = create(
    persist(
        (set) => ({
            ...initialAuthState,
            setAuth: (auth) => set((state) => ({ ...state, ...auth })),
            resetAuth: () => set({ ...initialAuthState }),
        }),
        { name: 'auth' }
    )
);
// endregion
