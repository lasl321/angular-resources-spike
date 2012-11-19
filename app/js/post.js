angular.module('dataAccess', ['ngResource'])
    .factory('Post', function ($resource) {
        var Post = $resource('/app/data/posts.json/:id');

        function Comment(title) {
            this.commentId = 9999;
            this.postId = 9999;
            this.title = title;
        }

        Comment.prototype.hasTitle = function (title) {
            return this.title === title;
        };

        Post.prototype = {
            getComments: function () {
                return [].concat(this.comments || []);
            },

            addComment: function (title) {
                var comment = new Comment(title);

                if (!this.comments) {
                    this.comments = comment;
                    return;
                }

                var comments = [].concat(this.comments, comment);
                var hasDuplicates = comments.some(function (element) {
                    return element.title === comment.title;
                });

                if (!hasDuplicates) {
                    this.comments = comments;
                }
            }
        };

        return Post;
    });

