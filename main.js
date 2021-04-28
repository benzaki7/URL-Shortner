// Information to reach API
const apiKey = 'de6e5fb8e0ad40e0bdab86d2ecc6fdee';
const url = 'https://api.rebrandly.com/v1/links';

const input = document.getElementById('url');
const shortenBtn = document.querySelector('.shorten-btn');
const alertBox = document.querySelector(".alertBox");

shortenBtn.addEventListener('click', displayShortUrl);

const shortenUrl = async () => {
    const urlToShorten = input.value;
    const data = JSON.stringify({destination: urlToShorten});

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json',
                'apikey': apiKey
            }
        });

        if(response.ok) {
            const jsonResponse = await response.json();
            renderResponse(jsonResponse);
        }
    }

    catch(error) {
        console.log(error);
    }
}

const renderResponse = (res) => {
    if(res.errors){
        input.value = "Sorry, couldn't format your URL.Try again.";
    } else {  
        input.value = res.shortUrl;
        shortenBtn.innerHTML = 'Copy';       
        input.addEventListener('keyup', function() {
            shortenBtn.innerHTML = 'Shorten';
        })
        displayAlert();
    }
}

function displayShortUrl(event) {
    event.preventDefault();
    shortenUrl();
}

function displayAlert() {
    shortenBtn.addEventListener("click", function () {
        if (input.value && (shortenBtn.innerHTML === 'Copy')) {
            input.select();
            input.setSelectionRange(0,99999);
            document.execCommand("copy");
            alertBox.classList.add("active");
            alertBox.innerHTML = "COPIED!";
            setTimeout(function () {
                alertBox.classList.remove("active")
            }, 700);
        };
    });
}



