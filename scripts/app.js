const cityForm = document.querySelector('form');
const card= document.querySelector('.card');
const details=document.querySelector('.details');
const time=document.querySelector('.time');
const icon=document.querySelector('.icon img');

const updateUI=(data)=>{
    const cityDetails= data.cityDetails;
    const weather=data.weather;
    // console.log(cityDetails,weather);
     details.innerHTML=`
     <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>`;
    // changin the icon
    const iconSrc= `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);

    //Changing the display imange
    const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);
    if(card.classList.contains('d-none'))
    {
        card.classList.remove('d-none');
    }
}
const updateCity= async (city)=>{
    const cityDetails = await getCity(city);
   const weather= await getforecast(cityDetails.Key);
   
    return {cityDetails,weather};
    
}

cityForm.addEventListener('submit',e=>
{
    e.preventDefault();
    const city= cityForm.city.value.trim();
    updateCity(city).then(data=>updateUI(data)).catch(err=>console.log(err));

    localStorage.setItem('city', city);
})

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
      .then(data => updateUI(data))
      .catch(err => console.log(err));
  }