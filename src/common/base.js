
export function getRevertSort(field) {
    if (String(field).includes("-")) {
        return String(field).replace("-", "");
    }
    return "-" + String(field);
}


export function hasSort(key, value) {
    return String(value).includes(key);
}

export function getSort(field) {
    if (String(field).includes("-")) {
        return "desc";
    }
    return "asc";
}