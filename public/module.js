const Module = (function () {
  // Data
  const user = {
    name: 'Алексей',
    id: '162',
  };

  const rightLoginData = {
    login: '123@yandex.ru',
    password: '12345',
  };

  let currentFilter = {};

  const photoPosts = [
    {
      id: '1',
      authorId: '162',
      description: 'Loremitaque minus molestias nemo quasi voluptates. Eum, ipsam non nulla quod quos voluptatem? Adipisci alias commodi dolorem exercitationem repellat! Architecto atque consequuntur eaque ex id in ipsum iste maxime natus nemo nesciunt non quis, quisquam quos sed tempora totam. Ab ad cupiditate dolorum earum eligendi fugit harum impedit in magnam maiores molestiae natus, nihil non, placeat quod repellat repudiandae temporibus ut? Blanditiis commodi consequatur delectus distinctio incidunt modi nihil placeat quis tempore, temporibus. Aut doloribus dolorum inventore minus neque reprehenderit, sit?',
      createdAt: new Date('2006-08-23T23:00:00'),
      authorName: 'ArtHome',
      photoLink: 'img/photos/photo1.jpg',
      whoLiked: ['Kaiska', 'h54', '5h454h54', 'h'],
      likedIt: false,
      hashtags: ['art', 'me'],
    },
    {
      id: '2',
      authorId: '162',
      description: ':)',
      createdAt: new Date('2014-08-23T23:00:00'),
      authorName: 'Hello',
      photoLink: 'img/photos/photo2.jpg',
      whoLiked: [],
      likedIt: false,
      hashtags: [],
    },
    {
      id: '3',
      authorId: '1352',
      description: 'qwerty',
      createdAt: new Date('2018-11-03T23:00:00'),
      authorName: 'KeyArtGroup',
      photoLink: 'img/photos/photo3.jpg',
      whoLiked: ['KeyAd'],
      likedIt: false,
      hashtags: ['idk'],
    },
    {
      id: '4',
      authorId: '15325',
      description: ':DD',
      createdAt: new Date('2008-08-23T23:00:00'),
      authorName: 'Smile',
      photoLink: 'img/photos/photo4.jpg',
      whoLiked: ['Me'],
      likedIt: false,
      hashtags: [':c', ':D', 'smiles'],
    },
    {
      id: '5',
      authorId: '162',
      description: 'bla bla BLA',
      createdAt: new Date('2018-08-11T23:00:00'),
      authorName: '507',
      photoLink: 'img/photos/photo5.jpg',
      whoLiked: [],
      likedIt: false,
      hashtags: ['calcacacwalcawcl'],
    },
    {
      id: '6',
      authorId: '7897',
      description: '',
      createdAt: new Date('2018-08-23T23:00:00'),
      authorName: 'EmptyName',
      photoLink: 'img/photos/photo6.jpg',
      whoLiked: ['123', '1313131312'],
      likedIt: false,
      hashtags: ['fefeffefe'],
    },
    {
      id: '7',
      authorId: '1',
      description: '1234567',
      createdAt: new Date('2018-04-23T23:00:00'),
      authorName: 'MathClasses',
      photoLink: 'img/photos/photo7.jpg',
      whoLiked: [],
      likedIt: false,
      hashtags: [],
    },
    {
      id: '8',
      authorId: '1',
      description: '♦',
      createdAt: new Date('2018-08-23T23:00:00'),
      authorName: 'DY',
      photoLink: 'img/photos/photo8.jpg',
      whoLiked: ['fctgvbhjnkml,'],
      likedIt: false,
      hashtags: ['xdrcftgvbhjn'],
    },
    {
      id: '9',
      authorId: '1234567',
      description: '♥',
      createdAt: new Date('2018-08-23T23:00:00'),
      authorName: 'xdrcfvgbhjnk',
      photoLink: 'img/photos/photo9.jpg',
      whoLiked: ['Kaiska'],
      likedIt: false,
      hashtags: ['zsxdfcgvbhjn'],
    },
    {
      id: '10',
      authorId: '1345678',
      description: 'xrxdcftgvbhj',
      createdAt: new Date('2018-08-23T23:00:00'),
      authorName: 'ArtHome',
      photoLink: 'img/photos/photo10.jpg',
      whoLiked: ['Kaiska'],
      likedIt: false,
      hashtags: ['art'],
    },
    {
      id: '11',
      authorId: '132',
      description: 'water))0)',
      createdAt: new Date('20013-11-29T22:00:00'),
      authorName: 'ChiL',
      photoLink: 'img/photos/photo11.jpg',
      whoLiked: ['vesevs', '5h454h54', 'h'],
      likedIt: false,
      hashtags: ['water', 'htag'],
    },
    {
      id: '12',
      authorId: '1353562',
      description: 'Lovely nature',
      createdAt: new Date('2012-11-20T23:00:00'),
      authorName: 'Unnamed Photographer',
      photoLink: 'img/photos/photo12.jpg',
      whoLiked: ['Hello', 'me'],
      likedIt: false,
      hashtags: [],
    },
    {
      id: '13',
      authorId: '13352',
      description: 'Let\'s draw something really beautiful!',
      createdAt: new Date('2008-11-03T23:00:00'),
      authorName: 'KeyArtGroup',
      photoLink: 'img/photos/photo13.jpg',
      whoLiked: ['qdwqd', '3f22f2'],
      likedIt: false,
      hashtags: ['red', 'brush'],
    },
    {
      id: '14',
      authorId: '124124',
      description: 'Rainbow)',
      createdAt: new Date('2019-08-23T23:00:00'),
      authorName: 'Qer',
      photoLink: 'img/photos/photo14.jpg',
      whoLiked: ['Me', 'qe'],
      likedIt: false,
      hashtags: ['rainbow'],
    },
    {
      id: '15',
      authorId: '162',
      description: 'Fly!',
      createdAt: new Date('2018-08-16T23:00:00'),
      authorName: '507',
      photoLink: 'img/photos/photo15.jpg',
      whoLiked: [],
      likedIt: false,
      hashtags: [],
    },
    {
      id: '16',
      authorId: '7897',
      description: 'Small fire in our hearts',
      createdAt: new Date('2012-10-04T23:00:00'),
      authorName: 'EmptyName',
      photoLink: 'img/photos/photo16.jpg',
      whoLiked: ['me', '1313131312'],
      likedIt: false,
      hashtags: ['fefeffefe'],
    },
    {
      id: '17',
      authorId: '1',
      description: 'Look to the sky',
      createdAt: new Date('2010-04-23T23:00:00'),
      authorName: 'JapanYag',
      photoLink: 'img/photos/photo17.jpg',
      whoLiked: [],
      likedIt: false,
      hashtags: [],
    },
    {
      id: '18',
      authorId: '1',
      description: 'Mmm, delicious...',
      createdAt: new Date('2011-02-23T23:00:00'),
      authorName: 'DY',
      photoLink: 'img/photos/photo18.jpg',
      whoLiked: ['fctgvbhjnkml,'],
      likedIt: false,
      hashtags: ['xdrcftgvbhjn'],
    },
    {
      id: '19',
      authorId: '1234567',
      description: 'My bf',
      createdAt: new Date('2009-08-23T23:00:00'),
      authorName: 'Shaker',
      photoLink: 'img/photos/photo19.jpg',
      whoLiked: ['Kaiska'],
      likedIt: false,
      hashtags: ['zsxdfcgvbhjn'],
    },
    {
      id: '20',
      authorId: '1345678',
      description: 'Actually i don\'t like strawberry, but that\'s pretty nice',
      createdAt: new Date('2010-12-23T23:00:00'),
      authorName: 'ArtHome',
      photoLink: 'img/photos/photo20.jpg',
      whoLiked: ['Kaiska'],
      likedIt: false,
      hashtags: ['food', 'strawberry'],
    },
  ];

  const getUser = function () {
    return user;
  };

  const getFilter = function () {
    return currentFilter;
  };

  const setFilter = function (filter) {
    currentFilter = filter;
  };

  const checkLoginData = function (data) {
    return data.login === rightLoginData.login && data.password === rightLoginData.password;
  };

    // Functions
  function checkForFilter(filter, post) {
    if (!!filter.author && post.authorName !== filter.author) {
      return false;
    }

    if (!!filter.hashTags && !filter.hashTags.every(hashtag => post.hashtags.includes(hashtag))) {
      return false;
    }

    if (!!filter.fromDate && !(filter.fromDate <= post.createdAt)) {
      return false;
    }

    return true;
  }


  // Public functions
  const getPhotoPosts = function (skip = 0, top = 10, filterConfig = {}) {
    const filtered = photoPosts.filter(post => checkForFilter(filterConfig, post));

    filtered.sort((a, b) => a.createdAt - b.createdAt);

    return filtered.slice(skip, top + skip);
  };

  const removePhotoPost = function (id) {
    const ind = photoPosts.findIndex(el => id === el.id);

    if (ind === -1) { return false; }

    photoPosts.splice(ind, 1);
    return true;
  };

  const addPhotoPost = function (photoPost) {
    if (!validatePhotoPost(photoPost)) { return false; }

    photoPosts.push(photoPost);
    return true;
  };

  const getPhotoPost = function (id) {
    const ind = photoPosts.findIndex(el => id === el.id);

    return ind === -1 ? null : photoPosts[ind];
  };

  const validatePhotoPost = function (photoPost) {
    return checkAuthorId(photoPost.authorId) &&
            checkAuthorName(photoPost.authorName) &&
            checkCreationDate(photoPost.createdAt) &&
            checkDescription(photoPost.description) &&
            checkHashtags(photoPost.hashtags) &&
            checkLikes(photoPost.whoLiked) &&
            checkId(photoPost.id) &&
            checkLink(photoPost.photoLink);
  };

  const editPhotoPost = function (id, photoPost) {
    const ind = photoPosts.findIndex(el => id === el.id);

    if (ind === -1) { return false; }

    if (!!photoPost.authorId && checkAuthorId(photoPost.authorId)) {
      photoPosts[ind].authorId = photoPost.authorId;
    }

    if (!!photoPost.id && checkId(photoPost.id)) {
      photoPosts[ind].id = photoPost.id;
    }

    if (Object.prototype.hasOwnProperty.call(photoPost, 'description') && checkDescription(photoPost.description)) {
      photoPosts[ind].description = photoPost.description;
    }

    if (!!photoPost.createdAt && checkCreationDate(photoPost.createdAt)) {
      photoPosts[ind].createdAt = photoPost.createdAt;
    }

    if (!!photoPost.authorName && checkAuthorName(photoPost.authorName)) {
      photoPosts[ind].authorName = photoPost.authorName;
    }

    if (!!photoPost.photoLink && checkLink(photoPost.photoLink)) {
      photoPosts[ind].photoLink = photoPost.photoLink;
    }

    if (!!photoPost.whoLiked && checkLikes(photoPost.whoLiked)) {
      photoPosts[ind].whoLiked = photoPost.whoLiked;
    }

    if (!!photoPost.hashtags && checkHashtags(photoPost.hashtags)) {
      photoPosts[ind].hashtags = photoPost.hashtags;
    }

    if (Object.prototype.hasOwnProperty.call(photoPost, 'likedIt')) {
      photoPosts[ind].likedIt = photoPost.likedIt;
    }

    return true;
  };

    // Valid checkers
  function checkId(id) {
    return typeof id === 'string' && id.trim().length > 0;
  }

  function checkDescription(desc) {
    return typeof desc === 'string' && desc.length <= 200;
  }

  function checkCreationDate(date) {
    return date instanceof Date;
  }

  function checkAuthorName(author) {
    return typeof author === 'string' && author.trim().length > 0;
  }

  function checkLink(photoLink) {
    return typeof photoLink === 'string';
  }

  function checkAuthorId(id) {
    return typeof id === 'string' && id.trim().length > 0;
  }

  function checkLikes(likes) {
    return !!(likes);
  }

  function checkHashtags(hashTags) {
    return !!(hashTags);
  }

  function testMethods() {
    console.log('getPhotoPost');
    console.log('--------------------');

    console.log('id = 1: ');
    console.log(getPhotoPost('1'));


    console.log('id = 1000: ');
    console.log(getPhotoPost('1000'));
    console.log('--------------------');

    console.log('validatePhotoPost');
    console.log('--------------------');

    console.log('from array:');
    console.log(validatePhotoPost(getPhotoPost('1')));

    console.log('random:');
    console.log(validatePhotoPost({ author: 3 }));

    console.log('--------------------');

    console.log('addPhotoPost');
    console.log('--------------------');


    console.log('adding...');
    console.log(addPhotoPost({
      id: '11',
      authorId: '1',
      description: '♥',
      createdAt: new Date('2018-08-23T23:00:00'),
      authorName: 'ArtHome',
      photoLink: 'img/photos/photo1.jpg',
      whoLiked: ['Kaiska'],
      likedIt: true,
      hashtags: ['art', 'me'],
    }));
    console.log('--------------------');

    console.log('removePhotoPost');

    console.log('id = 1:');
    console.log(removePhotoPost('1'));

    console.log('id = 999:');
    console.log(removePhotoPost('999'));
    console.log('--------------------');

    console.log('getPhotoPosts');
    console.log('--------------------');

    console.log('1,3,{author:\'ArtHome\'} :');
    console.log(getPhotoPosts(1, 3, { author: 'ArtHome' }));

    console.log('2,2,{fromDate:new Date(\'2018-08-23T23:00:00\')}:');
    console.log(getPhotoPosts(2, 2, { fromDate: new Date('2018-08-23T23:00:00') }));

    console.log('0,4,{hashTags:[\'art\']}');
    console.log(getPhotoPosts(0, 4, { hashTags: ['art'] }));

    console.log('--------------------');
  }

  // testMethods();


  return {
    removePhotoPost,
    validatePhotoPost,
    getPhotoPost,
    addPhotoPost,
    editPhotoPost,
    getPhotoPosts,
    getUser,
    getFilter,
    setFilter,
    checkLoginData,
  };
}());
