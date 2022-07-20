
let notice = document.getElementById("notice");

// https://stackoverflow.com/a/8888498
function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

const callAPI = async (geo) => {
  let apiKey = "1ee338a7093146fdbc1213753222007";
  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${geo.coords.latitude},${geo.coords.longitude}`)
    .then(res => res.json())
    .then(data => {
      notice.remove();
      let content = document.getElementById("content");
      let imgUrl = data.current.condition.icon.replace("64x64", "128x128");

      let state = data.location.region.split(" ")[0][0];
      if (data.location.region.split(" ").length == 2) {
        state += data.location.region.split(" ")[1][0];
      }
      let date = new Date(data.location.localtime);
      const options = { weekday: 'long' };

      let day = new Intl.DateTimeFormat('en-US', options).format(date);

      content.innerHTML =
        `<img src="${imgUrl}" alt="${data.current.condition.text}" width="128px" height="128px">
      <div id="info">
        <h1>${data.current.temp_f}°F</h1>
      </div>
      <div id="location">
        <h1>${data.location.name}, ${state}</h1>
        <h3>${day} ${formatDate(date)}</h3>
        <h3>${data.current.condition.text}</h3>
      </div>`
    });
}

function success(data) {
  notice.innerHTML = "<h1>Got location</h1>";
  callAPI(data);
}

function failure(data) {
  console.log("Failed to access location data.");
  notice.innerHTML = "<h1>Please allow location usage and refresh the page!</h1>";
}

if (window.navigator.geolocation) {
  window.navigator.geolocation
    .getCurrentPosition(success, failure);
} else {
  notice.innerHTML = "<h1>Geolocation is unsupported with you browser. Sorry!</h1>";
}