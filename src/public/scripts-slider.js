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
  tagPImage = document.querySelector('.description')

const nextImage = () => {
  tagImage.setAttribute('src', `${baseUrl}${images[index].imageUrl}.png`)
  tagImage.setAttribute('alt', `${images[index].title}`)
  tagPImage.innerHTML = `${images[index].title}`
  index++
  if(index == max){
    index = 0
  }
}

const start = () => {
  setInterval(() => {
    nextImage()
  }, time)
}
window.addEventListener('load', start)