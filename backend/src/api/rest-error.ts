export type RestError = {
    messageToken?: string, // generalized message
    inputsTokens?: {
        [input: string]: string
    } // inputs messages
};
