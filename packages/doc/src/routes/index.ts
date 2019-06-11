/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 *
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved.
 */

const routes = [
    {
        name: "main",
        path: "/",
        redirect: "/test",
        title: "首页",
        component: () => import("@s/views/dashboard"),
        children: [
            {
                path: "/test",
                component: () => import("@s/views/test")
            }
        ]
    }
];

export default routes;
