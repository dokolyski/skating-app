import * as PATH from 'assets/config/url.json';

/**
 * @description Server side redirect to main page url
 */
export function redirectToMain() {
    window.location.href = PATH.EVERYONE.MAIN;
}