


setInterval(() => {
    let accumulated_error = 0;
    if (particle_render_on && particle_obj.length > 0 && render_node != -1) {
        particle_animate_on = true;
        //setTimeout(() => { particle_animate_on = false; }, 10000);
        for (let i = 0; i < particle_obj.length; i++) {
            if (render_node + 1 < particle_obj[i].length) {
                
                let f = particle_obj[i][render_node];
                let t = particle_obj[i][render_node + 1];
                for (let ii = 0; ii < numGen; ii++) {

                    let cord = interpolatePoint(allEvents[f]['x'], allEvents[f]['y'], allEvents[t]['x'], allEvents[t]['y'], render_step);
                    //console.log('f:' + f + '    t:' + t)
                    let pointCord = generateRandomPointInCircle(cord['x'], cord['y'], smoothVal(render_step) * radius);
                    particles.push({ 'x': pointCord['x'], 'y': pointCord['y'], 'ttl': particle_ttl });
                    ctx.beginPath();
                    ctx.arc(pointCord['x'], pointCord['y'], 1, 0, 2 * Math.PI);
                    ctx.fillStyle = COLOR_particle;
                    ctx.fill();
                }

            } else accumulated_error++;

        }

        if (accumulated_error >= particle_obj.length) {
            console.log('errors: ' + accumulated_error)
            particle_render_on = false;
            particle_obj = [];
            render_node = -1;
            render_step = 0;
        }

        render_step += 1 / step;
        if (render_step >= 1) {
            render_node++;
            render_step = 0;
        }
    }
}, 16);

setInterval(animate_particles, 33);



/*function tracing(numObj, numStep=2) {
    for (let i = 0; i < allEvents[numObj]['references'].length; i++) {
        for (let vis = 0; vis < numStep; vis++) {
            //allEvents[allEvents[numObj]['references'][i]]['references']
            for () {
                for () {

                }
            }
        }
    }
}*/





