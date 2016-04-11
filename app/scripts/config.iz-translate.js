/**
 * Created by vjcspy on 11/04/2016.
 */
app.config(['$izTranslateProvider', function ($izTranslateProvider) {
  // chỉ ra những module được dùng trong app
  $izTranslateProvider.addModuleCanEditLanguage([{
    value: 'home',
    display: 'Home Module'
  }, {
    value: 'xmodule',
    display: 'Retail Module'
  }]);

  // chỉ ra ngôn ngữ được sử dụng trong app
  $izTranslateProvider.addSupportLanguages(
    [
      {
        value: 'en',
        label: 'English'
      },
      {
        value: 'vi',
        label: 'Tiếng Việt'
      }
    ]);
}]);
