/**
 * Created by vjcspy on 11/04/2016.
 */
'use strict';
var izIndexedDB = angular.module('izIndexedDB', ['indexedDB'])
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
      })
      .upgradeDatabase(3, function (event, db, tx) {
        db.createObjectStore('customer', {autoIncrement: true});
        db.createObjectStore('pullData', {keyPath: 'pull_data_id'});
      })
      .upgradeDatabase(4, function (event, db, tx) {
        var objAppData = db.createObjectStore('retailAppData', {autoIncrement: true});
        objAppData.createIndex('name', 'name', {unique: true});
        objAppData.createIndex('value', 'value', {unique: false});
      });
  });
