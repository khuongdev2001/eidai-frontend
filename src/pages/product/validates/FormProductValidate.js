import useValidator from "../../../hook/validate";

const STATUS_ACTIVE = 1;
const STATUS_INACTIVE = 0;

function FormProductValidate(value, action = false) {
    return useValidator(value, [
        useValidator.isRequired("product_title", "Tên sản phẩm không được bỏ trống"),
        useValidator.isRequired("category_id", "Danh mục không được bỏ trống")
    ])
}

const schema = {
    product_title: "",
    product_slug: "",
    category_id: "",
    product_property: "",
    product_content: "",
    product_excerpt: "",
    images: [],
    price: 0,
    is_popular: 0,
    status: STATUS_ACTIVE
}

export { schema };
export default FormProductValidate;