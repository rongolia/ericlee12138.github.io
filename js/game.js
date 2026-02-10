// $.when($.ready).then(() => {
//     var game = '#banner';
//     var params = {
//         width: $(game).innerWidth(),
//         height: $(game).innerHeight()
//     };
//     var elem = document.getElementById('banner');
//     var two = new Two(params).appendTo(elem);

//     var group = two.makeGroup();

//     let space = 30;
//     let nx = 26; ny = 26;
//     for (let i = 0; i < nx; i++) {
//         for (let j = 0; j < ny; j++) {
//             if (j % 2 == 0) {
//                 var circle = two.makeCircle((i - nx / 2) * space, (j - ny / 2) * space, 5);
//                 circle.fill = '#FF8000';
//                 group.add(circle);
//             } else {
//                 var rect = two.makeRectangle((i - nx / 2) * space, (j - ny / 2) * space, 10, 10);
//                 rect.fill = 'rgba(0, 200, 255, 0.75)';
//                 group.add(rect);
//             }
//         }
//     }

//     var cx = two.width * 0.5;
//     var cy = two.height * 0.5;
//     group.position.set(cx, cy);
//     group.noStroke();

//     two.bind('update', update);
//     two.play();

//     function update(frameCount) {
//         group.rotation += 0.001 * Math.PI;
//     }
// });