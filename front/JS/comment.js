const checkifLoggedIn = () => {
    let token = localStorage.getItem('x-auth');
    console.log(token)
    if (!token) {
        window.location.href = "../login.html";
    }
};

checkifLoggedIn();





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
       // console.log(e);
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
        let ul= document.createElement('ul');
         for (let i = 0; i < myJson.length; i++) {
            let li = document.createElement('li');
            let p = document.createElement('p');
            p.textContent = myJson[i].user.username +"  "+ myJson[i].comment;
            li.appendChild(p);
            ul.appendChild(li);   
        }
        document.getElementsByClassName('comments')[0].appendChild(ul);
        
    }).catch((e) => {
        console.log(e);
    })
   
};
createComments();


const commentBtn = document.getElementById('postComment')
commentBtn.addEventListener('click', () => {
    createComment();
    location.reload();
})


