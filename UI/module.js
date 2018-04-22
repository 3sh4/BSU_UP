var Module = (function () {

    var photoPosts = [
        {
            id: '1',
            authorId: '1',
            description: '♥',
            createdAt: new Date('2018-08-23T23:00:00'),
            authorName: 'ArtHome',
            photoLink: 'img/photos/photo1.jpg',
            whoLiked: ['Kaiska'],
            likedIt: true,
            hashtags: ['art', 'me']
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
            hashtags: []
        },
        {
            id: '3',
            authorId: '1352',
            description: 'qwerty',
            createdAt: new Date('2018-11-03T23:00:00'),
            authorName: 'KeyArtGroup',
            photoLink: 'img/photos/photo3.jpg',
            whoLiked: ['KeyAd'],
            likedIt: true,
            hashtags: ['idk']
        },
        {
            id: '4',
            authorId: '15325',
            description: ':DD',
            createdAt: new Date('2008-08-23T23:00:00'),
            authorName: 'Smile',
            photoLink: 'img/photos/photo4.jpg',
            whoLiked: ['Me'],
            likedIt: true,
            hashtags: [':c', ':D', 'smiles']
        },
        {
            id: '5',
            authorId: '13525325',
            description: 'bla bla BLA',
            createdAt: new Date('2018-08-11T23:00:00'),
            authorName: '507',
            photoLink: 'img/photos/photo5.jpg',
            whoLiked: [],
            likedIt: false,
            hashtags: ['calcacacwalcawcl']
        },
        {
            id: '6',
            authorId: '7897',
            description: '',
            createdAt: new Date('2018-08-23T23:00:00'),
            authorName: 'EmptyName',
            photoLink: 'img/photos/photo6.jpg',
            whoLiked: ['123', '1313131312'],
            likedIt: true,
            hashtags: ['fefeffefe']
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
            hashtags: []
        },
        {
            id: '8',
            authorId: '1',
            description: '♦',
            createdAt: new Date('2018-08-23T23:00:00'),
            authorName: 'DY',
            photoLink: 'img/photos/photo8.jpg',
            whoLiked: ['fctgvbhjnkml,'],
            likedIt: true,
            hashtags: ['xdrcftgvbhjn']
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
            hashtags: ['zsxdfcgvbhjn']
        },
        {
            id: '10',
            authorId: '1345678',
            description: 'xrxdcftgvbhj',
            createdAt: new Date('2018-08-23T23:00:00'),
            authorName: 'ArtHome',
            photoLink: 'img/photos/photo1.jpg',
            whoLiked: ['Kaiska'],
            likedIt: true,
            hashtags: ['art']
        }
    ];

    var getPhotoPosts = function (skip = 0, top = 0, filterConfig = {}) {
        let filtered = photoPosts.filter((post) => checkForFilter(filterConfig, post));

        return filtered.slice(skip, top + skip);
    };

    function checkForFilter(filter, post) {
        if (!!filter['author'] && post.authorName !== filter['author'])
            return false;

        if (!!filter['hashTags'] && !filter['hashTags'].every((hashtag) => post.hashtags.includes(hashtag)))
            return false;

        if (!!filter['fromDate'] && !(filter['fromDate'] <= post.createdAt))
            return false;

        return true;
    }

    var removePhotoPost = function (id) {
        let ind = photoPosts.findIndex(function (el) {
            return id === el.id;
        });

        if (ind == -1)
            return false;

        photoPosts.splice(ind, 1);
        return true;
    };

    var addPhotoPost = function (photoPost) {
        if (!validatePhotoPost(photoPost))
            return false;

        photoPosts.push(photoPost);
        return true;
    };

    var getPhotoPost = function (id) {
        let ind = photoPosts.findIndex(function (el) {
            return id === el.id;
        });

        return ind === -1 ? null : photoPosts[ind];
    };

    var validatePhotoPost = function (photoPost) {
        return checkAuthorId(photoPost.authorId) &&
            checkAuthorName(photoPost.authorName) &&
            checkCreationDate(photoPost.createdAt) &&
            checkDescription(photoPost.description) &&
            checkHashtags(photoPost.hashtags) &&
            checkLikes(photoPost.whoLiked) &&
            checkId(photoPost.id) &&
            checkLink(photoPost.photoLink);
    };

    var editPhotoPost = function (id, photoPost) {
        let ind = photoPosts.findIndex(function (el) {
            return id === el.id;
        });

        if (ind === -1)
            return false;

        if (!!photoPost['authorId'] && checkAuthorId(photoPost.authorId))
            photoPosts[ind].authorId = photoPost.authorId;

        if (!!photoPost['id'] && checkId(photoPost.id))
            photoPosts[ind].id = photoPost.id;

        if (!!photoPost['description'] && checkDescription(photoPost.description))
            photoPosts[ind].description = photoPost.description;

        if (!!photoPost['createdAt'] && checkCreationDate(photoPost.createdAt))
            photoPosts[ind].createdAt = photoPost.createdAt;

        if (!!photoPost['authorName'] && checkAuthorName(photoPost.authorName))
            photoPosts[ind].authorName = photoPost.authorName;

        if (!!photoPost['photoLink'] && checkLink(photoPost.photoLink))
            photoPosts[ind].photoLink = photoPost.photoLink;

        if (!!photoPost['whoLiked'] && checkLikes(photoPost.whoLiked))
            photoPosts[ind].whoLiked = photoPost.whoLiked;

        if (!!photoPost['hashtags'] && checkHashtags(photoPost.hashtags))
            photoPosts[ind].hashtags = photoPost.hashtags;

        return true;
    };

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

        console.log("id = 1: ");
        console.log(getPhotoPost('1'));


        console.log("id = 1000: ");
        console.log(getPhotoPost('1000'));
        console.log('--------------------');

        console.log('validatePhotoPost');
        console.log('--------------------');

        console.log('from array:');
        console.log(validatePhotoPost(getPhotoPost('1')));

        console.log('random:');
        console.log(validatePhotoPost({author : 3}));

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
            hashtags: ['art', 'me']
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

        console.log('1,3,{author:\'ArtHome\'} :')
        console.log(getPhotoPosts(1,3,{author:'ArtHome'}));

        console.log('2,2,{fromDate:new Date(\'2018-08-23T23:00:00\')}:');
        console.log(getPhotoPosts(2,2,{fromDate:new Date('2018-08-23T23:00:00')}));

        console.log('0,4,{hashTags:[\'art\']}');
        console.log(getPhotoPosts(0,4,{hashTags:['art']}));

        console.log('--------------------');
    }

    testMethods();


    return {
        removePhotoPost: removePhotoPost,
        validatePhotoPost: validatePhotoPost,
        getPhotoPost: getPhotoPost,
        addPhotoPost: addPhotoPost,
        editPhotoPost: editPhotoPost,
        getPhotoPosts: getPhotoPosts
    }

}());