// This is where we do script stuff
// WEEEEEEEE
// I pulled this straight from Lab 7
// We will likely need to add extra stuff because this is only the event listener object

// For consistency's sake, please add it ABOVE the Event Listener
const establishments = [];
const searchinput = document.querySelector('.text_input');
const suggestions = document.querySelector('.rest_list');


// this function works.
function findmatches(wordtomatch, establishments) {
  console.log(establishments.length);
  // filter establishments
  const matches = establishments.filter(restaurant => {
    // create global and insensitive regular expression
    const regex = new RegExp(wordtomatch, 'gi');
    // match establishment category using regular expression
    return restaurant.name.match(regex) || restaurant.category.match(regex);
  });
  console.log(matches);
  return matches;
}

// matches, html becomes a gargantuan thingy
function displaymatches() {
  console.log(findmatches(this.value, establishments));
  const html = findmatches(this.value, establishments).map(restaurant => {
    return `
    <li>
    <span class="name">${restaurant.name}</span>
    <span class="address">${restaurant.address_line_1}</span>
    <span class="address">${restaurant.city}, ${restaurant.state}  ${restaurant.zip}</span>
    </li>
    `;
  }).join('');
  console.log(html);
  suggestions.innerHTML = html;
}

function runThisWithResultsFromServer(jsonfromserver) {
  establishments.push(...jsonfromserver);
  displaymatches(establishments);
}

// do not change this
searchinput.addEventListener('change',  (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});
