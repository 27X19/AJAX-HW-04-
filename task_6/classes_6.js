export {FormParams, LastResponseStorage}

class FormParams {
    _num = 1;
    _limit = 1;
    _hasBrokenRules = false;
    _message = '';

    constructor(num, limit) {
        this._num = parseInt(num);
        this._limit = parseInt(limit);

        this.checkRules();
    }

    checkRules() {

        const isBadNum = isNaN(this._num) || this._num < 1 || this._num > 10;
        const isBadLimit = isNaN(this._limit) || this._limit < 1 || this._limit > 10;

        if (isBadNum && isBadLimit) {

            this.setBrokenRule('Номер страницы и лимит вне диапазона от 1 до 10');
            return;

        } else if (isBadNum) {

            this.setBrokenRule('Номер страницы вне диапазона от 1 до 10');
            return;

        } else if (isBadLimit) {

            this.setBrokenRule('Лимит вне диапазона от 1 до 10');
            return;
        }
    }

    setBrokenRule(text) {
        this._hasBrokenRules = true;
        this._message = text;
    }

    getHasBrokenRules() {
        return this._hasBrokenRules;
    }

    getMessage() {
        return this._message;
    }

    getNum() {
        return this._num;
    }

    getLimit() {
        return this._limit;
    }
}

class LastResponseStorage {
    static save(value) {
        window.localStorage.setItem('LastResponse_data', JSON.stringify(value));
    }

    static getData() {
        let data = null;

        const json_data = window.localStorage.getItem('LastResponse_data');
        if (json_data) {
            data = JSON.parse(json_data);
        }

        return data;
    }
}
