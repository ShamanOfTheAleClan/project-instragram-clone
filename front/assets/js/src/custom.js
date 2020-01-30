const doc = {

    get: function (query, location) {
        if (typeof location === 'string') return document.querySelector(location).querySelector(query);
        if (!location) return document.querySelector(query);
        return location.querySelector(query);
    },

    getAll: function (query, location) {
        if (typeof location === 'string') return Array.prototype.slice.call(document.querySelector(location).querySelectorAll(query));
        if (!location) return Array.prototype.slice.call(document.querySelectorAll(query));
        return Array.prototype.slice.call(location.querySelectorAll(query));
    },

    id: function (query) {
        return document.getElementById(query);
    },

    create: function (item, appendTo, setClass, style, attributes) {
        let a = document.createElement(item);
        if (!!appendTo) appendTo.appendChild(a);
        if (!!setClass && Array.isArray(setClass)) {
            for (let i = 0; i < setClass.length; i++) {
                a.classList.add(setClass[i]);
            }
        } else if (!!setClass) a.classList.add(setClass);
        if (typeof style === 'object') {
            for (let i = 0; i < Object.entries(style).length; i++) {
                a.style.setProperty(Object.entries(style)[i][0], Object.entries(style)[i][1]);
            }
        }
        if (typeof attributes === 'object') {
            for (let i = 0; i < Object.entries(attributes).length; i++) {
                a.setAttribute(Object.entries(attributes)[i][0], Object.entries(attributes)[i][1]);
            }
        }
        return a;
    },
};


const checkifLoggedIn = () => {
    let token = localStorage.getItem('x-auth');
    console.log(token)
    if (!token) {
        window.location.href = "../login.html";
    }
};

const profilePage = document.getElementById('profile-page');
const registerPage = document.getElementById('registerPage');
const loginPage = document.getElementById('loginPage');
const feedPage = document.getElementById('feedPage');
const commentsPage = document.getElementById('commentsPage');

if (!loginPage || !registerPage) checkifLoggedIn();


// Profile page -> Options

if (!!profilePage) {

    const optionsCloseBtn = document.getElementById('optionsCloseBtn');
    const optionsOpenBtn = document.getElementById('optionsOpenBtn');
    const optionsWindow = document.getElementById('optionsWindow');

    optionsCloseBtn.addEventListener('click', () => {
        optionsWindow.style.display = 'none';
    });

    optionsOpenBtn.addEventListener('click', () => {
        optionsWindow.style.removeProperty('display');
    });
}



// Register page


if (!!registerPage) {
    const registerBtn = document.getElementById('registerSubmitBtn');

    const registerUser = () => {
        let username = document.getElementById('registerUsername').value;
        let email = document.getElementById('registerEmail').value;
        let password = document.getElementById('registerPassword').value;
        let rPassword = document.getElementById('registerRPassword').value;

        if (password === rPassword) {

            let body = {
                password: password,
                username: username,
                email: email
            }
            fetch('http://localhost:3000/instagram/user/register', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((header) => {
                console.log(header);
                if (header.status == 200) {
                    return header.json();
                } else {
                    alert('Registration failed')
                }
            }).then((response) => {
                if (response) {
                    // alert('Registration successful')
                    window.location.href = '../front/login.html';
                }
            }).catch((e) => {
                console.log(e)
            })
        }
    };

    registerBtn.addEventListener('click', registerUser);
}


// Login page


if (!!loginPage) {
    const login = () => {
        let email = document.getElementById('loginEmail').value;
        let password = document.getElementById('loginPassword').value;
        console.log('email', email, 'password', password)
        let body = {
            email: email,
            password: password,
        }
        fetch('http://localhost:3000/instagram/user/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((header) => {
            console.log(header);

            if (!header.ok) {
                throw Error(header);
            }

            let token = header.headers.get('x-auth');
            localStorage.setItem('x-auth', token);
            console.log(token);
        }).then((response) => {
            // alert('Login successful')
            window.location.href = '../front/index.html';
        }).catch((e) => {
            console.log(e);
            // alert('Login failed');
        })


    }

    const loginBtn = document.getElementById('loginSubmitBtn');

    loginBtn.addEventListener('click', login);
}

// Feed page


if (!!feedPage) {

    const drawPosts = () => {
        //let list = document.getElementsByClassName('comments');
        let token = localStorage.getItem('x-auth');
        // list.innerHTML = '';
        fetch('http://localhost:3000/instagram/post/getAllPosts', {
            method: 'GET',
            headers: {
                'x-auth': token,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response);
            
            if (!response.ok) {
                throw Error(response);
            }
            return response.json();
        }).then((myJson) => {
            console.log(myJson)
            // let content = document.createElement('div');

            // content.setAttribute('class', 'card-container')
            let feed = doc.id('feed');

            for (let i = 0; i < myJson.length; i++) {
                let post = doc.create('article', feed, "post");


                let postHeader = doc.create('section', post, 'post-header');
                let postAuthor = doc.create('a', postHeader, 'post-author');
                let postAuthorUserImage = doc.create('div', postAuthor, ['user-image', 'user-image--post-author'], { 'background-image': 'url("./assets/images/user.jpg")' })
                let postAuthorName = doc.create('p', postAuthor, 'post-author__name');
                postAuthorName.innerText = myJson[i].user.username;


                let postImage = doc.create('img', post, 'post-image', 0, { src: "../"+myJson[i].postPic });


                let postInteractions = doc.create('section', post, 'post-interactions');

                let interactionIcons = doc.create('div', postInteractions, 'interaction-icons');
                let interactionsIconsLike = doc.create('div', interactionIcons, 'interaction-icons__like');
                let ineteractionIconsComment = doc.create('div', interactionIcons, 'interaction-icons__comment', 0, { 'data-parentPost': myJson[i]._id });
                let interactionIconsShare = doc.create('div', interactionIcons, 'interaction-icons__share');
                let likeCount = doc.create('p', postInteractions, ['count', 'count--likes']);
                likeCount.innerText = myJson[i].likes.length;

                let postComments = doc.create('div', postInteractions, 'post-comments');
                let postDescription = doc.create('div', postComments, 'comment');
                let postDescriptionAuthor = doc.create('a', postDescription, 'comment__author', 0, { href: './profile.html' });
                postDescriptionAuthor.innerText = myJson[i].user.username;
                let postDescriptionText = doc.create('span', postDescription, 'comment__content');
                postDescriptionText.innerText = myJson[i].postDescription;


                for (j = 0; j < myJson[i].comments.length; j++) {

                    let comment = doc.create('div', postComments, 'comment');
                    let commentAuthor = doc.create('a', comment, 'comment__author', 0, { href: './profile.html' });
                    commentAuthor.innerText = myJson[i].comments[j].user.username;
                    let commentText = doc.create('span', comment, 'comment__content');
                    commentText.innerText = myJson[i].comments[j].comment;
                }

                

                // commentButton.addEventListener("click", () => {
                //     newCommentInput.setAttribute("id", "comment")
                //     createComment(myJson[i]._id);
                //     console.log(i)
                //     newCommentInput.removeAttribute("id")
                //     //location.reload();

                // });

            }
            // document.getElementsByClassName('card-container')[0].appendChild(content);

        }).catch((e) => {
            console.log(e);
        })

    };
    drawPosts();
}


// Comments page



if (!!commentsPage) {
    checkifLoggedIn();

    const backBtn = document.getElementById('commentsBackBtn');

    backBtn.addEventListener('click', () => {
        window.location.href = "index.html";
    });


    const createComment = () => {

        let newComment = document.getElementById('comment').value;
        let token = localStorage.getItem('x-auth');
        let body = {
            comment: newComment,
        }

        fetch('http://localhost:3000/instagram/comment/create', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'x-auth': token,
                'Content-Type': 'application/json'
            }
        }).then((header) => {
            console.log(header);
            if (!header.ok) {
                throw Error(header);
            }
        }).then((response) => {
            alert('Item added successfully')
        }).catch((e) => {
            console.log(e);
            alert('Adding failed');
        })

    };

    const createComments = () => {
        let list = document.getElementsByClassName('comments');
        let token = localStorage.getItem('x-auth');
        list.innerHTML = '';
        fetch('http://localhost:3000/instagram/comment/getAllComments', {
            method: 'GET',
            headers: {
                'x-auth': token,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            //console.log(response);
            if (!response.ok) {
                throw Error(response);
            }
            return response.json();
        }).then((myJson) => {
            console.log(myJson)
            let div = document.getElementsByClassName("comments");
            div.innerHTML = '';
            let ul = document.createElement('ul');

            for (let i = 0; i < myJson.length; i++) {
                let li = document.createElement('li');
                let p = document.createElement('p');
                p.textContent = myJson[i].user.username + "  " + myJson[i].comment;
                li.appendChild(p);
                ul.appendChild(li);
            }
            document.getElementsByClassName('comments')[0].appendChild(ul);

        }).catch((e) => {
            console.log(e);
        })

    };
    createComments();


    const commentBtn = document.getElementById('postComment');

    commentBtn.addEventListener('click', () => {
        createComment();
        location.reload();
    });
}