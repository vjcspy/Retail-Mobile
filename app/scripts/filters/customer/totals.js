/**
 * Created by vjcspy on 16/04/2016.
 */

'use strict';
app.filter('orderTotals', function () {
  return function (orders, field) {
    field = field || 'grand_total';
    var totals = 0;
    $.each(orders, function (k, v) {
      console.log(v[field]);
      totals += parseFloat(v[field]);
    });
    return totals.toFixed(2);
  }
});
