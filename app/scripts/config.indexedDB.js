/**
 * Created by vjcspy on 11/04/2016.
 */
var indexedDB = angular.module('izIndexedDB', ['indexedDB'])
  .config(function ($indexedDBProvider) {
    $indexedDBProvider
      .connection('izIndexedDB')
      .upgradeDatabase(1, function (event, db, tx) {
        var objStore = db.createObjectStore('people', {autoIncrement: true});
        objStore.createIndex('name_idx', 'name', {unique: false});
        objStore.createIndex('age_idx', 'age', {unique: false});
      })
      .upgradeDatabase(2, function (event, db, tx) {
        db.createObjectStore('peoplePhones', {autoIncrement: true});
      });
  });
