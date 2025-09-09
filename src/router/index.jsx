import {createBrowserRouter} from "react-router-dom";
import CommonLayout from "@/layouts/common.layout";

import Main from "@/pages/main";

const router = createBrowserRouter([
    {
        element: <CommonLayout />,
        children: [
            // 메인
            { index: true, element: <Main /> },
        ]
    }
]);

export default router;