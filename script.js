// Gör ett Get anrop till server
function fetchRecipes() {
    fetch('http://localhost:5000/api/dishes')  // API-anrop till vårt server
      .then(response => response.json())  // Om responsen är bra, omvandla till JSON
      .then(dishes => {
        const dishesTableBody = document.querySelector('#dishesTable tbody'); // Hitta tabellens body
        dishesTableBody.innerHTML = ''; // Töm tabellen innan vi fyller på med nya data

        // Om inga rätter finns, visa ett meddelande
      if (dishes.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="7">Inga rätter tillagda ännu!</td>';
        dishesTableBody.appendChild(row);
        return;
      }
  
        dishes.forEach(dish => {
          const row = document.createElement('tr');  // Skapa en ny rad för varje rätt
          row.innerHTML = `
            <td>${dish.name}</td>
            <td>${dish.ingredients.join(', ')}</td>
            <td>${dish.preparationSteps.join(' | ')}</td>
            <td>${dish.cookingTime} min</td>
            <td>${dish.origin}</td>
            <td>${dish.spiceLevel}</td>
            <td>
              <button onclick="updateDish('${dish._id}')">Uppdatera</button>
              <button onclick="deleteDish('${dish._id}')">Ta bort</button>
            </td>
          `;
          dishesTableBody.appendChild(row);  // Lägg till raden i tabellen
        });
      })
      .catch(error => console.error('Fel vid hämtning av rätter:', error));  // Om något går fel
  }

  document.addEventListener("DOMContentLoaded", () => {
    fetchRecipes(); // Anropa funktionen som hämtar rätter när sidan är klar
  });

  //-----------------------------------------------------------------------------
  // Post anrop för att lägga till nya rätter

  // Skapa en ny rätt när formuläret skickas
document.getElementById('addRecipeForm').addEventListener('submit', (event) =>{
    event.preventDefault(); 

     // Hämta data från formuläret
  const name = document.getElementById('name').value;
  const ingredients = document.getElementById('ingredients').value.split(',');
  const preparationSteps = document.getElementById('preparationSteps').value.split('\n');
  const cookingTime = parseInt(document.getElementById('cookingTime').value);
  const origin = document.getElementById('origin').value;
  const spiceLevel = document.getElementById('spiceLevel').value;

  const newDish = {
    name,
    ingredients,
    preparationSteps,
    cookingTime,
    origin,
    spiceLevel
  };

  // Skicka data till servern via en POST-begäran
  fetch('http://localhost:5000/api/dishes', {
    method: 'POST',  //  POST-begäran
    headers: {
      'Content-Type': 'application/json'  // Vi skickar JSON-data
    },
    body: JSON.stringify(newDish)  // Omvandla objektet till JSON-format
  })
    .then(response => response.json())  // Om servern svarar med JSON
    .then(() => {
      fetchRecipes();  // Uppdatera tabellen efter att den nya rätten har lagts till
      document.getElementById('addRecipeForm').reset();  // Återställ formuläret
    })
    .catch(error => {
      console.error('Fel vid skapande av rätt:', error);  // Fångar eventuella fel
      alert('Det gick inte att lägga till rätten.');
    });
});

//-------------------------------------------------------------





  
