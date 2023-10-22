const URL = 'https://api.thecatapi.com/v1';
const X_API_KEY = 
"live_nC0yfyAwOqqc2cO1cnlKnLy2dwwxOjVNwaitPEQDhgAL2dZooC6rQWSATWopouAh";


export function fetchBreeds() {
    return fetch(`${URL}/breeds?api_key=${X_API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });       
};

export function fetchCatByBreed(breedId) {
    return fetch(`${URL}/images/search?api_key=${X_API_KEY}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });  
};