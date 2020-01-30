const checkifLoggedIn = () => {
    let token = localStorage.getItem('x-auth');
    console.log(token)
    if (!token) {
        window.location.href = "../login.html";
    }
};

checkifLoggedIn();
//matosi tik ant 1 vartotojo

const createComment = (postId) => {

    let newComment = document.getElementById('comment').value
    console.log(postId)
    let token = localStorage.getItem('x-auth');
    let body = {
        comment: newComment,
        postId: postId
    }

    fetch('http://localhost:3000/instagram/comment/create', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'x-auth': token,
            'Content-Type': 'application/json'
        }
    }).then((header) => {
        //console.log(header);
        if (!header.ok) {
            throw Error(header);
        }
    }).then((response) => {
        alert('Item added successfully')
    }).catch((e) => {
        // console.log(e);
        alert('Adding failed');
    })

};



// const createComments = () => {
//     let list = document.getElementsByClassName('comments');
//     let token = localStorage.getItem('x-auth');
//     list.innerHTML = '';
//     fetch('http://localhost:3000/instagram/comment/getAllComments', {
//         method: 'GET',
//         headers: {
//             'x-auth': token,
//             'Content-Type': 'application/json'
//         }
//     }).then((response) => {
//         //console.log(response);
//         if (!response.ok) {
//             throw Error(response);
//         }
//         return response.json();
//     }).then((myJson) => {
//         console.log(myJson)
//         let div = document.getElementsByClassName("comments");
//         div.innerHTML = '';
//         let ul= document.createElement('ul');
//          for (let i = 0; i < myJson.length; i++) {
//             let li = document.createElement('li');
//             let p = document.createElement('p');
//             p.textContent = myJson[i].user.username +"  "+ myJson[i].comment;
//             li.appendChild(p);
//             ul.appendChild(li);   
//         }
//         document.getElementsByClassName('comments')[0].appendChild(ul);

//     }).catch((e) => {
//         console.log(e);
//     })

// };
// createComments();


const commentBtn = document.getElementById('postComment')
commentBtn.addEventListener('click', () => {
    createComment();
    location.reload();
})

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
        //console.log(myJson)
        let content = document.createElement('div');

        content.setAttribute('class', 'card-container')
        for (let i = 0; i < myJson.length; i++) {
            let div = document.createElement('div')
            div.setAttribute('class', 'card')
            div.innerHTML = '';

            let userInfo = document.createElement('div')
            userInfo.setAttribute('class', 'card-user')

            let userName = document.createElement('div')
            userName.setAttribute('class', 'card-username')
            userName.textContent = myJson[i].user.username

            let userPicture = document.createElement('img')
            userPicture.className = "sm-img"
            userPicture.src = 'images/dummy.jpg'
            userInfo.appendChild(userPicture)
            userInfo.appendChild(userName)

            let postPicture = document.createElement('div')
            postPicture.textContent = myJson[i].postPic

            let commentSecDiv = document.createElement('div')
            commentSecDiv.setAttribute('class', 'comment-section')

            let socIcons = document.createElement('div')
            socIcons.setAttribute('class', 'social-icons')

            let likeComment = document.createElement('div')

            let spanLike = document.createElement('span')
            spanLike.setAttribute('class', 'like-button')

            let likeI = document.createElement('i')
            likeI.setAttribute('class', 'far fa-heart')
            spanLike.appendChild(likeI)
            likeComment.appendChild(spanLike)

            let spanComment = document.createElement('span')
            spanComment.setAttribute('class', 'comment-button')

            let commentI = document.createElement('i')
            commentI.setAttribute('class', 'far fa-comment')
            spanComment.appendChild(commentI)
            likeComment.appendChild(spanComment)
            socIcons.appendChild(likeComment)

            let bookmarkI = document.createElement('i')
            bookmarkI.setAttribute('class', 'far fa-bookmark')
            socIcons.appendChild(bookmarkI)
            commentSecDiv.appendChild(socIcons)

            let likeSection = document.createElement('div')
            likeSection.setAttribute('class', 'like-section')
            //ideti if laiku suskaiciavimui (jei laiku nera-nerodyti)

            let counter = document.createElement('span')
            counter.setAttribute('class', 'counter')
            counter.innerText = "likes"
            likeSection.appendChild(counter)

            let description = document.createElement('div')
            description.textContent = myJson[i].user.username + "    " + myJson[i].postDescription

            let commentsDiv = document.createElement('div')
            commentsDiv.setAttribute('class', 'comments')
            let allPostComments = myJson[i].comments.length
            console.log(allPostComments)
            for (j = 0; j < allPostComments; j++) {

                let oneCommentDiv = document.createElement('div')
                //nerodo vardo tik user id
                oneCommentDiv.textContent = myJson[i].comments[j].user.username + ": " + myJson[i].comments[j].comment
                console.log('User: ', myJson[i].comments[j])
                commentsDiv.appendChild(oneCommentDiv)
            }

            let newCommentDiv = document.createElement('div')
            newCommentDiv.setAttribute('class', 'add-a-comment')

            const newCommentInput = document.createElement('input')
            newCommentInput.setAttribute("type", "text")

            newCommentInput.setAttribute("class", "input-a-comment")
            newCommentInput.setAttribute("placeholder", "Add a comment..")
            newCommentDiv.appendChild(newCommentInput)

            const commentButton = document.createElement('button')
            commentButton.innerText = "Post"
            commentButton.setAttribute('class', 'postComment')
            newCommentDiv.appendChild(commentButton)

            div.appendChild(userInfo)
            div.appendChild(postPicture)
            div.appendChild(commentSecDiv)
            div.appendChild(likeSection)
            div.appendChild(description)
            div.appendChild(commentsDiv)
            div.appendChild(newCommentDiv)
            content.appendChild(div)

            commentButton.addEventListener("click", () => {
                newCommentInput.setAttribute("id", "comment")
                createComment(myJson[i]._id);
                console.log(i)
                newCommentInput.removeAttribute("id")
                //location.reload();

            }

            )

        }
        document.getElementsByClassName('card-container')[0].appendChild(content);








    }).catch((e) => {
        console.log(e);
    })

};
drawPosts();


// const postBtn = document.getElementById('addPost')
// postBtn.addEventListener('click', () => {
//     createPost();
//     location.reload();
// })


