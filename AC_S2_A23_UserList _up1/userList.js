//Use IIFE (Immediately Invoked Functions Expressions)
(function () {

  //串接
  const urlMain = "https://lighthouse-user-api.herokuapp.com"
  const urlIndex = urlMain + "/api/v1/users/"

  //原始資料
  const data = []

  //顯示清單
  const userList = document.getElementById("users")

  //篩選器用
  const filterGender = document.getElementById("filter-gender")

  //分頁用
  const pagePick = document.getElementById("page-pick")
  const ITEM_PER_PAGE = 12
  let paginationData = []
  let totalPages
  let currentPage = 1

  //變換顯示功能用
  const switchMethod = document.getElementById('show-method')
  let displayMethod = 0 // 0 = card , 1 = list
  const instruction = document.getElementById('instruction')

  //最愛功能用
  let favoriteId = JSON.parse(localStorage.getItem('favoriteId')) || [] //存取最愛項目的id在local storage
  const navBar = document.getElementById('navbarSupportedContent')
  const favoriteList = document.getElementById('favorite-list')
  const initialList = document.getElementById('initial-list')

  //搜尋功能用
  const searchName = document.getElementById('search-name')

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
          item.favorite = favoriteId.includes(item.id.toString()) ? true : false
        })
        getTotalPages(data)

      }).catch(error => console.log(error))

  }

  function getTotalPages(data) {

    showController(data)

    let showCount = data.filter(item => item.show).length
    totalPages = Math.ceil(showCount / ITEM_PER_PAGE) || 1


    //initialize pagination bar
    let pageItemContent = ''

    if (totalPages !== 1) {
      pageItemContent += `
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" id="pg-last">
          <<
        </a>
      </li>`
    }

    for (let i = 0; i < totalPages; i++) {
      pageItemContent += `
      <li class="page-item">
        <a class="page-link" href="javascript:;" data-page="${i + 1}">${i + 1}</a>
      </li>
      `
    }
    if (totalPages !== 1) {
      pageItemContent += `
      <li class="page-item">
        <a class="page-link" href="javascript:;" aria-label="Next" id="pg-next">
          >>
        </a>
      </li>`
    }

    pagePick.innerHTML = pageItemContent

    getPageData(currentPage, data)
  }

  function getPageData(pageNum, data) {

    let filteredData = data.filter(item => item.show)
    paginationData = filteredData || paginationData
    let offset = (pageNum - 1) * ITEM_PER_PAGE
    let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)

    //update pagination bar
    if (totalPages !== 1) {
      if (parseInt(pageNum) === 1) {//第一頁時disable上一頁按鈕,復歸下一頁按鈕
        document.getElementById('pg-last').parentElement.classList.add('disabled')
        document.getElementById('pg-next').parentElement.classList.remove('disabled')
      } else if (parseInt(pageNum) === totalPages) {//最後一頁時disable下一頁按鈕,復歸上一頁按鈕
        document.getElementById('pg-last').parentElement.classList.remove('disabled')
        document.getElementById('pg-next').parentElement.classList.add('disabled')
      } else {//其他時復歸上下頁按鈕
        document.getElementById('pg-next').parentElement.classList.remove('disabled')
        document.getElementById('pg-last').parentElement.classList.remove('disabled')
      }
    }

    //切換顯示目前頁面按鈕反白
    document.querySelectorAll('.page-item').forEach(page => {
      if (page.classList.contains('active')) {
        page.classList.remove('active')
      } else if (parseInt(page.children[0].dataset.page) === parseInt(pageNum)) {
        page.classList.add('active')
      }
    })


    displayUsers(pageData, displayMethod)
  }

  function displayUsers(data, method) {
    userList.innerHTML = ''
    //先顯示載入圈圈
    userList.innerHTML = `
      <div class="row justify-content-center">
        <div class="spinner-border text-muted">
        </div>
      </div>
    `

    //選取Favorite 卻無 Favorite ID時
    console.log(favoriteId.length)
    console.log(favoriteList.parentElement.classList.contains('active'))
    if (!favoriteId.length && favoriteList.parentElement.classList.contains('active')) {
      console.log("oops!")
      htmlContent = `
      <h4 class="my-3">Seems you haven't add any favorite friends! Back to Home and press <i class="far fa-heart"></i> to add some!</h4>
      `
      userList.innerHTML += htmlContent
    }


    switch (method) {
      case 0://card method
        instruction.classList.remove('d-none') //show instruction
        userList.setAttribute('class', 'row mx-5 justify-content-md-center grid-auto-rows: 1fr')
        data.forEach(item => {
          if (item.show === true) {
            let userCard = document.createElement('div')
            userCard.classList.add('col-md-2', 'm-4', 'pt-3', 'card')
            userCard.innerHTML = `
                <div class="card-title container px-0 mb-1">
                  <div class="row mx-auto mb-2">
                    <h6 class="col pl-0 pr-auto" style="white-space: nowrap;">${item.name} ${item.surname}</h6>
                    ${item.gender === "male" ? '<i class="fas fa-male col pl-0"></i>' : '<i class="fas fa-female col pl-0"></i>'} 
                  </div>
                  <div class="row justify-content-between m-auto">
                    <span class="col-1 p-0">
                      <i class="fas fa-address-card d-inline m-0 p-0"  onmouseover="" style="cursor: pointer;" data-toggle="modal" data-target="#detail-modal" id="detail-button" data-id="${item.id}"></i>
                    </span>
                    <span class="col-1 p-0">
                      <i class="${item.favorite ? "fas" : "far"} fa-heart d-inline col m-0 p-0"  onmouseover="" style="cursor: pointer;" id="favorite-button" data-id="${item.id}"></i>
                    </span>
                  </div>
                </div>
                <img class="card-img-top rounded-lg" src ="${item.avatar}" alt ="Image missing" >
                <div class="card-body container">
                  <span class="row">Age: ${item.age} </span>
                  <span class="row">Country: ${item.region} </span>
                </div>
            `
            userList.appendChild(userCard)
          }
        })
        break
      case 1://list method
        instruction.classList.add('d-none') //hide instruction
        data.forEach(item => {
          userList.setAttribute('class', 'container')
          if (item.show === true) {
            let userCard = document.createElement('div')
            userCard.classList.add('row', 'm-4', 'p-3', 'bg-white', 'rounded', 'rounded-lg', 'border', 'border-dark')
            userCard.innerHTML = `
                <div class="col-2">
                  <img class="card-img-top rounded-lg" src ="${item.avatar}" alt ="Image missing" >
                </div>
                <div class="col-8">
                  <div class="row">
                    <h6 class="col-10">${item.name} ${item.surname} 
                      ${item.gender === "male" ? '<i class="fas fa-male"></i>' : '<i class="fas fa-female"></i>'} 
                      <i class="${item.favorite ? "fas" : "far"} fa-heart d-inline col m-0 p-0"  onmouseover="" style="cursor: pointer;" id="favorite-button" data-id="${item.id}"></i>
                    </h6>
                  </div>
                  <div class="row justify-content-start pl-4">
                    <ul class="col" >
                      <li>Gender : ${item.gender}</li>
                      <li>Age : ${item.age}</li>
                      <li>Region : ${item.region}</li>
                    </ul>
                    <ul class="col" >
                      <li>Birthday : ${item.birthday}</li>
                      <li>E-mail : ${item.email}</li>
                    </ul>
                  </div>
                </div>
              `
            userList.appendChild(userCard)
          }
        })

    }


    //載入完成後刪除載入圈圈
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
        modalName.innerText = `${info.name} ${info.surname} `
        modalImg.src = `${info.avatar} `
        modalFooter.innerText = `Last update: ${info.updated_at} `
        modalInfo.innerHTML = `
                <li> Gender : ${info.gender}</li >
                <li>Age : ${info.age}</li>
                <li>Region : ${info.region}</li>
                <li>Birthday : ${info.birthday}</li>
                <li>E-mail : ${info.email}</li>`

      }).catch(error => console.log(error))
  }


  //綜合最愛、篩選、搜尋選項決定show
  function showController(data) {
    let f, i, g, s //favorite,initial,gender,search

    f = favoriteList.parentElement.classList.contains('active')
    i = initialList.parentElement.classList.contains('active')
    g = filterGender.children[0].innerText
    s = searchName.value.toLowerCase()


    data.forEach(user => {
      console.log(`f: ${(f && user.favorite) || i} , g:${user.gender === g.toLowerCase() || (g === "All" || g === "Gender")} , s:${(user.name + user.surname).toLowerCase().includes(s)}`)
      filterF = (f && user.favorite) || i
      filterG = user.gender === g.toLowerCase() || (g === "All" || g === "Gender")
      filterS = (user.name + user.surname).toLowerCase().includes(s)
      user.show = filterF && filterG && filterS ? true : false
    })

  }

  //Main
  getData()

  userList.addEventListener("click", event => {
    const e = event.target

    if (e.matches('#detail-button')) {
      showDetails(e.dataset.id)
    } else if (e.matches('#favorite-button')) {
      if (e.classList.contains('far')) {
        e.classList.replace('far', 'fas') //切換實心愛心
        if (!favoriteId.includes(e.dataset.id)) {//清單中沒有該id時再存入
          favoriteId.push(e.dataset.id)
        }
      } else if (e.classList.contains('fas')) {
        e.classList.replace('fas', 'far') //切換空心愛心
        favoriteId = favoriteId.filter(id => id !== e.dataset.id) //回存不含target id 的清單
      }

      favoriteId.sort()
      console.log(favoriteId)

      data.forEach(item => {
        item.favorite = favoriteId.includes(item.id.toString()) ? true : false
      })

      localStorage.setItem('favoriteId', JSON.stringify(favoriteId))

      getTotalPages(data)
    }
  })

  pagePick.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
      if (parseInt(currentPage) !== parseInt(event.target.dataset.page)) {
        if (event.target.id === "pg-next") {
          currentPage++
        } else if (event.target.id === "pg-last") {
          currentPage--
        } else {
          currentPage = event.target.dataset.page
        }
        getPageData(currentPage, data)
        window.scrollTo(0, 0);
      }

    }
  })

  filterGender.addEventListener("click", event => {

    if (event.target.matches('.filter-gender')) {
      console.log(event.target.innerText)
      event.currentTarget.children[0].innerText = event.target.innerText
      currentPage = 1
      getTotalPages(data)
    }
  })

  switchMethod.addEventListener('click', event => {
    console.log(event.target)
    if (event.target.tagName === 'BUTTON') {
      switch (event.target.id) {
        case "show-card":
          if (displayMethod !== 0) {//已經是card模式直接跳出
            displayMethod = 0
            console.log("card")
          }
          break
        case "show-list":
          if (displayMethod !== 1) {//已經是list模式直接跳出
            displayMethod = 1
            console.log("list")
          }
          break
      }

      getPageData(currentPage, data)
    }

  })

  navBar.addEventListener('click', event => {
    console.log(event.target.id)
    if (event.target.id === 'favorite-list') {
      data.forEach(item => {
        item.show = item.favorite
      })
      currentPage = 1
      initialList.parentElement.classList.remove('active')
      favoriteList.parentElement.classList.add('active')
    }
    else if (event.target.id === 'initial-list') {
      data.forEach(item => {
        item.show = true
      })
      currentPage = 1
      favoriteList.parentElement.classList.remove('active')
      initialList.parentElement.classList.add('active')
    }

    filterGender.children[0].innerText = 'Gender'//重置篩選器
    searchName.value = ''//清空搜尋欄
    getTotalPages(data)
  })

  searchName.addEventListener('input', event => {
    console.log(searchName.value)

    currentPage = 1
    getTotalPages(data)
  })

})()







