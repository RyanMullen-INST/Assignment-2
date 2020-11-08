// This is where we do script stuff
// WEEEEEEEE
// I pulled this straight from Lab 7
// We will likely need to add extra stuff because this is only the event listener object
// For consistency's sake, please add it ABOVE the Event Listener
const establishments = [];
const searchinput = document.querySelector('.text_input');
const suggestions = document.querySelector('.rest_list');

// This is matching EVERYTHING POSSIBLE because it matches
// to the tilde ` thing, which should have 0 matches
function findmatches(wordtomatch, establishments) {

  // filter establishments
  return establishments.filter(place => {

    // create global and insensitive regular expression
    const regex = new RegExp(wordtomatch, 'gi');

    // match establishment category using regular expression
    return place.category.match(regex);
  });
}

function displaymatches(establishments) {
  const matcharray = findmatches(this.value, establishments);
  const html = matcharray.map(place => {
    return `
    <li>
    <span class="name">${place.name}</span>
    <span class="address">${place.address_line_1}</span>
    </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

function runThisWithResultsFromServer(jsonfromserver) {
  establishments.push(...jsonfromserver);

  displaymatches(establishments);
}
// do not change this
searchinput.addEventListener('change', async (e) => {
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