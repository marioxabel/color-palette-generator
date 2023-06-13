const numberOfColors = 6
let colorScheme

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault()
    // get & clean parameters
    let color = document.getElementById("color-selector").value
    color = color.substring(1)
    const mode = document.getElementById("mode-selector").value
    // fetch API
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${mode}&count=${numberOfColors}`)
        .then(response => response.json())
        .then(data => {
            colorScheme = data.colors
            render()
        })    
    console.log(color)
})

function render() {
    colorScheme.map((color, index) => {
        // set background color
        document.getElementById(`color-${index}`).style.backgroundColor = color.hex.value
        // set names in hex
        document.getElementById(`color-${index}-name`).innerText = color.hex.value
    })
}