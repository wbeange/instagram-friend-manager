'use strict';

describe('Controller: UserCollectionCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var UserCollectionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserCollectionCtrl = $controller('UserCollectionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserCollectionCtrl.awesomeThings.length).toBe(3);
  });
});
