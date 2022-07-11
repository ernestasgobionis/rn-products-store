import moment from 'moment';

import 'moment/min/locales';
import { parameters } from 'app/constants/parameters';

moment.updateLocale('en-ie', {
    calendar: {
        lastDay: '[Yesterday at] LT',
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        lastWeek: 'dddd [at] LT',
        nextWeek: 'dddd [at] LT',
        sameElse: 'DD MMM YY',
    },
});

export class TimeUtils {
    static format(seconds: number): string {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;

        const minString = min > 9 ? min : `0${min}`;
        const secString = sec > 9 ? sec : `0${sec}`;

        return `${minString}:${secString}`;
    }

    static timestampInFuture(mins: number): number {
        const current = Math.floor(new Date().getTime() / 1000);

        return current + mins * 60;
    }

    static fromNow(date: string | Date) {
        return moment(date).calendar();
    }

    static getTimestamp(): number {
        return new Date().getTime();
    }

    static toStandardDate(date: string | Date): string {
        return this.toFormat(date, parameters.app.dateTimeFormatDateBirth);
    }

    static toLocalDate(date: string | Date): string {
        return this.toFormat(date, 'L');
    }

    static toLocalTime(date: Date): string {
        return this.toFormat(date, 'L | LT');
    }

    static toDateTime(date: string | Date): string {
        return this.toFormat(date, 'LLL');
    }

    static toISOFormat(date: string | Date): string {
        return this.toFormat(date, 'YYYY-MM-DDTHH:mm:ss.sssZ');
    }

    static toZuluString(date: string | Date): string {
        return `${this.toFormat(date, 'YYYY-MM-DDTHH:mm:ss')}Z`;
    }

    static toFormat(date?: string | Date, format = 'DD/MM/YYYY hh:mm'): string {
        if (moment(date).isValid()) {
            return moment(date).format(format);
        }

        return '';
    }

    static toTimeStamp(date: string): number {
        return Date.parse(date);
    }

    static formatUTC(date: Date): string {
        const yyyy = date.getFullYear();
        const mm = `0${date.getMonth() + 1}`.slice(-2);
        const dd = `0${date.getDate()}`.slice(-2);

        return `${yyyy}-${mm}-${dd}`;
    }

    static subDays(date: Date, amount: number) {
        const momentDate = moment(date);

        return momentDate.subtract(amount, 'd');
    }
}
