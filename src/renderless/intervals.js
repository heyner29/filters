import { compareAsc, parse } from 'date-fns';

export default {
    props: {
        format: {
            type: String,
            default: 'd-m-Y',
        },
    },

    data: () => ({
        interval: {
            min: null,
            max: null,
        },
    }),

    computed: {
        alternateFormat() {
            return this.format.replace('d', 'dd')
                .replace('m', 'MM')
                .replace('Y', 'yyyy');
        },
        sanitizedInterval() {
            return {
                min: this.interval.min || null,
                max: this.interval.max || null,
            };
        },
        parsedMax() {
            return parse(this.interval.max, this.alternateFormat, new Date());
        },
        parsedMin() {
            return parse(this.interval.min, this.alternateFormat, new Date());
        },
        equals() {
            return !!this.interval.min
                && !!this.interval.max
                && compareAsc(this.parsedMin, this.parsedMax) === 0;
        },
    },
};