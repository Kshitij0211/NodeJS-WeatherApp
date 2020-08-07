console.log('ClientSide JS Loaded')

const weatherForm = document.querySelector('form')
const searchValue = document.querySelector('input')
const title = document.querySelector('.title')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (eventObject) => {
    eventObject.preventDefault()

    const searchLocation = searchValue.value
    searchValue.value = ''

    title.textContent = "Showing weather report for " + searchLocation
    msg1.textContent = 'Loading!'
    msg2.textContent = ''

    fetch('http://localhost:3000/weather?location=' + searchLocation).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            }
            else {
                msg1.textContent = data.address
                msg2.textContent = data.forecast
            }
        })
    })
})