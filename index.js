const numberOfColors = 6
// CSS variable for displayin "n" number of columns
document.documentElement.style.setProperty('--columns', numberOfColors);
let colorScheme
let colorPalette = ""
let colorNames = ""

// Generate the color-palette and color-name divs
for (i = 0; i < numberOfColors; i ++) {
    colorPalette += `<div id="color-${i}" class="color"></div>`
    colorNames += `<p id="color-${i}-name" data-color="color-name"></p>`
}
 
function fetchooor() {
    // Get & clean parameters for API
    let color = document.getElementById("color-selector").value
    color = color.substring(1)
    const mode = document.getElementById("mode-selector").value
    // Fetch API
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${mode}&count=${numberOfColors}`)
        .then(response => response.json())
        .then(data => {
            colorScheme = data.colors
            render()
        })    
}

// Form button logic
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault()
    fetchooor() 
})

// Click to copy using clipboard API
document.body.addEventListener("click", e => {
    if (e.target.attributes["data-color"]) {
    let textToCopy= e.target.innerText
    // clipboardAPI
    navigator.clipboard.writeText(textToCopy)
    }
})

function render() {
    colorScheme.map((color, index) => {
        // Set background color
        document.getElementById(`color-${index}`).style.backgroundColor = color.hex.value
        // Set names in hex
        document.getElementById(`color-${index}-name`).innerText = color.hex.value
    })
}


// Set the divs  and run the "start app" fetch
document.getElementById("color-palette").innerHTML = colorPalette
document.getElementById("color-names").innerHTML = colorNames
fetchooor()