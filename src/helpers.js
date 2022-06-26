
function generateData(){
    return dataGen();
}

let data = [];
function dataGen(){
    let timestamps = 0;
    for (let i = 0; i < 2000; i++){
        timestamps+=5;
        data.push({
            "value": randn_bm(0, 10000, 4.5),
            "path": [
                coordGen(),
                coordGen(),
            ],
            "timestamps": [
                timestamps, timestamps+5
            ]
        });
    }
}

function coordGen(){
    const longMin = 79.548;
    const longMax = 79.249;

    const latMin = 43.768;
    const latMax = 43.638;

    const long = (Math.random() * (longMax-longMin) + longMin).toFixed(3)*-1;
    const lat = (Math.random() * (latMax-latMin) + latMin).toFixed(3);

    return [long,lat];
}

function randn_bm(min, max, skew) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random()
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
    
    num = num / 10.0 + 0.5 // Translate to 0 -> 1
    if (num > 1 || num < 0) 
        num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range
    
    else{
        num = Math.pow(num, skew) // Skew
        num *= max - min // Stretch to fill range
        num += min // offset to min
    }
    return num
}