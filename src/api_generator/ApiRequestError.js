
export default class ApiRequestError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
