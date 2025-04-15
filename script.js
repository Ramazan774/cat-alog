const apiKey = 'live_0PAyx0vtfkw6tCNCX53e3nrY8aVlmIeRlXrZuX0eIaaJKQHLpdq4OMYL9tvYvuWz';
const apiUrl = 'https://api.thecatapi.com/v1/breeds';
const catImages = [
  'assets/image1.JPG',
  'assets/image2.JPG',
  'assets/image3.JPG',
  'assets/image4.JPG',
  'assets/image5.JPG',
  'assets/image6.JPG',
  'assets/image7.JPG',
  'assets/image8.JPG'
];

function getRandomImage(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

document.getElementById('search-btn').addEventListener('click', 
  async function searchCats() {
  const inputValue = document.getElementById('search-box').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
  
  if (!inputValue) {
    alert('Please enter a cat breed.');
    return;
  }

  try {
    const breedResponse = await fetch(apiUrl, {
      headers: { 'x-api-key': apiKey }
    });
    const breeds = await breedResponse.json();

    const matchedBreed = breeds.find(breed => 
      breed.name.toLowerCase().includes(inputValue)
    );
    
    document.getElementById('search-box').value = '';
    document.getElementById('search-page').style.display = 'none';
    document.getElementById('cat-info-page').style.display = 'block';

    if (!matchedBreed) {
      resultDiv.innerHTML = `<p>No results found. Please try again.</p>`;
      
      document.getElementById('intro-info').querySelector('img').src = getRandomImage(catImages) + '?v=' + Date.now();
      document.getElementById('back-btn').style.display = 'block';
      return;
    }

    // If a matching breed is found, fetch the image for the breed.
    const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${matchedBreed.id}`, {
      headers: { 'x-api-key': apiKey }
    });
    const imageData = await imageResponse.json();
    const imageUrl = imageData[0]?.url || '';

    const template = document.getElementById('cat-template');
    const clone = template.content.cloneNode(true);

    clone.querySelector('.cat-image').src = imageUrl;
    clone.querySelector('.cat-image').alt = matchedBreed.name;
    clone.querySelector('.cat-name').textContent = matchedBreed.name;
    clone.querySelector('.cat-origin').textContent = matchedBreed.origin;
    clone.querySelector('.cat-temperament').textContent = matchedBreed.temperament;
    clone.querySelector('.cat-lifespan').textContent = matchedBreed.life_span;
    clone.querySelector('.cat-description').textContent = matchedBreed.description;

    resultDiv.innerHTML = '';
    resultDiv.appendChild(clone);

    document.getElementById('back-btn').style.display = 'none';
  } catch (error) {
    console.error('Error fetching data: ', error);
    resultDiv.innerHTML = `<p>Something went wrong. Please try again.</p>`;
    
    document.getElementById('intro-text').querySelector('img').src = getRandomImage(catImages) + '?v=' + Date.now();
    document.getElementById('back-btn').style.display = 'block';
  }
});

document.getElementById('back-btn').addEventListener('click', () => {
  document.getElementById('search-page').style.display = 'block';
  document.getElementById('cat-info-page').style.display = 'none';
})

window.addEventListener('DOMContentLoaded', () => {
  const introImg = document.querySelector('#intro-text img');
  introImg.src = getRandomImage(catImages) + '?v=' + Date.now();

  const introImg2 = document.querySelector('#intro-info img');
  if (introImg2) {
    introImg2.src = getRandomImage(catImages) + '?v=' + Date.now();
  }

  document.getElementById('back-btn').style.display = 'none';
});
