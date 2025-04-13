document.getElementById('search-btn').addEventListener('click',
async function() {
  const query = document.getElementsByClassName('search-box').value;
  if(!query){
    alert('Please enter cat breed');
    return;
  }

  const apiKey = 'live_0PAyx0vtfkw6tCNCX53e3nrY8aVlmIeRlXrZuX0eIaaJKQHLpdq4OMYL9tvYvuWz';
  const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=beng&api_key=live_0PAyx0vtfkw6tCNCX53e3nrY8aVlmIeRlXrZuX0eIaaJKQHLpdq4OMYL9tvYvuWz`;
})