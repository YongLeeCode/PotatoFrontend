
import TokenStorage from './token.js';
import ExternalServices from "./ExternalServices.js";
const tokenStorage = new TokenStorage();
const source = new ExternalServices();
let token = tokenStorage.getToken();

init();

const tab = document.querySelectorAll('.info-menu p');
// console.log(tab);
const uiItems = document. querySelectorAll('.info-items');
const ui = document.querySelector('.info__container');
console.log(uiItems);

if(ui.offsetWidth < 770){
  document.querySelector('.info-contents').style.height = "3300px";
}

// console.log(uiItems);
document.addEventListener('click', (e)=>{
  if(e.target.parentNode.className=='info-menu'){
    tab.forEach(element=> element.classList.remove('active'));
    e.target.classList.add('active');
    uiItems.forEach(element=> element.classList.remove('active'));
    const data = e.target.getAttribute('data-alt');
    document.getElementById(data).classList.add('active');
    console.log(ui.offsetWidth);
    // if(ui.offsetWidth< "769"){
    //   console.log(getComputedStyle(ui).width);
    //   if (data == 'tab4'){
    //     document.querySelector('.ui-contents').style.height = "750px";
    //   }
    //   else{
    //     document.querySelector('.ui-contents').style.height = "1100px";
    //   }
    // }
    // else{
      // console.log("desktop");
    // document.querySelector('.info-contents').style.height = "1100px";
    // }
    if(ui.offsetWidth < 770){
      document.querySelector('.info-contents').style.height = "3300px";
    }
  }
})

async function init(){
  if (token) {
    console.log('init')
    token = tokenStorage.getToken();
    const res = await source.me(token);
    console.log(res);
    if(res.code==200){
      document.querySelector('.signoutBtn').classList.add('display');
      document.querySelector('.profileBtn').classList.add('display');
      document.querySelector('.loginBtn').classList.add('none');
      document.querySelector('.signupBtn').classList.add('none');
      
    }
  }
}
document.querySelector('.signoutBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  if (confirm("Do you want to sign out?")){
  tokenStorage.clearToken();
  document.querySelector('.signoutBtn').classList.remove('display');
  document.querySelector('.loginBtn').classList.remove('none');
  document.querySelector('.profileBtn').classList.remove('display');
  document.querySelector('.signupBtn').classList.remove('none');
  }
})

/* Header Trigger */
$('.trigger').click(function(){
  console.log("clicked");
  $(this).toggleClass('active')
  $('.gnb').toggleClass('active')
})
$('.gnb a, section').click(function(){
  $('.gnb, .trigger').removeClass('active')
})

$('.infoTrigger').click(function(){
  console.log("clicked");
  $(this).toggleClass('active');
  $('.info-menu').toggleClass('active');
})
$('.info-menu p').click(function(){
  $('.info-menu, .infoTrigger').removeClass('active')
  $('html').animate({scrollTop: 0}, 300)
})

$('.info-items').click(function(){
  $('.info-menu, .infoTrigger').removeClass('active')
})