console.log('js asset is initilized');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageTwo.textContent = '';
    if (!location) {
        messageOne.textContent = 'Please enter an adress';
        return console.log('Please enter an adress');
    }

    messageOne.textContent = 'Loading';
    fetch(`/weather?adress=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                console.log(data.error);
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                console.log(data.location);
                console.log(data.forecast);
            }
        });
    });
});