//constants
const logoText = document.querySelector(`.hidden`);
const verticalLine = document.querySelector(`.vertical-line`);
const headerContainer = document.querySelector(`.header-container`);
const searchBar = document.querySelector(`.search-bar`);
const likeButton = document.querySelector(`.like-button`);
const likeSection = document.querySelector(`.like-section`);
let counter = 0;
const counterDivas = document.querySelector(`.counter`);
const commInput = document.querySelector(`.input-a-comment`);
const comments = document.querySelector(`.comments`);
const commentButton = document.querySelector(`.comment-button`)
//constants


// set to local storage
// localStorage.setItem('komentarai', JSON.stringify(value));

// get from local storage
// JSON.parse(localStorage.getItem('komentarai'));

// initial setup
const getSavedData = JSON.parse(localStorage.getItem('komentarai'));
const getSavedDataLikes = JSON.parse(localStorage.getItem('likes'));
let commentsArr = getSavedData || [];
let likesArr = getSavedDataLikes || [];
// start page function

function onPageStart(arr) {
  comments.innerHTML = '';
  arr.forEach(el => {
    const myName = document.createElement(`span`);
    const commDiv = document.createElement(`div`);
    const commentInput = document.createTextNode(`${el}`);
    myName.textContent = `Karolis`;
    myName.classList.add(`bold`);
    commDiv.classList.add(`commDiv`);
    commDiv.appendChild(myName);
    commDiv.appendChild(commentInput);
    comments.appendChild(commDiv);
    commInput.value = "";
  })
}

function onPageStartLikes(arr) {
  counter = 0;
  counterDivas.innerHTML = '';

    const noteSpan = document.createElement('span');
    
  if (likeButton.classList.contains('active')) {
      
    
   
    
      likeButton.classList.remove('active');
      counter--;
      noteSpan.textContent = `${counter}`;
      counterDivas.appendChild(noteSpan); 
      console.log('asd')
   
    
}
else {

  likeButton.classList.add(`active`);
  counter ++; 
  noteSpan.textContent = `${counter}`;
  counterDivas.appendChild(noteSpan); 
    console.log('dsa')
  
  
}
  
console.log(localStorage);
}

 

//-------------------------------------------------------------------------------

//function to style header on scroll
window.addEventListener(`scroll`, function() {
  if (this.window.scrollY > 30) {
      logoText.style.display = `none`;
      verticalLine.style.display = `none`;
      headerContainer.style.padding = `13px 26px`;
      searchBar.style.margin = `0px 0px 0px 150px`;
      headerContainer.style.transition = "all 1s";
    }  
    else {
      logoText.style.display = `block`;
      verticalLine.style.display = `block`;
      headerContainer.style.padding = `26px 26px`;
      searchBar.style.margin = `0px 0px 0px 0px`;
  }
})
//function to style header on scroll

//-------------------------------------------------------------------------------

//like and unlike button without localstorage

//like and unlike button without localstorage
likeButton.addEventListener(`click`, function() {
  likesArr.push(counter);
  localStorage.setItem(`likes`, JSON.stringify(likesArr));
  onPageStartLikes(likesArr);
})
//-------------------------------------------------------------------------------

//comment section without localstorage
commInput.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
    commentsArr.push(commInput.value);
    localStorage.setItem('komentarai', JSON.stringify(commentsArr));
    onPageStart(commentsArr);
  }
});
//comment section without localstorage

//---------------------------------------------------------------------------------

//comment button
commentButton.addEventListener(`click`, function(){
  commInput.focus();
    
})
//comment button


// load saved comments

onPageStart(commentsArr);
onPageStartLikes(likesArr);
