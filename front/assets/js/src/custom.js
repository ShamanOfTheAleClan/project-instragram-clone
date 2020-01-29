// Profile page -> Options
const profilePage = document.getElementById('profile-page');

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
const registerPage = document.getElementById('registerPage');

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