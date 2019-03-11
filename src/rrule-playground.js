import { RRule, RRuleSet, rrulestr } from 'rrule'

export default function() {
  const rule = new RRule({
    freq: RRule.WEEKLY,
    count: 5,
    byweekday: [RRule.MO, RRule.FR],
    dtstart: new Date(Date.UTC(2012, 1, 1, 10, 30)),
    until: new Date(Date.UTC(2012, 11, 3))
  });

  console.log(rule);

  const dates = rule.all();

  dates.forEach(date => {
    console.log(date);
  });
}