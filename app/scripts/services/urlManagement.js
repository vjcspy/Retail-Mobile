/**
 * Created by vjcspy on 11/04/2016.
 */
app.service('urlManagement', function () {
  var urls = {
    pull_customers: '/rest/v1/xretail/customer',
    pull_products: '/rest/v1/xretail/xproduct',
    pull_countries: '/rest/v1/xretail/country',
    pull_customerGroups: '/rest/v1/xretail/customer-group',
    customer_orders: '/rest/v1/xretail/customer-orders',
    load_block: '/rest/v1/xretail/loadblock',
    create_order: '/rest/v1/xretail/save-order-n-invoice',
    pull_orders: '/rest/v1/xretail/pull-orders',
    customer_save: '/rest/v1/xretail/customer-save'
  };
  this.getUrl = function (key) {
    return urls[key];
  };
  this.setUrl = function (key, data) {
    urls.key = data;
    return this;
  }
});
