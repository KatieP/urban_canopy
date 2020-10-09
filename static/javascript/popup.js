
// Get the current CO2 number when the window opens and append it in the window.
async function getDataAndDraw() {

  let res = await fetch('https://api.apify.com/v2/actor-tasks/niko~caiso-scraper/runs/last/dataset/items?token=uyrp24nvSzoRsBf2wM8Evv7q7')
  let data = await res.json()
  data = data[0]["data"]

  // GET NUMBER AND COLOR FOR LOLLIPOP FROM RESULTS  // (  old way of getting just the display number: let result; fetch('http://www.caiso.com/outlook/SP/stats.txt').then( r => r.text()).then(text => json.parse(text)).then(json => result = json.currentCo2)  )
  let CO2 = data.results[data.results.length-2].toFixed(1)
  let colorInt = Math.floor(CO2)
  let color = getColor(colorInt)

  // DISPLAY NUMBER IN LOLLIPOP
  $('.co2').append(CO2)

  // UPDATE LOLLIPOP AND ICON
  $('.circle-back').css("background-color", color)

}

function fetchWithTimeout (url, options, timeout = 7000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}


function getColor(num) {
  const colors = {
    14: "#290C0C",
    13: "#411717",
    12: "#5A1C1C",
    11: "#8B2D2D",
    10: "#B43737",
    9: "#BF6238",
    8: "#D6A241",
    7: "#D0C220",
    6: "#B2C94D",
    5: "#8ECB7B",
    4: "#7BC78F",
    3: "#72C1BB",
    2: "#5AABDE",
    1: "#4B9BE0",
    0: "#448EE2"
  }
  return colors[num]
}

document.addEventListener('DOMContentLoaded', function () {
  getDataAndDraw();
})
