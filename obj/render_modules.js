function init_render(index) {
    let arr_links = findAllConn(index);
    /*for (let i = 0; i < allEvents[index]['references'].length; i++) {
        particle_obj.push([index, allEvents[index]['references'][i]]);
    }*/
    for (let i = 0; i < arr_links.length; i++) {
        let iIndexArr = [];
        for (let j = 0; j < arr_links[i].length; j++) {

            if (arr_links[i][j] == -1) break;
            iIndexArr.push(allEvents[arr_links[i][j]]['i-index']);
        }

        arr_links[i] = arr_links[i].slice(0, findMaxInArr(iIndexArr) + 1);
        
    }
    particle_obj = arr_links;
    
    render_node = 0;
    particle_render_on = true;
    render_step = 0;
}

function animate_particles() {
    if (particle_animate_on) {
        screen_fill();

        for (let i = 0; i < particles.length; i++) {
            ctx.beginPath();
            ctx.arc(particles[i]['x'], particles[i]['y'], 1, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(255, 255, 255, ' + mapNumber(particles[i]['ttl'], 0, particle_ttl, 0, 0.5) + ')';
            ctx.fill();
            particles[i]['x'] += 0.5 - getRandomInt(0, 10) / 10;
            particles[i]['y'] += 0.5 - getRandomInt(0, 10) / 10;
            particles[i]['ttl'] -= 1;
            if (particles[i]['ttl'] <= 0) {
                particles.splice(i, 1);
            }
        }
        draw_obj();
        animate_windows_particles();
    }
}


function animate_windows_particles() {
    if (particles_fw.length > 0) {
        ctx.shadowColor = 'transparent';
    }

    for (let i = 0; i < particles_fw.length; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255, ' + mapNumber(particles_fw[i]['ttl'], 0, particle_fw_ttl, 0, 0.4) + ')';
        ctx.beginPath();
        ctx.arc(particles_fw[i]['x'], particles_fw[i]['y'], 2, 0, 2 * Math.PI);
        ctx.fill();

        particles_fw[i]['x'] += 0.5 - getRandomInt(0, 10) / 10;
        particles_fw[i]['y'] += 0.5 - getRandomInt(0, 10) / 10;
        particles_fw[i]['ttl'] -= 1;
        if (particles_fw[i]['ttl'] <= 0) {
            particles_fw.splice(i, 1);
        }
    }
}