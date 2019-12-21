let players = [
  { name: '櫻木花道', pts: 0, reb: 0, ast: 0, stl: 0, blk: 2 },
  { name: '流川楓', pts: 30, reb: 6, ast: 3, stl: 3, blk: 0 },
  { name: '赤木剛憲', pts: 16, reb: 10, ast: 0, stl: 0, blk: 5 },
  { name: '宮城良田', pts: 6, reb: 0, ast: 7, stl: 6, blk: 0 },
  { name: '三井壽', pts: 21, reb: 4, ast: 3, stl: 0, blk: 0 }
]

const dataPanel = document.querySelector('#data-panel')



// write your code here

function displayPlayerList(data) {
  let htmlContent = ``

  data.forEach(function (element) {
    htmlContent += `
      <tr>
        <td>${element.name}</td>
        <td>${element.pts}  
        <i class ='fa fa-plus-circle up'></i>
        <i class ='fa fa-minus-circle down'></i></td>
        <td>${element.reb}
        <i class ='fa fa-plus-circle up'></i>
        <i class ='fa fa-minus-circle down'></i></td>
        <td>${element.ast}
        <i class ='fa fa-plus-circle up'></i>
        <i class ='fa fa-minus-circle down'></i></td>
        <td>${element.stl}
        <i class ='fa fa-plus-circle up'></i>
        <i class ='fa fa-minus-circle down'></i></td>
        <td>${element.blk}
        <i class ='fa fa-plus-circle up'></i>
        <i class ='fa fa-minus-circle down'></i></td>
      </tr>`
  })

  dataPanel.innerHTML = htmlContent

}



displayPlayerList(players)




// A16 added

dataPanel.addEventListener('click', function (event) {
  if (event.target.classList.contains('fa-plus-circle')) {

  }
})