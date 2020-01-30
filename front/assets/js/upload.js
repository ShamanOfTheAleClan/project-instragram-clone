const checkifLoggedIn = () => {
    let token = localStorage.getItem('x-auth');
    console.log(token)
    if (!token) {
        window.location.href = "../login.html";
    }
};

checkifLoggedIn();

const createPost = () => {
    
    let newPost = document.getElementById('postDesc').value

    let token = localStorage.getItem('x-auth');
    let body = {
        comment: newComment,
        postId:postId
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