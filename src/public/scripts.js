const region = document.querySelector('#region')

const options = {
  method: 'GET',
  module: 'cors',
  cache: 'default'
}

function showData(result) {
  for(const camp in result) {
    if(document.querySelector('.'+camp)) {
      document.querySelector('#'+camp).innerHTML = result[camp]
    }
  }
}
async function fetchStates(region) {
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
  const myResponse = await fetch(url)
  const stateList = await myResponse.json()
  const arrayOfStates = Array.from(stateList)
  const onlyOne = arrayOfStates.filter(state=> {
    if (state.nome == region){
      return true
    }
  })
  return onlyOne[0].sigla
}
async function fetchCasos(state) {
  const url = `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${state.toLowerCase()}`
  const myResponse = await fetch(url,options)
  const casos = await myResponse.json()
  return casos
}

document.querySelector('button')
  .addEventListener('click', async (event) => {
    let regionToUrl = region.value
    let uf = await fetchStates(regionToUrl)
    let dataState = await fetchCasos(uf)
    showData(dataState)
  })

const images = [
  {
    imageUrl: '2321/PNG/128/hand_wash_hygiene_soap_cleaning_coronavirus_icon_142099',
    title: 'Lave as mão com água.'
  },
  {
    imageUrl: '2228/PNG/512/soap_gel_cleaning_sterile_coronavirus_infection_health_icon_134539',
    title: 'Utilize sabão.'
  },
  {
    imageUrl: '2298/PNG/512/wash_hands_cleaning_soap_coronavirus_covid_medical_icon_141608',
    title: 'Esfregue bem todas as partes das mão'
  },
  {
    imageUrl: '2299/PNG/128/wash_hands_cleaning_water_coronavirus_covid_soap_icon_141632',
    title: 'Na auxência de água e sabão use álcool em gel.'
  },
  {
    imageUrl: '2228/PNG/512/mask_wearing_avatar_man_covid_coronavirus_air_pollution_icon_134542',
    title: 'Use máscara ao sair de casa.'
  }
]
const baseUrl = 'https://cdn.icon-icons.com/icons2/'

let time = 4000,
  index = 0,
  max = images.length,
  tagImage = document.querySelector('.image'),
  tagPImage = document.querySelector('.description'),
  tagSelect = document.querySelector('.select select')
console.log(tagSelect.value);
const nextImage = () => {
  tagImage.setAttribute('src', `${baseUrl}${images[index].imageUrl}.png`)
  tagImage.setAttribute('alt', `${images[index].title}`)
  tagPImage.innerHTML = `${images[index].title}`
  index++
  if(index == max){
    index = 0
  }
}

async function createOptionsStates() {
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
  const myResponse = await fetch(url)
  const stateList = await myResponse.json()
  const arrayOfStates = Array.from(stateList)
  const maxOptions = arrayOfStates.length
  return arrayOfStates.map(option => {
    let tagOption = document.createElement('option')
    tagOption.setAttribute('value', option.nome)
    tagOption.innerHTML = option.nome
    tagSelect.appendChild(tagOption)
  })
}
const start = () => {
  createOptionsStates()
  setInterval(() => {
    nextImage()
  }, time)
}
window.addEventListener('load', start)