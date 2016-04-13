/**
 * Created by vjcspy on 11/04/2016.
 */
app.service('urlManagement', function () {
  var urls = {
    pull_customers: '/rest/v1/xretail/customer',
    pull_products: '/rest/v1/xretail/xproduct'
  };
  this.getUrl = function (key) {
    return urls[key];
  };
  this.setUrl = function (key, data) {
    urls.key = data;
    return this;
  }
});
