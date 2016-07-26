var coreModule = angular.module('inkwell-core');


coreModule.service('storageService', function($q, $cordovaFile) {
  var BASE_PATH = cordova.file.dataDirectory;
  var FACTS_FILE = 'inkwell.facts.txt';

  // Local cache for loaded facts.
  var facts = null;

  /**
   * Returns all facts.
   */
  this.getAllFacts = function() {
    if (facts) {
      return $q.when(facts);
    }

    return $cordovaFile.readAsText(BASE_PATH, FACTS_FILE).then(function(content) {
      var rawFacts = JSON.parse(content);
      facts = this.groupByDate(rawFacts);
      return facts;
    }.bind(this));
  }.bind(this);

  /**
   * Returns all facts on a given day.
   */
  this.getFactsByDate = function(date) {
    if (!date) {
      return $q.reject('Invalid date');
    }

    var key = this.getKey(date);
    return this.getAllFacts().then(function(facts) {
      return facts[key];
    }.bind(this));
  }.bind(this);

  /**
   * Writes a list of facts to the given day. The order of the facts
   * will be persisted.
   */
  this.writeFacts = function(date, dateFacts) {
    var key = this.getKey(date);

    if (!facts) {
      facts = {};
    }
    facts[key] = dateFacts;

    var content = this.flattenFacts(facts);
    return $cordovaFile.writeFile(BASE_PATH, FACTS_FILE, content, true);
  }.bind(this);

  /**
   * Group raw facts by date.
   */
  this.groupByDate = function(rawFacts) {
    var result = {};
    angular.forEach(rawFacts, function(fact) {
      if (!fact.date) {
        return; // Ignoe this fact.
      }
      var key = this.getKey(fact.date);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(fact);
    }.bind(this));
    return result;
  }.bind(this);

  /**
   * Group raw facts by date.
   */
  this.flattenFacts = function(factsByDate) {
    var allFacts = [];
    angular.forEach(factsByDate, function(facts) {
      allFacts = allFacts.concat(facts);
    }.bind(this));
    return allFacts;
  }.bind(this);

  /**
   * Gets the key for the current date.
   */
  this.getKey = function(date) {
    return moment(date).format('Y-M-D');
  }.bind(this);

});