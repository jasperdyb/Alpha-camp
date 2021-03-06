(function () {
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []

  const dataPanel = document.getElementById('data-panel')

  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    console.log(data)
    displayDataList(data)
  }).catch((err) => console.log(err))

  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6 class="card-title">${item.title}</h5>
            </div>
          </div>
        </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }
})()