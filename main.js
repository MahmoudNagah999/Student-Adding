const myForm = document.querySelectorAll('#my-form');
const nameInput = document.querySelectorAll('#name');
const emailInput = document.querySelectorAll('#email');
const msg = document.querySelectorAll('.msg');
const userList = document.querySelectorAll('#users');

myForm.addEventListener('submit', x);

function x(e){
  e.preventDefault();

  if(nameInput.value === '' || emailInput.value === ''){
    msg.classList.add('error')
    msg.innerHTML = 'please enter all data'
    setTimeout(()=> msg.remove(),3000);
  }else{
   const li = document.createElement('li');
   li.appendChild(document.createTextNode(`${nameInput.value}`  `${emailInput.value}`));

   userList.appendChild(li);
//clear fields
    nameInput.value  = '';
    emailInput.value = ';'

  }

}