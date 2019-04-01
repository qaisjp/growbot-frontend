import {RRule} from "rrule/dist/esm/src/index";

export default function (
    startDate,
    repetitionQuantity,
    repetitionUnit,
    repetitionEnd,
    date,
    occurances,
    checkedMonday,
    checkedTuesday,
    checkedWednesday,
    checkedThursday,
    checkedFriday,
    checkedSaturday,
    checkedSunday
) {
    let freq = null;
    if (repetitionUnit === "Seconds") {
        freq = RRule.SECONDLY;
    } else if (repetitionUnit === "Minutes") {
        freq = RRule.MINUTELY;
    } else if (repetitionUnit === "Hours") {
        freq = RRule.HOURLY;
    } else if (repetitionUnit === "Days") {
        freq = RRule.DAILY;
    } else if (repetitionUnit === "Weeks") {
        freq = RRule.WEEKLY;
    } else if (repetitionUnit === "Months") {
        freq = RRule.MONTHLY;
    } else if (repetitionUnit === "Years") {
        freq = RRule.YEARLY;
    }

    const interval = repetitionQuantity;
    const dtend = date;
    const count = occurances;

    const byweekdays = [];
    if (checkedMonday) {
        byweekdays.push(RRule.MO);
    }
    if (checkedTuesday) {
        byweekdays.push(RRule.TU);
    }
    if (checkedWednesday) {
        byweekdays.push(RRule.WE);
    }
    if (checkedThursday) {
        byweekdays.push(RRule.TH);
    }
    if (checkedFriday) {
        byweekdays.push(RRule.FR);
    }
    if (checkedSaturday) {
        byweekdays.push(RRule.SA);
    }
    if (checkedSunday) {
        byweekdays.push(RRule.SU);
    }

    if (repetitionEnd === "never") {
        return {
            freq: freq,
            interval: interval,
            byweekday: byweekdays,
            dtstart: startDate
        };
    } else if (repetitionEnd === "on") {
        return {
            freq: freq,
            interval: interval,
            byweekday: byweekdays,
            dtstart: startDate,
            until: dtend
        };
    }
    return {
        freq: freq,
        interval: interval,
        count: count,
        byweekday: byweekdays,
        dtstart: startDate
    };
}
