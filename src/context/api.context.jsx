import axios from 'axios';
import {createContext, useContext} from 'react';
import {useAuthStore} from "@/store/index.js";

const ApiContext = createContext(null);

export function ApiProvider({ children }) {

    const auth = useAuthStore();

    // axios 초기화
    const AxiosClient = axios.create();

    // Request 설정
    AxiosClient.interceptors.request.use(
        (config) => {
            // JWT 토큰 설정
            if (auth.isLogin) config.headers.Authorization = `Bearer ${auth.token}`;
            return config;
        }
    );

    // Response 설정
    AxiosClient.interceptors.response.use(
        (response) => {
            return response.data;
        },
        (error) => {
            throw "서버 호출을 실패 했습니다.";
        }
    );

    // 옵션 기본값
    const defaultOptions = {
        onError: null
    }

    // 요청 처리
    const request = async (method, url, params, options) => {
        options = { ...defaultOptions, ...options };

        const config = {
            baseURL: import.meta.env.VITE_API_HOST,
            url,
            method,
            timeout: 1000 * 30
        };

        if (method === "get" || method === "delete")    config.params = params;
        else                                            config.data = params;

        try {
            const response = await AxiosClient(config);

            if (response.status === 200) {
                return response;
            } else if ([300, 301].includes(response.status)) {
                // 인증 오류
            } else if(!!options.onError) {
                // 화면에서 오류 처리
                options.onError(response);
            } else {
                // 공통 오류 처리
            }

            return {};
        } catch (e) {
            if (!!options.onError) {
                // 화면에서 오류 처리
                options.onError({ status: 500, message: e });
            } else {
                // 공통 오류 처리
            }
        }
    }

    const value = {
        _get: (url, params, options) => {
            return request('get', url, params, options);
        },
        _post: (url, params, options) => {
            return request('post', url, params, options);
        },
        _patch: (url, params, options) => {
            return request('patch', url, params, options);
        },
        _delete: (url, params, options) => {
            return request('delete', url, params, options);
        }
    }

    return (
        <ApiContext.Provider value={ value }>
            { children }
        </ApiContext.Provider>
    );

}

export function useApi() {
    return useContext(ApiContext);
}