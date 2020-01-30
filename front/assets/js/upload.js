// const checkifLoggedIn = () => {
//     let token = localStorage.getItem('x-auth');
//     console.log(token)
//     if (!token) {
//         window.location.href = "../login.html";
//     }
// };

// checkifLoggedIn();

const createPost = () => {

const submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        let submitetFile = document.getElementById('submitedFile');
        let postDescription = doc.id('postDesc');
        let token = localStorage.getItem('x-auth');

        let data = new FormData()
        data.append('avatar', submitetFile.files[0]);
        data.append('postDescription', postDescription);

        fetch('http://localhost:3000/instagram/user/uploadFile', {
            method: 'POST',
            body: data,
            headers: {

                'x-auth': token,
            }
        }).catch((error) => {
            console.log(error);
        })

    })
};