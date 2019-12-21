const h3 = document.querySelector('h3')
h3.innerHTML = 'Jasper Chen'

const p = document.querySelector('p')
p.innerText = 'The wandering cat.'

const img = document.querySelector('img')
img.src = 'https://assets-lighthouse.s3.amazonaws.com/uploads/user/photo/2133/medium_E14996110-dok_pp01.jpg'

function addList(ul, txt) {
  const li = document.createElement('li')
  ul.appendChild(li)
  li.innerText = txt
}

const ul = document.querySelector('ul')

addList(ul, 'Junior Mechanical Engineer')
addList(ul, 'Senior Traveler')

//li.innerHTML = 'Junior Mechanical Engineer'
