function findAllConn(id, depth = 2) {
    let temporary_routes = find_secondary_conn(id, true);
    let i = 0
    let skip_transition = false;
    while (i < temporary_routes.length) {
        for (let j = temporary_routes[i].length - 1; j < depth; j++) {
            if (temporary_routes[i][temporary_routes[i].length - 1] == -1) break;
            secondary_conn = find_secondary_conn(temporary_routes[i][j]);
            if (secondary_conn.length > 1) {
                for (let copy = 0; copy < secondary_conn.length; copy++) {
                    temporary_routes.push([...temporary_routes[i], secondary_conn[copy]]);
                }
                temporary_routes.splice(i, 1);
                skip_transition = true;
                break;
            } else {
                temporary_routes[i].push(...secondary_conn);
            }
        }
        if (skip_transition) skip_transition = false;
        else i++;
    }
    return temporary_routes;
}

function find_secondary_conn(id, first = false) {
    let secondary_conn = [-1];
    let newIndex = findSerialById(id);

    if (allEvents[newIndex]['references'].length > 0) secondary_conn = allEvents[newIndex]['references'];
    if (first) return createOneToMany(newIndex, secondary_conn);
    else return secondary_conn;
}

function createOneToMany(index, arr) {
    let tree = [];
    for (let i = 0; i < arr.length; i++) {
        tree.push([allEvents[index]['id'], arr[i]]);
    }
    return tree;
}


function findSerialById(idEntity) {
    for (let i = 0; i < allEvents.length; i++) {
        if (allEvents[i]['id'] == idEntity) return i;
    }
    return -1;
}


function findMaxInArr(arr) {
    let indexMaxVal = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[indexMaxVal] < arr[i]) indexMaxVal = i;
    }
    if (indexMaxVal == 0) indexMaxVal = arr.length - 1;
    return indexMaxVal;
}


function isInsideCircle(mouseX, mouseY, index) {
    let distance = Math.sqrt(Math.pow(mouseX - allEvents[index]['x'], 2) + Math.pow(mouseY - allEvents[index]['y'], 2));
    return distance < allEvents[index]['r'];
}


function isSame(arr, key, val) {
    let num = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][key] == val) num++;
    }
    return num;
}


function getIsSame(arr, key, val) {
    let num = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][key] == val) num.push(i);
    }
    return num;
}


function numConnection(arr, index) {
    let counter = arr[index]['references'].length;
    for (let i = 0; i < arr.length; i++) {
        if (i == index) continue;
        for (let j = 0; j < arr[i]['references'].length; j++) {
            if (arr[i]['references'][j] == index) counter++;
        }
    }
    return counter;
}


function mapNumber(value, minFrom, maxFrom, minTo, maxTo) {
    let normalizedValue = (value - minFrom) / (maxFrom - minFrom);
    let newValue = normalizedValue * (maxTo - minTo) + minTo;
    return newValue;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function interpolatePoint(x1, y1, x2, y2, t) {
    let newX = x1 + (x2 - x1) * t;
    let newY = y1 + (y2 - y1) * t;
    return { x: newX, y: newY };
}


function generateRandomPointInCircle(centerX, centerY, radius) {
    let angle = Math.random() * 2 * Math.PI;
    let distance = Math.sqrt(Math.random()) * radius;
    let newX = centerX + distance * Math.cos(angle);
    let newY = centerY + distance * Math.sin(angle);

    return { x: newX, y: newY };
}


function smoothVal(val) {
    return Math.abs(val - 0.5) * 2;
}