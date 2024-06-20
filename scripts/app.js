
function check1to9(l){
    const  d = l.filter(distinct);
    if(d.length == 9){
        return true;
    }else {
        return false;
    }

}


function checkAllValueFilled(){
    var allFilledValue = true;
    for(i = 1; i <= 81; i++) {
        [mainGridCellNumber,smallGridCellNumber] = keyToGrid(i)
        const cellId = "cell-"+mainGridCellNumber+"-"+smallGridCellNumber;
        // const cell = document.getElementById(cellId);
        const dropDownId = "drop-down-"+mainGridCellNumber+"-"+smallGridCellNumber;
        const selectButton= document.getElementById(dropDownId);
        if ((selectButton != null)) {
            if (selectButton.value === "") {
                allFilledValue = false;
            }
        }
    }
    return allFilledValue;
}

function checkSudoku(){
    const filledflag = checkAllValueFilled();
    if(filledflag == false){
        alert("some values are left")
    }else{


    }

}

function createSmallMatrix(sudokuPuzzle,smallGrid,index){
    for (let i = 1; i <= 9; i++) {
        const cell = document.createElement("div");
        cell.id = "cell-" + index + "-" + i;
        cell.className = "cell";
        const key = GridTokey(index,i);
        const value  = sudokuPuzzle[key];
        if(value !== 0){
            cell.textContent = value;
        }else{
            const newButton = get_button_div(index,i)
            cell.appendChild(newButton);
        }
        smallGrid.appendChild(cell);
    }
}

function GridTokey(mainIndex,smallIndex){
    const mainColumn = ((mainIndex-1)%3)+1;
    const mainRow  = Math.ceil(mainIndex/3);

    const smallColumn = ((smallIndex-1)%3)+1;
    const smallRow  = Math.ceil(smallIndex/3);

    const BigColumm = (3*(mainColumn-1)) + smallColumn;
    const BigRow = (3*(mainRow-1)) + smallRow;

    const key = 9*(BigRow-1) + BigColumm;

    return key;
}

function keyToGrid(x){
    const mainGridRow = Math.ceil(x/27);
    const mainGridColumn = Math.ceil((((x-1)%9)+1)/3);
    const mainGridNumber = (3*(mainGridRow-1)) + mainGridColumn;

    const till27 = (((x-1)%27)+1);
    const smallGridRow = Math.ceil(till27/9);
    const smallGridColumn= (((till27-1)%3)+1);
    const smallGridcellNumber = 3*(smallGridRow-1) + smallGridColumn;
    return [mainGridNumber,smallGridcellNumber]
}

function createPuzzle(sudokuPuzzel){
    mainGrid = document.getElementById("main-grid");
    console.log(mainGrid);
    for (let i = 1; i <= 9; i++) {
        const smallGrid = document.createElement("div");
        smallGrid.id = "small-grid-" + i;
        smallGrid.className = "small-grid";
        createSmallMatrix(sudokuPuzzel,smallGrid,i);
        mainGrid.appendChild(smallGrid);
    }
}

function get_button_div(mainIndex, smallIndex){
    const selectElement = document.createElement('select');
    selectElement.id = "drop-down-"+mainIndex+"-"+smallIndex;
    selectElement.className = "drop-down";
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

    return selectElement;
}


console.log('started')
const xhr= new XMLHttpRequest();
const fetchKeyMapping = new XMLHttpRequest();
xhr.open('GET', 'data/sudoku_puzzle.json');
xhr.addEventListener('load', function(){

    console.log('here')
    console.log(xhr.status);
    json_data = JSON.parse(xhr.responseText);
    // console.log(json_data)
    createPuzzle(json_data);
    const button = document.getElementById("btn")
    button.onclick = checkSudoku;
}
)
xhr.send();
console.log('ended')






