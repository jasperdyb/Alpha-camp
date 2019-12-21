const table = document.querySelector('table')

for (let i = 1; i < table.rows.length; i++) {
  if (table.rows[i].children[1].textContent > 20) {
    const icon = document.createElement('i')
    table.rows[i].children[1].appendChild(icon)
    icon.className += 'fa'
    icon.className += ' fa-thumbs-up'
  }
}


