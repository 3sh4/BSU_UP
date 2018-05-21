var DomModule = (function () {

    let displayedCount = 0;

    //Load more button
    var buildLoadMoreButton = function () {
        let buttonElem = document.createElement('button');
        buttonElem.className = 'load-more-button';
        buttonElem.innerText = 'Больше';

        buttonElem.onclick = () => {
            buttonElem.parentNode.removeChild(buttonElem);

            displayPosts();
        };

        return buttonElem;
    };

    //Empty content block
    var buildEmptyContentBlock = function () {
        let emptyContentBlock = document.createElement('div');

        emptyContentBlock.className = 'empty-content';
        emptyContentBlock.innerText = 'Упс, кажется, у нас нет постов для вас :C';

        return emptyContentBlock;
    };

    //User block
    var buildUserBlock = function (user) {
        let container = document.createElement('div');

        container.innerHTML =
            '<div class="user-block">\
                <a href="#" class="add-photo">\
                    <img src="img/add-photo.png"/>\
                </a>\
                <div class="user-info">Alex</div>\
                <div class="logout-btn">Выйти</div>\
            </div>';

        container.getElementsByClassName('logout-btn')[0].onclick = () => logOut();

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
        postBlock.id = post.id;

        postBlock.appendChild(buildPostHeaderBlock(post));

        let user = Module.getUser();

        if (!!user && post.authorId === user.id)
            postBlock.appendChild(buildPostAuthorActionsBlock(post));

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

        container.getElementsByClassName('post-author')[0].onclick = () => setAuthorFilter(post.authorName);

        return container.firstChild;
    };

    var buildPostAuthorActionsBlock = function (post) {
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

        container.getElementsByClassName('post-delete-btn')[0].onclick = () => removePhotoPost(post.id);
        container.getElementsByClassName('post-edit-btn')[0].onclick = () => showEditPostMenu(post.id);

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

    var buildPostEditDescriptionInput = function (description) {
        let input = document.createElement('textarea');
        input.type = 'text';
        input.className = 'edit-post-description';

        input.value = description;
        return input;
    };

    var buildPostEditHashTagsInput = function (hashTags) {
        let input = document.createElement('textarea');
        input.type = 'text';
        input.className = 'edit-post-hashtags';

        input.value = hashTags;
        return input;
    };

    var buildPostEditDoneBtn = function () {
        let container = document.createElement('div');

        container.innerHTML =
            '<div class="post-edit-done-btn">\
                <img class="post-edit-done-btn-img" src="img/edit_post_done.png">\
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

        container.getElementsByClassName('post-likes')[0].onclick = () => setLike(post.id);

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
            let hashTag = post.hashtags[i];

            let hashtagElem = document.createElement('div');
            hashtagElem.className = 'hashtag';
            hashtagElem.innerHTML = '#' + hashTag;

            hashtagElem.onclick = () => addHashTagToFilter(hashTag);

            hashtagsElem.appendChild(hashtagElem);
        }

        return container.firstChild;
    };

    //Pages
    var displayContentPage = function () {
        document.getElementsByClassName('content')[0].style.display = 'flex';
        document.getElementsByClassName('filter')[0].style.display = 'flex';

        hideLoginPage();

        DomModule.initUser();
        DomModule.initFilterBlock();
        DomModule.displayPosts();
    };

    var displayLoginPage = function () {
        hideContentPage();

        document.getElementsByClassName('login-page')[0].style.display = 'block';
    };

    var hideLoginPage = function () {
        document.getElementsByClassName('login-page')[0].style.display = 'none';
    };

    var hideContentPage = function () {
        document.getElementsByClassName('content')[0].style.display = 'none';
        document.getElementsByClassName('filter')[0].style.display = 'none';
    };

    var hideUserBlock = function () {
        let userBlock = document.getElementsByClassName('user-block')[0];

        if (!!userBlock)
            userBlock.innerHTML = "";
    };

    //Private functions
    var clearContent = function () {
        let contentElem = document.getElementsByClassName("content")[0];

        while (contentElem.firstChild) {
            contentElem.removeChild(contentElem.firstChild);
        }

        displayedCount = 0;

        document.getElementsByClassName('content')[0].appendChild(buildEmptyContentBlock());
    };

    var addPostsToContent = function (posts) {
        let contentElem = document.getElementsByClassName('content')[0];

        for (let i = 0; i < posts.length; i++) {
            contentElem.appendChild(buildPostBlock(posts[i]));
        }

        displayedCount += posts.length;

        let emptyContentElem = document.getElementsByClassName('empty-content')[0];

        if (!!emptyContentElem && displayedCount > 0)
            emptyContentElem.parentNode.removeChild(emptyContentElem);
    };

    var refreshDisplayedPosts = function () {
        let postsToDisplay = Module.getPhotoPosts(0, displayedCount, Module.getFilter());

        clearContent();
        addPostsToContent(postsToDisplay);
    };

    var filterPosts = function () {
        let dateFilterValue = document.getElementById('filter-date').value;
        let authorFilterValue = document.getElementById('filter-author').value;
        let hashtagsFilterValue = document.getElementById('filter-hashtags').value;


        let filter = {};

        if (!!dateFilterValue)
            filter.fromDate = new Date(dateFilterValue);

        if (!!authorFilterValue)
            filter.author = authorFilterValue;

        if (!!hashtagsFilterValue)
            filter.hashTags = hashtagsFilterValue.split(' ').filter((s) => s.length > 0)

        Module.setFilter(filter);

        clearContent();
        displayPosts();
    };

    var showEditPostMenu = function (id) {
        let postElem = document.getElementById(id);
        let post = Module.getPhotoPost(id);

        let postEditBtnElem = postElem.getElementsByClassName('post-edit-btn')[0];
        let postEditDoneBtnElem = buildPostEditDoneBtn();
        postEditBtnElem.parentNode.replaceChild(postEditDoneBtnElem, postEditBtnElem);

        let postDescriptionElem = postElem.getElementsByClassName('description-text')[0];
        let postEditDescriptionElem = buildPostEditDescriptionInput(post.description);
        postDescriptionElem.parentNode.replaceChild(postEditDescriptionElem, postDescriptionElem);

        let postHashTagsElem = postElem.getElementsByClassName('post-hashtags')[0];
        let postEditHashTagsElem = buildPostEditHashTagsInput(post.hashtags.join(' '));
        postHashTagsElem.parentNode.replaceChild(postEditHashTagsElem, postHashTagsElem);

        postEditDoneBtnElem.onclick = () => {
            let newDescription = postEditDescriptionElem.value;
            let newHashTags = postEditHashTagsElem.value.split(' ').filter((s) => s.length > 0);

            editPhotoPost(id, {description: newDescription, hashtags: newHashTags});
        }
    };

    var setLike = function (id) {
        let user = Module.getUser();

        if (!!user) {
            let photoPost = Module.getPhotoPost(id);

            if (photoPost.likedIt) {

                let ind = photoPost.whoLiked.indexOf(user.name);

                if (ind > -1) {
                    photoPost.whoLiked.splice(ind, 1);
                }
            } else {
                photoPost.whoLiked.push(user.name);
            }

            editPhotoPost(id, {likedIt: !photoPost.likedIt, whoLiked: photoPost.whoLiked});
        }
    };

    var addHashTagToFilter = function (hashTag) {
        let hashTagsFilterElem = document.getElementById('filter-hashtags');

        let hashTagsStringValue = hashTagsFilterElem.value;

        let hashTags = hashTagsStringValue.split(' ').filter((s) => s.length > 0);

        if (hashTags.findIndex((s) => s === hashTag) === -1) {
            hashTagsFilterElem.value += hashTagsStringValue.trim().length > 0 ? ' ' + hashTag : hashTag;
        }
    };

    var setAuthorFilter = function (author) {
        document.getElementById('filter-author').value = author;
    };

    //Public functions
    var displayPosts = function () {
        let postsToDisplay = Module.getPhotoPosts(displayedCount, 10, Module.getFilter());

        addPostsToContent(postsToDisplay);

        if (Module.getPhotoPosts(displayedCount, 1, Module.getFilter()).length > 0)
            document.getElementsByClassName('content')[0].appendChild(buildLoadMoreButton());
    };

    var initUser = function () {
        let headerLineElem = document.getElementsByClassName('header-line')[0];
        let userBlock = headerLineElem.getElementsByClassName('user-block')[0];

        if (!!userBlock)
            userBlock.parentNode.replaceChild(buildUserBlock(Module.getUser()), userBlock);
        else
            headerLineElem.appendChild(buildUserBlock(Module.getUser()));
    };

    var logOut = function () {
        hideUserBlock();
        displayLoginPage();
        clearContent();
    };

    var initLoginButton = function () {
        let loginBtn = document.getElementsByClassName('login-btn')[0];

        if (!!loginBtn) {
            loginBtn.onclick = () => {
                let login = document.getElementById('login-email').value;
                let pass = document.getElementById('login-password').value;

                if (Module.checkLoginData({login: login, password: pass})) {
                    displayContentPage();
                }
            }
        }
    };

    var initFilterBlock = function () {
        let filterBlock = document.getElementsByClassName('filter')[0];

        if (!!filterBlock)
            filterBlock.getElementsByClassName('filter-button')[0].onclick = filterPosts;
    };

    var addPhotoPost = function (photoPost) {
        if (Module.addPhotoPost(photoPost)) {
            refreshDisplayedPosts();
        }
    };

    var removePhotoPost = function (id) {
        if (Module.removePhotoPost(id)) {
            let deletedPostElement = document.getElementById(id);

            if (!!deletedPostElement)
                deletedPostElement.parentNode.removeChild(deletedPostElement);
        }
    };

    var editPhotoPost = function (id, photoPost) {
        if (Module.editPhotoPost(id, photoPost)) {
            let postElem = document.getElementById(id);

            if (!!postElem) {
                postElem.parentNode.replaceChild(buildPostBlock(Module.getPhotoPost(id)), postElem);
            }
            return true;
        }
        return false;
    };

    return {
        displayPosts: displayPosts,
        initUser: initUser,
        editPhotoPost: editPhotoPost,
        addPhotoPost: addPhotoPost,
        removePhotoPost: removePhotoPost,
        initFilterBlock: initFilterBlock,
        initLoginButton: initLoginButton
    }

}());

document.addEventListener("DOMContentLoaded", function (event) {

    /*  DomModule.displayPosts();*/

    /*  DomModule.initUser();

     DomModule.initFilterBlock();*/

    DomModule.initLoginButton();

});


