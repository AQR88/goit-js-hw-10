import {fetchBreeds,fetchCatByBreed} from './cat-api';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import './styles.css'

const selector = document.querySelector('.breed-select')
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

error.classList.add('is-hidden');

function petsList(breed) {
  selector.innerHTML = breed
    .map(breed => `<option value="${breed.id}">${breed.name}
    </option>`)
    .join('');
}
function fetchBreedsAndSetPetsList() {
  fetchBreeds()
    .then(result => {
        petsList(result);
    })
    .then(() => new SlimSelect({ select: `.breed-select`,

    //placeholder ЧОМУСЬ НЕ ПРАЦЮЄ!!!
 
    // data: [
    //     {
    //         'placeholder': true
    //     }
    // ],

    // settings:{
    //     placeholderText: `Select the breed`,
    // }
        
     }))
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!',
        { timeout: 5000, userIcon: false }
      );
    })
    .finally(() => {
        loader.classList.add('is-hidden');
    });
}
selector.addEventListener('change', onSelect);

function onSelect(evt) {
  const selectBreedId = evt.currentTarget.value;
  catInfo.classList.add('is-hidden');

  fetchCatByBreed(selectBreedId)
    .then(data => {
      markup(data);
      catInfo.classList.remove('is-hidden');
    })
    .catch(() => {
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`,
        { timeout: 4000, userIcon: false }
      );
    })
    .finally(() => {
        loader.classList.add('is-hidden');
    });
}
function markup(data) {
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];
  const catList = `<img src="${url}" alt="${name}" width=500>
  <div class ="bg-color">
<h2 class="title">${name}</h2>
<p class="text">${description}</p>
<p class="text">Temperament:${temperament}</p>
</div>`;
catInfo.innerHTML = catList;
}

fetchBreedsAndSetPetsList();