angular.module('dataAccess', ['ngResource']).
factory('Post', function($resource) {
    var Post = $resource('/app/data/posts/:id');

    return Post;
});

