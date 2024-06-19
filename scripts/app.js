
const selectElement = document.createElement('select');

for (let i = 1; i <= 9; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectElement.appendChild(option);
}


function create_puzzle(sudoku_puzzel){

    for (let i = 1; i <= 81; i++) {
        right_dark = ((parseInt(i)%3) ===0);
        down_dark = (((parseInt(((parseInt(i-1)/9)+1))) %3) === 0);
        if(sudoku_puzzel[i] === 0){
            filled_value = ""
        }else{
            filled_value = sudoku_puzzel[i]
        }
        if (right_dark && down_dark){
            if(sudoku_puzzel[i] != 0){
                $('#main-grid').append(`<div id ="item" class="item4">${filled_value}</div>`);
            }
            else{
                newButtonDiv = get_button_div("item","item4")
                $('#main-grid').append(newButtonDiv)
            }
        }
        else if(right_dark){
            if(sudoku_puzzel[i] !== 0){
                $('#main-grid').append(`<div id ="item" class="item3">${filled_value}</div>`);
            }
            else{
                newButtonDiv = get_button_div("item","item3")
                $('#main-grid').append(newButtonDiv)
            }
        }
        else if (down_dark){
            if(sudoku_puzzel[i] !== 0){
                $('#main-grid').append(`<div id ="item" class="item2">${filled_value}</div>`);
            }else{
                newButtonDiv = get_button_div("item","item2")
                $('#main-grid').append(newButtonDiv)
            }
        }
        else{
            if(sudoku_puzzel[i] !== 0){
                $('#main-grid').append(`<div id ="item" class="item1">${filled_value}</div>`);
            }else{
                newButtonDiv = get_button_div("item","item1")
                $('#main-grid').append(newButtonDiv)
            }

        }

    }

}



function get_button_div(id, classname){
    const selectElement = document.createElement('select');
    selectElement.id = "drop-down"
    const option = document.createElement('option');
    option.value = "";
    option.textContent = "";
    selectElement.appendChild(option);
    for (let i = 1; i <= 9; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectElement.appendChild(option);
    }
    var newDiv = document.createElement('div');
    newDiv.id = id;
    newDiv.className = classname;
    newDiv.append(selectElement);
    return newDiv;
}


console.log('started')
const xhr= new XMLHttpRequest();
xhr.open('GET', 'data/sudoku_puzzle.json');
xhr.addEventListener('load', function(){
    console.log('here')
    console.log(xhr.status);
    json_data = JSON.parse(xhr.responseText);
    create_puzzle(json_data)
}
)
xhr.send()
console.log('ended')
console.log(a[0]);






