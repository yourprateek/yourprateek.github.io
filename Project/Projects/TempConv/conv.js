//Temperature Conversion

const textBox = document.getElementById("textbox");
const unit = document.getElementById("unit");
const toggletext = document.getElementById("toggle");
const Result = document.getElementById("result");
let temp;

function unitchange(){
    if (unit.checked) {
        toggletext.textContent = "°F";

        convert();
    }else{
        toggletext.textContent = "°C";
        
        convert();
    }
}

function convert() {
    
    if (!unit.checked) {
        temp = Number(textBox.value)* 9/5 + 32;
        Result.textContent = temp.toFixed(1) + "°F";
    }
    else{
        temp = (Number(textBox.value) - 32)* 5/9;
        Result.textContent = temp.toFixed(1) + "°C";
    }
}