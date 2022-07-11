import { strings } from 'app/localization/strings';

export class MoneyUtils {
    static format(amount?: Nullable<number>): string {
        return ((amount || 0)).toFixed(2);
    }

    static formatWithCurrency(amount?: Nullable<number>): string {
        return `${strings.currency}${this.format(amount)}`;
    }

    static toFloored(amount: number): number {
        return Math.floor(amount / 100);
    }

    static toCents(amount?: Nullable<number | string>): number {
        return Math.round(Number.parseFloat(`${amount || 0}`) * 100);
    }
}
