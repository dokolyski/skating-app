/**
 * @description Returns minimum application date
 * @returns current date with year decreased by 122
 */
export function getMinDate(): Date {
    const today = new Date().getFullYear();
    const date = new Date();
    date.setFullYear(today - 122);
    return date;
}

/**
 * @description Returns maximum application date
 * @returns current date
 */
export function getMaxDate(): Date {
    return new Date();
}
