// const goToRegister = () => {
//     window.location.href = "../front/register.html";
// };

const loginPage = document.getElementById('loginPage');

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