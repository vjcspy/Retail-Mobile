/**
 * Created by vjcspy on 16/04/2016.
 */

'use strict';
app.filter('orderTotals', function () {
  return function (orders, field) {
    if (typeof orders != 'object')
      return 0;
    field = field || 'grand_total';
    var totals = 0;
    $.each(orders, function (k, v) {
      if (typeof v == 'undefined')
        return false;
      totals += parseFloat(v[field]);
    });
    return totals.toFixed(2);
  }
});
