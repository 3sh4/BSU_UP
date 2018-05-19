var DomModule = (function () {

    //User block
    var buildUserBlock = function (user) {
        var container = document.createElement('div');

        container.innerHTML =
            '<div class="user-block">\
                <a href="#" class="add-photo">\
                    <img src="img/add-photo.png"/>\
                </a>\
                <div class="user-info">Alex</div>\
                <div class="logout-btn">Выйти</div>\
            </div>';

        if (!user) {
            container.firstChild.removeChild(container.getElementsByClassName('add-photo')[0]);
            container.firstChild.removeChild(container.getElementsByClassName('user-info')[0]);
            container.firstChild.removeChild(container.getElementsByClassName('logout-btn')[0]);

            let loginElem = document.createElement('div');
            loginElem.innerHTML = 'Войти/Регистрация';
            loginElem.className = 'login-btn';

            container.firstChild.appendChild(loginElem);
        } else {
            container.getElementsByClassName('user-info')[0].innerHTML = user.name;
        }

        return container.firstChild;
    };

    //Post blocks
    var buildPostBlock = function (post) {
        let postBlock = document.createElement('div');
        postBlock.className = 'post';

        postBlock.appendChild(buildPostHeaderBlock(post));

        let user = Module.getUser();

        if (!!user && post.authorId === user.id)
            postBlock.appendChild(buildPostAuthorActionsBlock());

        let postContentBlock = document.createElement('div');
        postContentBlock.className = 'post-content';

        postContentBlock.appendChild(buildPostImageBlock(post));
        postContentBlock.appendChild(buildPostActionsBlock(post));
        postContentBlock.appendChild(buildPostDescriptionBlock(post));
        postContentBlock.appendChild(buildPostHashtagsBlock(post));

        postBlock.appendChild(postContentBlock);

        return postBlock;
    };

    var buildPostHeaderBlock = function (post) {
        var container = document.createElement('div');

        container.innerHTML = '<div class="post-header"> \
            <div class="post-author">' + post.authorName + '</div> \
            <div class="post-date">' + post.createdAt.toLocaleDateString() + '</div>\
        </div>';

        return container.firstChild;
    };

    var buildPostAuthorActionsBlock = function () {
        var container = document.createElement('div');

        container.innerHTML =
            '<div class="post-author-actions">\
            <div class="post-edit-btn">\
            <img class="post-edit-btn-img" src="img/edit_post.png">\
            </div>\
            <div class="post-delete-btn">\
            <img class="post-delete-btn-img" src="img/delete_post.png">\
            </div>\
            </div>';

        return container.firstChild;
    };

    var buildPostDescriptionBlock = function (post) {
        var container = document.createElement('div');

        container.innerHTML =
            '<div class="post-description">\
                <div class="description-text">\
                    ' + post.description + '\
                </div>\
            </div>';

        return container.firstChild;
    };

    var buildPostActionsBlock = function (post) {
        let container = document.createElement('div');

        container.innerHTML =
            '<div class="post-actions">\
                 <div class="post-likes">\
                     <img class="like-icon" src="img/like_active.png" alt="Нравится">\
                     <span class="like-text"></span>\
                 </div>\
             </div>';

        let likeImgElem = container.getElementsByClassName('like-icon')[0];
        likeImgElem.src = post.likedIt ? 'img/like_active.png' : 'img/like_not_active.png';

        let likeTextElem = container.getElementsByClassName('like-text')[0];
        likeTextElem.innerHTML = 'Нравится ' + post.whoLiked.length;

        return container.firstChild;
    };

    var buildPostImageBlock = function (post) {
        var container = document.createElement('div');

        container.innerHTML =
            '<div class="post-image">\
                <img class="photo" alt="Изображение">\
            </div>';

        container.getElementsByClassName('photo')[0].src = post.photoLink;

        return container.firstChild;
    };

    var buildPostHashtagsBlock = function (post) {
        let container = document.createElement('div');

        container.innerHTML =
            '<div class="hashtags-wrapper">\
               <div class="post-hashtags">\
               </div>\
          </div>';

        let hashtagsElem = container.getElementsByClassName('post-hashtags')[0];

        for (let i = 0; i < post.hashtags.length; i++) {
            let hashtagElem = document.createElement('div');
            hashtagElem.className = 'hashtag';
            hashtagElem.innerHTML = '#' + post.hashtags[i];

            hashtagsElem.appendChild(hashtagElem);
        }

        return container.firstChild;
    };

    //Private functions
    var clearContent = function () {
        let contentElem = document.getElementsByClassName("content")[0];

        while (contentElem.firstChild) {
            contentElem.removeChild(contentElem.firstChild);
        }

        Module.setDisplayedCount(0);
    };

    var addPostsToContent = function (posts) {
        let contentElem = document.getElementsByClassName('content')[0];

        for (let i = 0; i < posts.length; i++) {
            contentElem.appendChild(buildPostBlock(posts[i]));
        }

        let displayedCount = Module.getDisplayedCount();

        Module.setDisplayedCount(displayedCount + posts.length);
    };

    var refreshDisplayedPosts = function () {
        let countDisplayed = Module.getDisplayedCount();
        let postsToDisplay = Module.getPhotoPosts(0, countDisplayed, Module.getFilter());

        clearContent();
        addPostsToContent(postsToDisplay);
    };

    //Public functions
    var displayPosts = function () {
        let postsToDisplay = Module.getPhotoPosts(Module.getDisplayedCount(), 10, Module.getFilter());

        addPostsToContent(postsToDisplay);
    };

    var initUser = function () {
        let headerLineElem = document.getElementsByClassName('header-line')[0];

        headerLineElem.appendChild(buildUserBlock(Module.getUser()));
    };

    var addPhotoPost = function (photoPost) {
        if (Module.addPhotoPost(photoPost)) {
            let postsToDisplay = Module.getPhotoPosts(0, Module.getDisplayedCount() + 1, Module.getFilter());

            clearContent();
            addPostsToContent(postsToDisplay);
        }
    };

    var removePhotoPost = function (id) {
        if (Module.removePhotoPost(id)) {
            refreshDisplayedPosts();
        }
    };

    var editPhotoPost = function (id, photoPost) {
        if (Module.editPhotoPost(id, photoPost)) {
            refreshDisplayedPosts();
        }
    };

    return {
        displayPosts: displayPosts,
        initUser: initUser,
        editPhotoPost: editPhotoPost,
        addPhotoPost: addPhotoPost,
        removePhotoPost: removePhotoPost
    }

}());

document.addEventListener("DOMContentLoaded", function (event) {

    DomModule.displayPosts();

    DomModule.initUser();

});


