const author = document.getElementById("author")
const crypto = document.getElementById("crypto")
const topCrypto = document.getElementById("crypto-top")
const Weather = document.getElementById("Weather")



async function backgroundImage() {
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    const data = await res.json()
    
    
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    author.textContent = `By: ${data.user.name}`
}
backgroundImage()

async function getiApiCrypto() {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    const data = await res.json()
    if(!res.ok){
        throw Error("Something went wrong")
    }
    
    topCrypto.innerHTML =`
    <img src="${data.image.small}" >
    <span>${data.name}</span>
    
    `
    crypto.innerHTML += `
    <p>🎯: $${data.market_data.current_price.usd}</p>
    <p>👆: $${data.market_data.high_24h.usd}</p>
    <p>👇: $${data.market_data.low_24h.usd}</p>
    `
    
}
getiApiCrypto()


.catch(err => {
    console.error(err)
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`
    author.textContent= `By: Dodi Achmad`
    
    
})

function getCurrentTime(){
    const date = new Date()
    document.getElementById("time").textContent =date.toLocaleTimeString("en-us", {timeStyle: "short"})

}
setInterval(getCurrentTime(),1000)



navigator.geolocation.getCurrentPosition(position=>
{
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.latitude}&units=imperial`)
    .then(res => {
        if(!res.ok){
            throw Error("Weather data not available")
        }
        return res.json()

    })
    .then(data => {
        const iconUrl =`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      
        
        Weather.innerHTML = `
        <img src="${iconUrl}"
        <p class="weather-temp" >${Math.round(data.main.temp)}º</p>
        <p class="weather-city" >${Math.round(data.name)}</p>
        `
        if(document.getElementsByClassName("weather-city") === ""){
            return "Jeddah"
        }
      
    
    } )
    .catch(err =>console.log(err))
})