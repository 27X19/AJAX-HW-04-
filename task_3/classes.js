export { LastVisit, LastVisitStorage, formatDate, formatTime };

class LastVisit {
    _name = '';
    _time = 0;

    constructor(name = '', time = 0) {
        this.setName(name);
        this.setTime(time);
    }

    getName() {
        return this._name;
    }

    setName(value) {
        this._name = value.trim() || 'Аноним';
    }

    getTime() {
        return this._time;
    }

    setTime(value) {
        if (typeof value === 'string') value = parseInt(value, 10);
        if (!isNaN(value) && typeof value === 'number') {
            this._time = value;
        }
    }

    setNow() {
        this._time = Date.now();
    }

    getDate() {
        return new Date(this._time);
    }

    isEmpty() {
        return this._time === 0;
    }

    setVisit(name) {
        this.setName(name);
        this.setNow();
    }

    clear() {
        this._name = '';
        this._time = 0;
    }
}

class LastVisitStorage {
    static save(value) {
        window.localStorage.setItem('LastVisit_name', value.getName());
        window.localStorage.setItem('LastVisit_time', value.getTime().toString());
    }

    static getLastVisit() {
        const name = window.localStorage.getItem('LastVisit_name') || '';
        const time = parseInt(window.localStorage.getItem('LastVisit_time'), 10) || 0;
        return new LastVisit(name, time);
    }
}

// Функция добавления нуля в начале (например, 05 вместо 5)
function padStart(value, n = 2) {
    return value.toString().padStart(n, '0');
}

// Форматирование даты в DD.MM.YYYY
function formatDate(date) {
    return `${padStart(date.getDate())}.${padStart(date.getMonth() + 1)}.${date.getFullYear()}`;
}

// Форматирование времени в HH:MM
function formatTime(date) {
    return `${padStart(date.getHours())}:${padStart(date.getMinutes())}`;
}
