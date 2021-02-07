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
    imageUrl: './img/lave-as-maos.png',
    title: 'Lave as mão com água e sabonete.'
  },
  {
    imageUrl: './img/use-alcool-em-gel.png',
    title: 'Na auxencia de água e sabão, use alcool em gel.'
  },
  {
    imageUrl: './img/use-mascara.png',
    title: 'Use máscara ao sair de casa.'
  },
  {
    imageUrl: './img/mantenha-distanciamento.png',
    title: 'Mantenha distanciamento de outras pessoas.'
  },
  {
    imageUrl: './img/pratique-exercicios.png',
    title: 'Pratique exercícios.'
  },
  {
    imageUrl: './img/alimente-se-bem.png',
    title: 'Coma alimentos saudáveis.'
  },
  {
    imageUrl: './img/igienize-os-objetos.png',
    title: 'Igienize com alcool seus objetos.'
  }
]

let time = 5000,
  index = 0,
  max = images.length,
  tagImage = document.querySelector('.image'),
  tagPImage = document.querySelector('.description'),
  tagInputSelect = document.querySelector('.select .list-drop-down')
const nextImage = () => {
  tagImage.setAttribute('src', `${images[index].imageUrl}`)
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
  return arrayOfStates.map((option, index) => {
    let tagDivOption = document.createElement('div')

    tagDivOption.setAttribute('class', 'items')
    tagDivOption.setAttribute('id', `item-${index}`)
    tagDivOption.setAttribute('onmousedown', `category(${index})`)
    tagDivOption.innerHTML = option.nome
    tagInputSelect.appendChild(tagDivOption)
  })
}
function category (value) {
  let item = document.querySelector(`#item-${value}`)
  region.value = item.innerHTML   
}
const displays = ['block', 'none']
const paddings = ['4px 0px', '4px 0px 105px']
const translate = ['0px', '0px, -10px']
let dropDown = document.querySelector('.drop-down'),
  containerSeletc = document.querySelector('.container .select')
function dropdown(params){

  dropDown.style.display = displays[params]
  containerSeletc.style.padding = paddings[params]
  setTimeout(() => {
    dropDown.style.transform = `translate(${translate[params]})`
  }, 0)
}
const start = () => {
  createOptionsStates()
  setInterval(() => {
    nextImage()
  }, time)
}
window.addEventListener('load', start)