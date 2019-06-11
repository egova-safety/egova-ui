/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 *
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved.
 */

const menus = [
    {
        name: "intro",
        title: "概览",
        path: "/intro",
        icon: "pie-graph",
        visible: true,
        children: [
            {
                name: "test",
                title: "测试",
                path: "/test",
                visible: true,
                icon: "md-globe"
            }
        ]
    }
];

export default menus;
