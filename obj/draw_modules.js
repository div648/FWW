function eventProcessing() {
    let lastVal = -1;

    // determination coordinates
    for (let i = 0; i < allEvents.length; i++) {
        if (allEvents[i]['x'] != -1 && allEvents[i]['y'] != -1) continue

        //сдвиги
        let deviation = radius * intervals;
        if (allEvents[i]['z-index'] == lastVal) deviation += radius * 2;
        allEvents[i]['x'] = radius + radius * intervals * allEvents[i]['z-index'] + deviation;
        lastVal = allEvents[i]['z-index'];

        // сколько одинаковых значений
        let num = isSame(allEvents, 'z-index', allEvents[i]['z-index']);
        let shift = radius * intervals * num / 2;
        // индексы одинаковых значений
        let arr_identical_index = getIsSame(allEvents, 'z-index', allEvents[i]['z-index']);

        for (let j = 0; j < num; j++) {
            allEvents[arr_identical_index[j]]['y'] = height / 2 - shift + radius * intervals * j;
            //console.log(allEvents[arr_identical_index[j]]['y']);
        }
        allEvents[i]['ac'] = numConnection(allEvents, i);
        if (allEvents[i]['i-index'] == -1) {
            allEvents[i]['i-index'] = allEvents[i]['ac'];
        }
        allEvents[i]['r'] = mapNumber(allEvents[i]['ac'], 1, maxConn, radius - spread / 2, radius + spread / 2);

    }

}



function draw_links() {
    for (let i = 0; i < allEvents.length; i++) {
        ctx.shadowColor = COLOR_shadowLink;
        ctx.strokeStyle = COLOR_strokeLink;
        ctx.lineWidth = 2;

        for (let j = 0; j < allEvents[i]['references'].length; j++) {

            for (let gap = 0; gap < step; gap++) {
                for (let ii = 0; ii < numGen; ii++) {
                    let cord = interpolatePoint(allEvents[i]['x'], allEvents[i]['y'], allEvents[allEvents[i]['references'][j]]['x'], allEvents[allEvents[i]['references'][j]]['y'], gap / step);
                    let pointCord = generateRandomPointInCircle(cord['x'], cord['y'], smoothVal(gap / step) * radius);
                    ctx.beginPath();
                    ctx.arc(pointCord['x'], pointCord['y'], 1, 0, 2 * Math.PI);
                    ctx.fillStyle = COLOR_fillLink;
                    ctx.fill();
                }

            }

        }

    }

}


function draw_obj() {

    for (let i = 0; i < allEvents.length; i++) {
        let connColor = "rgb(255, " + mapNumber(allEvents[i]['ac'], 0, maxConn, 10, 230) + ", 0)";
        ctx.shadowColor = connColor;
        ctx.beginPath();
        ctx.arc(allEvents[i]['x'], allEvents[i]['y'], allEvents[i]['r'], 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = connColor;
        ctx.beginPath();
        ctx.arc(allEvents[i]['x'], allEvents[i]['y'], allEvents[i]['r'], 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillText(allEvents[i]['title'], allEvents[i]['x'], allEvents[i]['y'] + allEvents[i]['r'] + Number(ctx.font.match(/\d+/)[0]));
        
    }
}



function screen_fill() {
    ctx.fillStyle = COLOR_background;
    ctx.fillRect(0, 0, width, height);
}




function createInfoBlockLegacy(index, x = allEvents[index]['x'], y = allEvents[index]['y']) {
    let el = document.createElement('div');
    let rect = canvas.getBoundingClientRect();
    el.className = 'info-block';
    el.id = 'infoBlockByEvent' + index;

    let h2 = document.createElement('h2');
    let p = document.createElement('p');

    h2.className = 'block-title';
    p.className = 'block-text';
    h2.innerHTML = allEvents[index]['name'];
    p.innerHTML = allEvents[index]['description'];


    el.append(h2);
    if (allEvents[index]['imglink'].length > 0) {
        let img = document.createElement('img');
        img.className = 'block-img';
        img.src = foolder_name + allEvents[index]['imglink'];
        el.append(img);
    }
    el.append(p);
    canvas.after(el);

    el.style.left = (x + rect.left - el.offsetWidth / 2) + 'px';
    el.style.top = (y + rect.top - el.offsetHeight - allEvents[index]['r'] * 3) + 'px';

}


function createInfoBlock(index, x = allEvents[index]['x'], y = allEvents[index]['y']) {
    if (document.getElementById(index)) {
        delInfoBlock(index);
        return;
    }
    let block_content = document.createElement('div');
    block_content.classList.add('block-content');
    block_content.setAttribute('id', allEvents[index]['id']);
    block_content.setAttribute('draggable', 'true');
    block_content.setAttribute('ondragstart', 'return false;');

    let blockBar = document.createElement('div');
    blockBar.classList.add('block-bar');
    block_content.appendChild(blockBar);

    let titleText = document.createElement('span');
    titleText.classList.add('title-text');
    titleText.textContent = allEvents[index]['title'];
    blockBar.appendChild(titleText);

    let closePlace = document.createElement('div');
    closePlace.classList.add('close-place');
    closePlace.onclick = () => { delInfoBlock(findSerialById(Number(block_content.id))) }
    blockBar.appendChild(closePlace);

    let closeChar = document.createElement('span');
    closeChar.classList.add('close-char');
    closeChar.textContent = '×';
    closePlace.appendChild(closeChar);

    let blockInfo = document.createElement('div');
    blockInfo.classList.add('block-info');
    block_content.appendChild(blockInfo);

    let nameText = document.createElement('h2');
    nameText.classList.add('name-text');
    nameText.textContent = allEvents[index]['name'];
    blockInfo.appendChild(nameText);

    if (allEvents[index]['imglink'].length > 0) {
        let imgBlock = document.createElement('img');
        imgBlock.classList.add('img-block');
        imgBlock.setAttribute('src', foolder_name + allEvents[index]['imglink']);
        blockInfo.appendChild(imgBlock);
    }


    let descriptText = document.createElement('p');
    descriptText.classList.add('descript-text');
    descriptText.textContent = allEvents[index]['description'];
    blockInfo.appendChild(descriptText);

    let rect = canvas.getBoundingClientRect();

    canvas.after(block_content);
    /*if (y + rect.top - block_content.offsetHeight - allEvents[index]['r'] * 3 >= 0) {
        block_content.style.left = (x + rect.left - block_content.offsetWidth / 2) + 'px';
        block_content.style.top = (y + rect.top - block_content.offsetHeight - allEvents[index]['r'] * 3) + 'px';
    } else {*/
    block_content.style.left = (x + rect.left + allEvents[index]['r'] * 3) + 'px';
    block_content.style.top = (y + rect.top - block_content.offsetHeight / 2) + 'px';
    //}
    block_content.onmousedown = draggableHandler;
}



function delInfoBlock(index) {
    let el = document.getElementById(allEvents[index]['id']);
    let obj = el.getBoundingClientRect();
    let x0 = obj.x;
    let y0 = obj.y;
    let x1 = obj.right;
    let y1 = obj.bottom;
    for (let y = y0 + particle_size * 2; y < y1 - particle_size * 2; y += particle_size) {
        for (let x = x0 + particle_size * 2; x < x1 - particle_size * 2; x += particle_size) {
            if (getRandomInt(0, 100) > 50) {
                particles_fw.push({ 'x': x, 'y': y, 'ttl': particle_fw_ttl + getRandomInt(0, 100) - 50 });
            }

        }
    }

    particle_animate_on = true;
    el.animate(
        { opacity: [1, 0], scale: [1, 0.6] }, 
        { duration: 200, easing: 'ease-in' } 
    ).onfinish = function () {
        
        el.remove();
    };
}


function draggableHandler(event) {
    
    draggableBlock = event.target.parentNode;
    if (event.layerY <= 20) {
        let shiftX = event.clientX - draggableBlock.getBoundingClientRect().left;
        let shiftY = event.clientY - draggableBlock.getBoundingClientRect().top;

        draggableBlock.style.zIndex = 1000;
        moveAt(event.pageX, event.pageY);

        
        
        function moveAt(pageX, pageY) {
            
            if (pageX - shiftX > 0 && pageY - shiftY > 0) {
                draggableBlock.style.left = pageX - shiftX + 'px';
                draggableBlock.style.top = pageY - shiftY + 'px';
            }

        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        
        document.addEventListener('mousemove', onMouseMove);

        
        draggableBlock.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            draggableBlock.style.zIndex = 'auto';
            draggableBlock.onmouseup = null;
        };
    }

};

function createPoint(x, y) {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fill();
}