const profilePage=document.getElementById("profile-page");if(profilePage){const e=document.getElementById("optionsCloseBtn"),t=document.getElementById("optionsOpenBtn"),n=document.getElementById("optionsWindow");e.addEventListener("click",()=>{n.style.display="none"}),t.addEventListener("click",()=>{n.style.removeProperty("display")})}const registerPage=document.getElementById("registerPage");if(registerPage){const e=()=>{let e=document.getElementById("registerUsername").value,t=document.getElementById("registerEmail").value,n=document.getElementById("registerPassword").value;if(n===document.getElementById("registerRPassword").value){let o={password:n,username:e,email:t};fetch("http://localhost:3000/instagram/user/register",{method:"POST",body:JSON.stringify(o),headers:{"Content-Type":"application/json"}}).then(e=>{if(console.log(e),200==e.status)return e.json();alert("Registration failed")}).then(e=>{e&&(alert("Registration successful"),window.location.href="../front/login.html")}).catch(e=>{console.log(e)})}};document.getElementById("registerSubmitBtn").addEventListener("click",e)}
//# sourceMappingURL=prod.js.map
