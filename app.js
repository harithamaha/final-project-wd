 let data = []
let content = document.querySelector('#content')

const getData = async (link) => {
    let response = await fetch(link) //1.60s
    let resData = await response.json()
    return resData
}

content.innerHTML = `<div class="alert alert-success" role="alert">
    Still Loading Wait for a Moment .......
    </div>`
getData("https://restcountries.eu/rest/v2/all")
    .then((e) => {
        data = e
        if (data === null || data === undefined || data.length === 0) {
            content.innerHTML = `<div class="alert alert-danger" role="alert">
            No Data
          </div>`
        }
        else {
            putData(data.slice(0,10))
        }
    })
    .catch((err) => {
        console.log(err.message)
    })

const putData = (finalData) => {
    content.innerHTML = ''
    finalData.map((country) => content.innerHTML +=
        `
    <div class="card mx-3 my-3" style="width: 18rem;">
        <div class="card-header text-center">
            ${country.alpha2Code}
        </div>
        <img src="${country.flag}" class="card-img-top border border-danger">
        <div class="card-body">
            <p class="card-title text-center">${country.name}</p>
            <p class="card-text">Capital: ${country.capital}</p>
            <p class="card-text">Region: ${country.region}</p>
            <p class="card-text">Sub-Region: ${country.subregion}</p>
            <p class="card-text">Population: ${country.population}</p>
            <p class="card-text">Timezone: ${country.timezones}</p>
            <p class="card-text">Currency: ${country.currencies[0].name}</p>
        </div>
    </div>
    `
    )
}
document.querySelector('#search').addEventListener('input', (event) => {
    // console.log(event.target.value);
    let finalData = data.filter((country) => country.name.toLowerCase().startsWith(event.target.value.toLowerCase()))
    // console.log(finalData);
    if (event.target.value === ''){
        finalData = finalData.slice(0,10)
    }
    if (finalData.length === 0) {
        content.innerHTML = `<div class="alert alert-danger" role="alert">
    wrong user input /country not found
      </div>`
    }else{
        putData(finalData)
    }
})
