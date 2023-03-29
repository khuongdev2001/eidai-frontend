const menuSidebar = [
    {
        name: "Sản phẩm",
        icon: "product-hunt",
        childrens: [
            {
                route: "/reactjs/product",
                name: "Danh sản phẩm"
            },
            {
                route: "/reactjs/product/category",
                name: "Danh sách danh mục"
            },
            {
                route: "/reactjs/product/property",
                name: "Danh sách thuộc tính"
            },
        ]
    },
    {
        name: "Slider",
        icon: "picture-o",
        childrens: [
            {
                name: "Thêm slider"
            },
            {
                name: "Danh sách slider"
            }
        ]
    },
    {
        name: "Bài Viết",
        icon: "newspaper-o",
        childrens: [
            {
                name: "Thêm bài viết"
            },
            {
                name: "Danh bài viết"
            }
        ]
    }
];

export { menuSidebar }