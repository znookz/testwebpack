# Datetime range input UI element

This directive is designed to provide easy and intuitive input of moment.js datetime objects.

Typically this can be used to represent a start and an end datetime object.  
Desgined to be as simple as possible to afford intuitive interactions, including scrolling.

Converted into an angular directive for your convenience :)

## Demo
Click <a href="https://rawgit.com/g1eb/angular-datetime-range/master/" target="_blank">here</a> for a live demo.

### Date range
[<img src="https://raw.githubusercontent.com/g1eb/angular-datetime-range/master/images/date_range.png" alt="Angular directive datetime range input - date range" width="300px">](https://rawgit.com/g1eb/angular-datetime-range/master/)

### Time range
[<img src="https://raw.githubusercontent.com/g1eb/angular-datetime-range/master/images/time_range.png" alt="Angular directive datetime range input - time range" width="300px">](https://rawgit.com/g1eb/angular-datetime-range/master/)

### Datetime range (collapsed state)
[<img src="https://raw.githubusercontent.com/g1eb/angular-datetime-range/master/images/datetime_range_collapsed.png" alt="Angular directive datetime range input - datetime range (collapsed)" width="300px">](https://rawgit.com/g1eb/angular-datetime-range/master/)

### Datetime range (expanded state)
[<img src="https://raw.githubusercontent.com/g1eb/angular-datetime-range/master/images/datetime_range_expanded.png" alt="Angular directive datetime range input - datetime range (expanded)" width="300px">](https://rawgit.com/g1eb/angular-datetime-range/master/)

## Install

1) Install 'angular-datetime-range' with bower

```
bower install angular-datetime-range
```

Or with npm:

```
npm install angular-datetime-range
```

2) Add 'g1b.datetime-range' module to your app config


```javascript
angular.module('myApp', [
  'g1b.datetime-range',
  ......
])
```

3) Use 'datetime-range' directive in a view

```html
<datetime-range start="start" end="end"></datetime-range>
```

## Attributes

|Property        | Usage           | Default  | Required |
|:------------- |:-------------|:-----:|:-----:|
| start | Start moment.js datetime object or a datetime string | none | yes |
| end | End moment.js datetime object or a datetime string | none | yes |
| presets | Array of preset ranges, click <a href="https://github.com/g1eb/angular-datetime-range#presets" target="_blank">here</a> for more info | none | no |
| min-date | moment.js datetime object min datetime | none | no |
| max-date | moment.js datetime object max datetime | none | no |
| on-change | Handler function that is fired on change of start and/or end datetime objects | none | no |
| on-change-start | Handler function that is fired on change of start datetime object | none | no |
| on-change-end | Handler function that is fired on change of end datetime object | none | no |
| on-close | Handler function that is fired on close of the edit popover | none | no |
| close-text | Close text shown in the button used to close edit popover | Close | no |

## Presets

You can provide any number of preset ranges for quick selection in edit view.  

Consider the following example with ranges of current week, month and year.
```
$scope.presets = [
  {
    'name': 'This Week',
    'start': moment().startOf('week').startOf('day'),
    'end': moment().endOf('week').endOf('day'),
  }, {
    'name': 'This Month',
    'start': moment().startOf('month').startOf('day'),
    'end': moment().endOf('month').endOf('day'),
  }, {
    'name': 'This Year',
    'start': moment().startOf('year').startOf('day'),
    'end': moment().endOf('year').endOf('day'),
  }
];
```

## Other input directives

If you are looking for other datetime input elements, check out [angular-datetime-inputs](https://github.com/g1eb/angular-datetime-inputs)

## Dependencies

* [AngularJS](https://angularjs.org/)
* [moment.js](http://momentjs.com/)
* [angular-scroll-events](https://github.com/g1eb/angular-scroll-events)
