//Use IIFE (Immediately Invoked Functions Expressions)
(function () {

  const urlMain = "https://lighthouse-user-api.herokuapp.com"
  const urlIndex = urlMain + "/api/v1/users/"

  const data = []

  const userList = document.getElementById("users")

  const filterGender = document.getElementById("filter-gender")


  function getData() {
    // Before sending request: remove old data and show loading
    userList.innerHTML = ''
    userList.innerHTML = `
      <div class="row justify-content-center">
        <div class="spinner-border text-muted"></div>
      </div>
    `
    axios.get(urlIndex)
      .then(response => {
        let users = response.data.results
        // "..."  ===> ES6 提供的新語法「展開運算子 (spread operator)」
        data.push(...response.data.results)
        console.log(data)
        data.forEach(item => {
          item.show = true
        })
        displayUsers(data)
      }).catch(error => console.log(error))

  }

  function displayUsers(data) {
    userList.innerHTML = ''
    userList.innerHTML = `
      <div class="row justify-content-center">
        <div class="spinner-border text-muted"></div>
      </div>
    `

    data.forEach(item => {
      if (item.show === true) {
        let userCard = document.createElement('div')
        userCard.setAttribute('class', 'col-md-3 m-1 pt-3 card')
        userCard.innerHTML = `
          <h5 class="card-title">${item.name} ${item.surname}</h5>
          <img class="card-img-top " src ="${item.avatar}" alt ="Image missing" >
            <div class="card-body">
              <h7 class="font-weight-bold">Email:</h7>
              <p class="card-text">${item.email}</p>
              <button class="btn btn-primary btn-more-detail" data-toggle="modal" data-target="#detail-modal" data-id="${item.id}">More...</button>
            </div>
      `
        /*
        htmlContent += `
        <div class=" col-md-3 m-1 pt-3 card">
          <h5 class="card-title">${item.name} ${item.surname}</h5>
          <img class="card-img-top " src ="${item.avatar}" alt ="Image missing" >
            <div class="card-body">
              <h7 class="font-weight-bold">Email:</h7>
              <p class="card-text">${item.email}</p>
              <button class="btn btn-primary btn-more-detail" data-toggle="modal" data-target="#detail-modal" data-id="${item.id}">More...</button>
            </div>
        </div>
      `*/
        userList.appendChild(userCard)
      }
    }
    )

    userList.removeChild(userList.children[0])
  }



  function showDetails(id) {
    const modalName = document.getElementById('modal-name')
    const modalImg = document.getElementById('modal-img')
    const modalInfo = document.getElementById('modal-info')
    const modalFooter = document.getElementById('modal-updated-date')
    const urlShow = urlIndex + id

    console.log(urlShow)

    axios.get(urlShow)
      .then(response => {
        let info = response.data
        console.log(info)
        modalName.innerText = `${info.name} ${info.surname}`
        modalImg.src = `${info.avatar}`
        modalFooter.innerText = `Last update: ${info.updated_at}`
        modalInfo.innerHTML = `  
            <li>Gender : ${info.gender}</li>
            <li>Age : ${info.age}</li>
            <li>Region : ${info.region}</li>
            <li>Birthday : ${info.birthday}</li>
            <li>E-mail : ${info.email}</li>`

      }).catch(error => console.log(error))
  }

  function filterUsers(key) {
    console.log("filter: " + key)
    data.forEach(item => {
      if (key === "all") {
        item.show = true
      } else if (!(item.gender === key)) {
        item.show = false
      } else {
        item.show = true
      }
      displayUsers(data)
    })
  }

  //Main
  getData()

  userList.addEventListener("click", event => {
    if (event.target.matches('.btn-more-detail')) {
      console.log(event.target.dataset.id)  // modify here
      showDetails(event.target.dataset.id)
    }
  })

  filterGender.addEventListener("click", event => {
    if (event.target.matches('.filter-gender')) {
      let key = event.target.dataset.filter
      console.log(event.target.innerText)
      event.currentTarget.children[0].innerText = event.target.innerText
      filterUsers(key)
    }
  })






















})()







