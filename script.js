// Gör ett Get anrop till server
function fetchRecipes() {
    fetch('http://localhost:5000/api/dishes')  // API-anrop till server
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
              <button class="update-btn" data-id="${dish._id}">Uppdatera</button>
              <button class="delete-btn" data-id="${dish._id}">Ta bort</button>
            </td>
          `;
          dishesTableBody.appendChild(row);  // Lägg till raden i tabellen
        });
  
        // Lägg till event listeners för knapparna dynamiskt
        document.querySelectorAll('.update-btn').forEach(button => {
          button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;  // Hämta rättens ID från data-attributet
            updateDish(id);  // Anropa updateDish-funktionen
          });
        });
  
        document.querySelectorAll('.delete-btn').forEach(button => {
          button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;  // Hämta rättens ID från data-attributet
            deleteDish(id);  // Anropa deleteDish-funktionen
          });
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
//Put begäran av 

function updateDish(id) {
    // Hämta den aktuella rätten från servern

    console.log('Uppdatera rätt med ID:', id);


    fetch(`http://localhost:5000/api/dishes/${id}`)
      .then(response => response.json())
      .then(dish => {
        // Fyll formuläret med den aktuella rättens data
        document.getElementById('updateName').value = dish.name;
        document.getElementById('updateIngredients').value = dish.ingredients.join(', ');
        document.getElementById('updatePreparationSteps').value = dish.preparationSteps.join('\n');
        document.getElementById('updateCookingTime').value = dish.cookingTime;
        document.getElementById('updateOrigin').value = dish.origin;
        document.getElementById('updateSpiceLevel').value = dish.spiceLevel;
  
        // Visa uppdateringsformuläret
        document.getElementById('updateForm').style.display = 'block';
  
        // Hantera formulärskickning
        document.getElementById('updateDishForm').onsubmit = function(event) {
          event.preventDefault();
  
          const updatedDish = {
            name: document.getElementById('updateName').value,
            ingredients: document.getElementById('updateIngredients').value.split(','),
            preparationSteps: document.getElementById('updatePreparationSteps').value.split('\n'),
            cookingTime: parseInt(document.getElementById('updateCookingTime').value),
            origin: document.getElementById('updateOrigin').value,
            spiceLevel: document.getElementById('updateSpiceLevel').value
          };
  
          // Skicka en PUT-begäran för att uppdatera rätten
          fetch(`http://localhost:5000/api/dishes/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedDish)
          })
            .then(response => response.json())
            .then(() => {
              fetchRecipes();  // Uppdatera tabellen
              document.getElementById('updateForm').style.display = 'none';  // Dölj formuläret
            })
            .catch(error => {
              console.error('Fel vid uppdatering av rätt:', error);
              alert('Det gick inte att uppdatera rätten.');
            });
        };
      })
      .catch(error => {
        console.error('Fel vid hämtning av rätt:', error);
      });
  }
//--------------------------------------------------------

// Ta bort en rätt via DELETE
function deleteDish(id) {
    const confirmDelete = confirm('Är du säker på att du vill ta bort denna rätt?');
    
    if (confirmDelete) {
      // Skicka en DELETE-begäran till servern för att ta bort rätten
      fetch(`http://localhost:5000/api/dishes/${id}`, {
        method: 'DELETE',  // Använd DELETE för att ta bort
      })
        .then(response => response.json())
        .then(() => {
          fetchRecipes();  // Uppdatera tabellen efter borttagning
        })
        .catch(error => {
          console.error('Fel vid borttagning av rätt:', error);
          alert('Det gick inte att ta bort rätten.');
        });
    }
  }
  



  
