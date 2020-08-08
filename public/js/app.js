const weatherForm = document.querySelector('form')
const searchValue = document.querySelector('input')
const title = document.querySelector('.title')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const msg3 = document.querySelector('#msg3')
const body = document.querySelector('body')

weatherForm.addEventListener('submit', (eventObject) => {
    eventObject.preventDefault()

    if (searchValue.value === '')
        msg1.textContent = "Enter a location"
    else {

        const searchLocation = searchValue.value
        searchValue.value = ''

        title.textContent = "Showing weather report for " + searchLocation
        msg1.textContent = 'Loading!'
        msg2.textContent = ''
        msg3.textContent = ''

        fetch('http://localhost:3000/weather?location=' + searchLocation).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    msg1.textContent = data.error
                }
                else {
                    body.style.backgroundImage = "url('/assets/img/" + data.bg + ".jpg')"
                    msg1.textContent = data.address
                    msg2.textContent = data.forecast
                    msg3.textContent = data.bg
                }
            })
        })
    }
})