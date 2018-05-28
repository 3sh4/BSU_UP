const DomModule = (function () {
  let displayedCount = 0;

  // Load more button
  const buildLoadMoreButton = function () {
    const buttonElem = document.createElement('button');
    buttonElem.className = 'load-more-button';
    buttonElem.innerText = 'Больше';

    buttonElem.onclick = () => {
      buttonElem.parentNode.removeChild(buttonElem);

      displayPosts();
    };

    return buttonElem;
  };

    // Empty content block
  const buildEmptyContentBlock = function () {
    const emptyContentBlock = document.createElement('div');

    emptyContentBlock.className = 'empty-content';
    emptyContentBlock.innerText = 'Упс, кажется, у нас нет постов для вас :C';

    return emptyContentBlock;
  };

    // User block
  const buildUserBlock = function (user) {
    const container = document.createElement('div');

    container.innerHTML =
            '<div class="user-block">\n' +
                '<a href="#" class="add-photo">\n' +
                    '<img src="img/add-photo.png"/>\n' +
                '</a>\n' +
                '<div class="user-info">Alex</div>\n' +
                '<div class="logout-btn">Выйти</div>\n' +
            '<div>';

    container.getElementsByClassName('logout-btn')[0].onclick = () => logOut();

    if (!user) {
      container.firstChild.removeChild(container.getElementsByClassName('add-photo')[0]);
      container.firstChild.removeChild(container.getElementsByClassName('user-info')[0]);
      container.firstChild.removeChild(container.getElementsByClassName('logout-btn')[0]);

      const loginElem = document.createElement('div');
      loginElem.innerHTML = 'Войти/Регистрация';
      loginElem.className = 'login-btn';

      container.firstChild.appendChild(loginElem);
    } else {
      container.getElementsByClassName('user-info')[0].innerHTML = user.name;
    }

    return container.firstChild;
  };

    // Post blocks
  const buildPostBlock = function (post) {
    const postBlock = document.createElement('div');
    postBlock.className = 'post';
    postBlock.id = post.id;

    postBlock.appendChild(buildPostHeaderBlock(post));

    const user = Module.getUser();

    if (!!user && post.authorId === user.id) {
      postBlock.appendChild(buildPostAuthorActionsBlock(post));
    }

    const postContentBlock = document.createElement('div');
    postContentBlock.className = 'post-content';

    postContentBlock.appendChild(buildPostImageBlock(post));
    postContentBlock.appendChild(buildPostActionsBlock(post));
    postContentBlock.appendChild(buildPostDescriptionBlock(post));
    postContentBlock.appendChild(buildPostHashtagsBlock(post));

    postBlock.appendChild(postContentBlock);

    return postBlock;
  };

  const buildPostHeaderBlock = function (post) {
    const container = document.createElement('div');

    container.innerHTML = `<div class="post-header"> \
            <div class="post-author">${post.authorName}</div> \
            <div class="post-date">${post.createdAt.toLocaleDateString()}</div>\
        </div>`;

    container.getElementsByClassName('post-author')[0].onclick = () => setAuthorFilter(post.authorName);

    return container.firstChild;
  };

  const buildPostAuthorActionsBlock = function (post) {
    const container = document.createElement('div');

    container.innerHTML =
            '<div class="post-author-actions">\n' +
            '<div class="post-edit-btn">\n' +
            '<img class="post-edit-btn-img" src="img/edit_post.png">\n' +
            '</div>\n' +
            '<div class="post-delete-btn">\n' +
            '<img class="post-delete-btn-img" src="img/delete_post.png">\n' +
            '</div>\n' +
            '</div>';

    container.getElementsByClassName('post-delete-btn')[0].onclick = () => removePhotoPost(post.id);
    container.getElementsByClassName('post-edit-btn')[0].onclick = () => showEditPostMenu(post.id);

    return container.firstChild;
  };

  const buildPostDescriptionBlock = function (post) {
    const container = document.createElement('div');

    container.innerHTML =
            `<div class="post-description">\
                <div class="description-text">\
                    ${post.description}\
                </div>\
            </div>`;

    return container.firstChild;
  };

  const buildPostEditDescriptionInput = function (description) {
    const input = document.createElement('textarea');
    input.type = 'text';
    input.className = 'edit-post-description';

    input.value = description;
    return input;
  };

  const buildPostEditHashTagsInput = function (hashTags) {
    const input = document.createElement('textarea');
    input.type = 'text';
    input.className = 'edit-post-hashtags';

    input.value = hashTags;
    return input;
  };

  const buildPostEditDoneBtn = function () {
    const container = document.createElement('div');

    container.innerHTML =
            '<div class="post-edit-done-btn">\n' +
                '<img class="post-edit-done-btn-img" src="img/edit_post_done.png">\n' +
            '</div>';

    return container.firstChild;
  };

  const buildPostActionsBlock = function (post) {
    const container = document.createElement('div');

    container.innerHTML =
            '<div class="post-actions">\n' +
                 '<div class="post-likes">\n' +
                     '<img class="like-icon" src="img/like_active.png" alt="Нравится">\n' +
                     '<span class="like-text"></span>\n' +
                 '</div>\n' +
             '</div>';

    const likeImgElem = container.getElementsByClassName('like-icon')[0];
    likeImgElem.src = post.likedIt ? 'img/like_active.png' : 'img/like_not_active.png';

    const likeTextElem = container.getElementsByClassName('like-text')[0];
    likeTextElem.innerHTML = `Нравится ${post.whoLiked.length}`;

    container.getElementsByClassName('post-likes')[0].onclick = () => setLike(post.id);

    return container.firstChild;
  };

  const buildPostImageBlock = function (post) {
    const container = document.createElement('div');

    container.innerHTML =
            '<div class="post-image">\n' +
                '<img class="photo" alt="Изображение">\n' +
            '</div>';

    container.getElementsByClassName('photo')[0].src = post.photoLink;

    return container.firstChild;
  };

  const buildPostHashtagsBlock = function (post) {
    const container = document.createElement('div');

    container.innerHTML =
            '<div class="hashtags-wrapper">\n' +
               '<div class="post-hashtags">\n' +
               '</div>\n' +
          '</div>';

    const hashtagsElem = container.getElementsByClassName('post-hashtags')[0];

    for (let i = 0; i < post.hashtags.length; i += 1) {
      const hashTag = post.hashtags[i];

      const hashtagElem = document.createElement('div');
      hashtagElem.className = 'hashtag';
      hashtagElem.innerHTML = `#${hashTag}`;

      hashtagElem.onclick = () => addHashTagToFilter(hashTag);

      hashtagsElem.appendChild(hashtagElem);
    }

    return container.firstChild;
  };

    // Pages
  const displayContentPage = function () {
    document.getElementsByClassName('content')[0].style.display = 'flex';
    document.getElementsByClassName('filter')[0].style.display = 'flex';

    hideLoginPage();

    DomModule.initUser();
    DomModule.initFilterBlock();
    DomModule.displayPosts();
  };

  const displayLoginPage = function () {
    hideContentPage();

    document.getElementsByClassName('login-page')[0].style.display = 'block';
  };

  const hideLoginPage = function () {
    document.getElementsByClassName('login-page')[0].style.display = 'none';
  };

  const hideContentPage = function () {
    document.getElementsByClassName('content')[0].style.display = 'none';
    document.getElementsByClassName('filter')[0].style.display = 'none';
  };

  const hideUserBlock = function () {
    const userBlock = document.getElementsByClassName('user-block')[0];

    if (userBlock) { userBlock.innerHTML = ''; }
  };

    // Private functions
  const clearContent = function () {
    const contentElem = document.getElementsByClassName('content')[0];

    while (contentElem.firstChild) {
      contentElem.removeChild(contentElem.firstChild);
    }

    displayedCount = 0;

    document.getElementsByClassName('content')[0].appendChild(buildEmptyContentBlock());
  };

  const addPostsToContent = function (posts) {
    const contentElem = document.getElementsByClassName('content')[0];

    for (let i = 0; i < posts.length; i += 1) {
      contentElem.appendChild(buildPostBlock(posts[i]));
    }

    displayedCount += posts.length;

    const emptyContentElem = document.getElementsByClassName('empty-content')[0];

    if (!!emptyContentElem && displayedCount > 0) {
      emptyContentElem.parentNode.removeChild(emptyContentElem);
    }
  };

  const refreshDisplayedPosts = function () {
    const postsToDisplay = Module.getPhotoPosts(0, displayedCount, Module.getFilter());

    clearContent();
    addPostsToContent(postsToDisplay);
  };

  const filterPosts = function () {
    const dateFilterValue = document.getElementById('filter-date').value;
    const authorFilterValue = document.getElementById('filter-author').value;
    const hashtagsFilterValue = document.getElementById('filter-hashtags').value;


    const filter = {};

    if (dateFilterValue) { filter.fromDate = new Date(dateFilterValue); }

    if (authorFilterValue) { filter.author = authorFilterValue; }

    if (hashtagsFilterValue) { filter.hashTags = hashtagsFilterValue.split(' ').filter(s => s.length > 0); }

    Module.setFilter(filter);

    clearContent();
    displayPosts();
  };

  const showEditPostMenu = function (id) {
    const postElem = document.getElementById(id);
    const post = Module.getPhotoPost(id);

    const postEditBtnElem = postElem.getElementsByClassName('post-edit-btn')[0];
    const postEditDoneBtnElem = buildPostEditDoneBtn();
    postEditBtnElem.parentNode.replaceChild(postEditDoneBtnElem, postEditBtnElem);

    const postDescriptionElem = postElem.getElementsByClassName('description-text')[0];
    const postEditDescriptionElem = buildPostEditDescriptionInput(post.description);
    postDescriptionElem.parentNode.replaceChild(postEditDescriptionElem, postDescriptionElem);

    const postHashTagsElem = postElem.getElementsByClassName('post-hashtags')[0];
    const postEditHashTagsElem = buildPostEditHashTagsInput(post.hashtags.join(' '));
    postHashTagsElem.parentNode.replaceChild(postEditHashTagsElem, postHashTagsElem);

    postEditDoneBtnElem.onclick = () => {
      const newDescription = postEditDescriptionElem.value;
      const newHashTags = postEditHashTagsElem.value.split(' ').filter(s => s.length > 0);

      editPhotoPost(id, { description: newDescription, hashtags: newHashTags });
    };
  };

  const setLike = function (id) {
    const user = Module.getUser();

    if (user) {
      const photoPost = Module.getPhotoPost(id);

      if (photoPost.likedIt) {
        const ind = photoPost.whoLiked.indexOf(user.name);

        if (ind > -1) {
          photoPost.whoLiked.splice(ind, 1);
        }
      } else {
        photoPost.whoLiked.push(user.name);
      }

      editPhotoPost(id, { likedIt: !photoPost.likedIt, whoLiked: photoPost.whoLiked });
    }
  };

  const addHashTagToFilter = function (hashTag) {
    const hashTagsFilterElem = document.getElementById('filter-hashtags');

    const hashTagsStringValue = hashTagsFilterElem.value;

    const hashTags = hashTagsStringValue.split(' ').filter(s => s.length > 0);

    if (hashTags.findIndex(s => s === hashTag) === -1) {
      hashTagsFilterElem.value += hashTagsStringValue.trim().length > 0 ? ` ${hashTag}` : hashTag;
    }
  };

  const setAuthorFilter = function (author) {
    document.getElementById('filter-author').value = author;
  };

    // Public functions
  const displayPosts = function () {
    const postsToDisplay = Module.getPhotoPosts(displayedCount, 10, Module.getFilter());

    addPostsToContent(postsToDisplay);

    if (Module.getPhotoPosts(displayedCount, 1, Module.getFilter()).length > 0) { document.getElementsByClassName('content')[0].appendChild(buildLoadMoreButton()); }
  };

  const initUser = function () {
    const headerLineElem = document.getElementsByClassName('header-line')[0];
    const userBlock = headerLineElem.getElementsByClassName('user-block')[0];

    if (userBlock) {
      userBlock.parentNode.replaceChild(buildUserBlock(Module.getUser()), userBlock);
    } else {
      headerLineElem.appendChild(buildUserBlock(Module.getUser()));
    }
  };

  const logOut = function () {
    hideUserBlock();
    displayLoginPage();
    clearContent();
  };

  const initLoginButton = function () {
    const loginBtn = document.getElementsByClassName('login-btn')[0];

    if (loginBtn) {
      loginBtn.onclick = () => {
        const login = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;

        if (Module.checkLoginData({ login, password: pass })) {
          displayContentPage();
        }
      };
    }
  };

  const dragenter = function (e) {
    e.stopPropagation();
    e.preventDefault();
    document.getElementById('upload-photo-area').style.backgroundColor = 'red';
  };

  const dragover = function (e) {
    e.stopPropagation();
    e.preventDefault();
    document.getElementById('upload-photo-area').style.backgroundColor = 'green';
  };


  const drop = function (e) {
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const file = dt.files[0];

    const area = document.getElementById('123');
    area.src = window.URL.createObjectURL(file);
  };

  const initUploadPhotoArea = function () {
    const area = document.getElementById('upload-photo-area');

    if (area) {
      area.addEventListener('dragenter', dragenter, false);
      area.addEventListener('dragover', dragover, false);
      area.addEventListener('drop', drop, false);
    }
  };

  const initFilterBlock = function () {
    const filterBlock = document.getElementsByClassName('filter')[0];

    if (filterBlock) { filterBlock.getElementsByClassName('filter-button')[0].onclick = filterPosts; }
  };

  const addPhotoPost = function (photoPost) {
    if (Module.addPhotoPost(photoPost)) {
      refreshDisplayedPosts();
    }
  };

  const removePhotoPost = function (id) {
    if (Module.removePhotoPost(id)) {
      const deletedPostElement = document.getElementById(id);

      if (deletedPostElement) { deletedPostElement.parentNode.removeChild(deletedPostElement); }
    }
  };

  const editPhotoPost = function (id, photoPost) {
    if (Module.editPhotoPost(id, photoPost)) {
      const postElem = document.getElementById(id);

      if (postElem) {
        postElem.parentNode.replaceChild(buildPostBlock(Module.getPhotoPost(id)), postElem);
      }
      return true;
    }
    return false;
  };

  return {
    displayPosts,
    initUser,
    editPhotoPost,
    addPhotoPost,
    removePhotoPost,
    initFilterBlock,
    initLoginButton,
    initUploadPhotoArea,
  };
}());

document.addEventListener('DOMContentLoaded', () => {
  /*  DomModule.displayPosts(); */

  /*  DomModule.initUser();

     DomModule.initFilterBlock(); */

  //  DomModule.initLoginButton();

  DomModule.initUploadPhotoArea();
});

