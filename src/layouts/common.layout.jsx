import {useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";
import CommonHeader from "@/layouts/inc/header/common.header";
import CommonFooter from "@/layouts/inc/footer/common.footer";

export default function CommonLayout() {

    // Router
    const location = useLocation();

    // 페이지 이동시
    useEffect(() => {

        // 스크롤 최상단으로
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });

    }, [location.pathname]);

    return (
        <div>
            <CommonHeader />
            <Outlet />
            <CommonFooter />
        </div>
    )
}