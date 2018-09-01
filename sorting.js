var imageToSort;
var imageLoaded = false;
var redArray = [], blueArray = [], greenArray = [], alphaArray = [];
var x, y;
var i;
var n, gap;
var exp;
var loops = 0;
var done = false;
var sortingType, iterationsPerFrame;
var movesArray = [], indexArray = [];

function setup(){
    createCanvas(800, 600);
    imageToSort = loadImage(document.getElementById('session_val').value, resizeCallback);
    sortingType = document.getElementById('session_val2').value;
    iterationsPerFrame = document.getElementById('session_val3').value;
    pixelDensity(1);
    x = y = 0;
    exp = 1;
}

function resizeCallback( {width, height} ) {
    resizeCanvas(width, height);

    imageToSort.loadPixels();
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            let index = (j + i * width) * 4;
            redArray.push(imageToSort.pixels[index]);
            greenArray.push(imageToSort.pixels[index + 1]);
            blueArray.push(imageToSort.pixels[index + 2]);
            alphaArray.push(imageToSort.pixels[index + 3]);
        }
    }
    imageToSort.updatePixels();
    n = redArray.length;
    gap = n / 2;
    i = gap;
    imageLoaded = true;
}

function draw(){
    stroke(255);
    
    if(imageLoaded){
        for(let d = 0; d < iterationsPerFrame; d++){
            sortPixels(sortingType);
        }
        image(imageToSort, 0, 0);
    }

    if(done){
        let h1 = document.createElement("h4");
        let t = document.createTextNode("Done");
        h1.appendChild(t);
        document.body.appendChild(h1);
    }
}

function sortPixels(type){
    if(type == "bubble"){
        if(redArray[x] > redArray[x + 1]){
            swap(redArray, x, x + 1);
            swap(blueArray, x, x + 1);
            swap(greenArray, x, x + 1);
            swap(alphaArray, x, x + 1);
            updateGrid();
        }
    
        if(x < redArray.length - y - 1){
            x++;
        }else{
            x = 0;
            y++;
        }
    
        if(y >= redArray.length){
            noLoop();
        }
    }else if(type == "shell"){
        let tempRed = redArray[i];
        let tempGreen = greenArray[i];
        let tempBlue = blueArray[i];
        let tempAlpha = alphaArray[i];

        let j = null;
        for(j = i; j >= gap && redArray[j - gap] > tempRed; j -= gap){
            redArray[j] = redArray[j - gap];
            greenArray[j] = greenArray[j - gap];
            blueArray[j] = blueArray[j - gap];
            alphaArray[j] = alphaArray[j - gap];
        }

        redArray[j] = tempRed;
        blueArray[j] = tempBlue;
        greenArray[j] = tempGreen;
        alphaArray[j] = tempAlpha;
        updateGrid();

        if(i < n){
            i++;
        }else{
            if(gap > 0){
                i = 0;
                gap = floor(gap /= 2);
            }else{
                noLoop();
                done = true;
            }
        }
    }else if(type == "radix"){
        let m = getMax(redArray);

        let tempA = redArray;
        // for(let exp = 1; floor(m / exp) > 0; exp *= 10){
        //     countSort(tempA, tempA.length, exp);
        // }
        
        countSort(tempA, tempA.length, exp);
        if(floor(m / exp) > 0){
            exp *= 10;
        }else{
            noLoop();
        }

        updateGrid();
    }
}

function countSort(array, n, exp){
    let output = new Array(n);
    let outputRed = new Array(n);
    let outputGreen = new Array(n);
    let outputBlue = new Array(n);
    let outputAlpha = new Array(n);
    //indexArray = new Array(n);
    i = null;
    let count = [];
    for(let a = 0; a < 10; a++)
        count.push(0);
    
    for(i = 0; i < n; i++)
        count[(floor(array[i] / exp)) % 10]++;

    for(i = 1; i < 10; i++)
        count[i] += count[i - 1];

    for(i = n - 1; i >= 0; i--){
        output[count[(floor(array[i] / exp)) % 10] - 1] = array[i];
        outputRed[count[(floor(array[i] / exp)) % 10] - 1] = redArray[i];
        outputBlue[count[(floor(array[i] / exp)) % 10] - 1] = blueArray[i];
        outputGreen[count[(floor(array[i] / exp)) % 10] - 1] = greenArray[i];
        outputAlpha[count[(floor(array[i] / exp)) % 10] - 1] = alphaArray[i];

        count[(floor(array[i] / exp)) % 10]--;
    }

    for(i = 0; i < n; i++){
        array[i] = output[i];
        redArray[i] = outputRed[i];
        blueArray[i] = outputBlue[i];
        greenArray[i] = outputGreen[i];
        alphaArray[i] = outputAlpha[i];
    }
}

function copyMoves(array, movesToCopy){
    let tempArray = new Array(array.length);

    for(let a = 0; a < movesToCopy.length; a += 2){
        tempArray[movesToCopy[a]] = array[movesToCopy[a + 1]];
        console.log(tempArray);
    }

    for(let a = 0; a < tempArray.length; a++){
        array[a] = tempArray[a];
    }
}

function getMax(array){
    let current = array[0];
    for(let a = 1; a < array.length; a++){
        if(array[a] > current){
            current = array[a];
        }
    }

    return current;
}

function updateGrid(){
    for(let a = 0; a < redArray.length - 1; a++){
        imageToSort.loadPixels();
        imageToSort.pixels[a * 4] = redArray[a];
        imageToSort.pixels[a * 4 + 1] = greenArray[a];
        imageToSort.pixels[a * 4 + 2] = blueArray[a];
        imageToSort.pixels[a * 4 + 3] = alphaArray[a];
        imageToSort.updatePixels();
    }
}

function swap(array, a, b){
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}