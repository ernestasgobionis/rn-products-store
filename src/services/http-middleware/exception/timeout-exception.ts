export class TimeoutException extends Error {
    public readonly timeout = true;

    constructor() {
        super('Request timed out.');
    }
}
