const doc={get:function(e,t){return"string"==typeof t?document.querySelector(t).querySelector(e):t?t.querySelector(e):document.querySelector(e)},getAll:function(e,t){return"string"==typeof t?Array.prototype.slice.call(document.querySelector(t).querySelectorAll(e)):t?Array.prototype.slice.call(t.querySelectorAll(e)):Array.prototype.slice.call(document.querySelectorAll(e))},id:function(e){return document.getElementById(e)},create:function(e,t,o,n,c){let r=document.createElement(e);if(t&&t.appendChild(r),o&&Array.isArray(o))for(let e=0;e<o.length;e++)r.classList.add(o[e]);else o&&r.classList.add(o);if("object"==typeof n)for(let e=0;e<Object.entries(n).length;e++)r.style.setProperty(Object.entries(n)[e][0],Object.entries(n)[e][1]);if("object"==typeof c)for(let e=0;e<Object.entries(c).length;e++)r.setAttribute(Object.entries(c)[e][0],Object.entries(c)[e][1]);return r}},checkifLoggedIn=()=>{let e=localStorage.getItem("x-auth");console.log(e),e||(window.location.href="../login.html")},profilePage=document.getElementById("profile-page"),registerPage=document.getElementById("registerPage"),loginPage=document.getElementById("loginPage"),feedPage=document.getElementById("feedPage"),commentsPage=document.getElementById("commentsPage");if(loginPage&&registerPage||checkifLoggedIn(),profilePage){const e=document.getElementById("optionsCloseBtn"),t=document.getElementById("optionsOpenBtn"),o=document.getElementById("optionsWindow");e.addEventListener("click",()=>{o.style.display="none"}),t.addEventListener("click",()=>{o.style.removeProperty("display")})}if(registerPage){const e=()=>{let e=document.getElementById("registerUsername").value,t=document.getElementById("registerEmail").value,o=document.getElementById("registerPassword").value;if(o===document.getElementById("registerRPassword").value){let n={password:o,username:e,email:t};fetch("http://localhost:3000/instagram/user/register",{method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}}).then(e=>{if(console.log(e),200==e.status)return e.json();alert("Registration failed")}).then(e=>{e&&(window.location.href="../front/login.html")}).catch(e=>{console.log(e)})}};document.getElementById("registerSubmitBtn").addEventListener("click",e)}if(loginPage){const e=()=>{let e=document.getElementById("loginEmail").value,t=document.getElementById("loginPassword").value;console.log("email",e,"password",t);let o={email:e,password:t};fetch("http://localhost:3000/instagram/user/login",{method:"POST",body:JSON.stringify(o),headers:{"Content-Type":"application/json"}}).then(e=>{if(console.log(e),!e.ok)throw Error(e);let t=e.headers.get("x-auth");localStorage.setItem("x-auth",t),console.log(t)}).then(e=>{window.location.href="../front/index.html"}).catch(e=>{console.log(e)})};document.getElementById("loginSubmitBtn").addEventListener("click",e)}if(feedPage){(()=>{let e=localStorage.getItem("x-auth");fetch("http://localhost:3000/instagram/post/getAllPosts",{method:"GET",headers:{"x-auth":e,"Content-Type":"application/json"}}).then(e=>{if(console.log(e),!e.ok)throw Error(e);return e.json()}).then(e=>{console.log(e);let t=doc.id("feed");for(let o=0;o<e.length;o++){let n=doc.create("article",t,"post"),c=doc.create("section",n,"post-header"),r=doc.create("a",c,"post-author");doc.create("div",r,["user-image","user-image--post-author"],{"background-image":'url("./assets/images/user.jpg")'});doc.create("p",r,"post-author__name").innerText=e[o].user.username;doc.create("img",n,"post-image",0,{src:"../"+e[o].postPic});let l=doc.create("section",n,"post-interactions"),a=doc.create("div",l,"interaction-icons");doc.create("div",a,"interaction-icons__like"),doc.create("div",a,"interaction-icons__comment",0,{"data-parentPost":e[o]._id}),doc.create("div",a,"interaction-icons__share");doc.create("p",l,["count","count--likes"]).innerText=e[o].likes.length;let s=doc.create("div",l,"post-comments"),i=doc.create("div",s,"comment");for(doc.create("a",i,"comment__author",0,{href:"./profile.html"}).innerText=e[o].user.username,doc.create("span",i,"comment__content").innerText=e[o].postDescription,j=0;j<e[o].comments.length;j++){let t=doc.create("div",s,"comment");doc.create("a",t,"comment__author",0,{href:"./profile.html"}).innerText=e[o].comments[j].user.username,doc.create("span",t,"comment__content").innerText=e[o].comments[j].comment}}}).catch(e=>{console.log(e)})})()}if(commentsPage){checkifLoggedIn(),document.getElementById("commentsBackBtn").addEventListener("click",()=>{window.location.href="index.html"});const e=()=>{let e=document.getElementById("comment").value,t=localStorage.getItem("x-auth"),o={comment:e};fetch("http://localhost:3000/instagram/comment/create",{method:"POST",body:JSON.stringify(o),headers:{"x-auth":t,"Content-Type":"application/json"}}).then(e=>{if(console.log(e),!e.ok)throw Error(e)}).then(e=>{alert("Item added successfully")}).catch(e=>{console.log(e),alert("Adding failed")})};(()=>{let e=document.getElementsByClassName("comments"),t=localStorage.getItem("x-auth");e.innerHTML="",fetch("http://localhost:3000/instagram/comment/getAllComments",{method:"GET",headers:{"x-auth":t,"Content-Type":"application/json"}}).then(e=>{if(!e.ok)throw Error(e);return e.json()}).then(e=>{console.log(e),document.getElementsByClassName("comments").innerHTML="";let t=document.createElement("ul");for(let o=0;o<e.length;o++){let n=document.createElement("li"),c=document.createElement("p");c.textContent=e[o].user.username+"  "+e[o].comment,n.appendChild(c),t.appendChild(n)}document.getElementsByClassName("comments")[0].appendChild(t)}).catch(e=>{console.log(e)})})(),document.getElementById("postComment").addEventListener("click",()=>{e(),location.reload()})}
//# sourceMappingURL=prod.js.map
