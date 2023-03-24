import useValidator from "../../../hook/validate"
function FormProductProperty(value, action = false) {
    return useValidator(value, [
        useValidator.isRequired("property_name", "Tên Thuộc Tính không được bỏ trống"),
    ])
}

export const schemas = {
    property_name: ""
};

export default FormProductProperty;