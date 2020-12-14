export function getMinDate() {
    const today = new Date().getFullYear()
    const date = new Date()
    date.setFullYear(today - 122)
    return date
}

export function getMaxDate() {
    return new Date()
}