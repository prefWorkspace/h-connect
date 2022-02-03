// chart js test
// const $vitalEcg = $('#vital-ecg-graph');
// const ctx = $vitalEcg.get(0).getContext('2d');

// const data = [];
// const data2 = [];
// let prev = 100;
// for (let i = 0; i < 1000; i++) {
//   prev += 5 - Math.random() * 10;
//   data.push({x: i, y: prev});
// }

// const totalDuration = 10000;
// const delayBetweenPoints = totalDuration / data.length;
// const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
// const animation = {
//   x: {
//     type: 'number',
//     easing: 'linear',
//     duration: delayBetweenPoints,
//     from: NaN, // the point is initially skipped
//     delay(ctx) {
//       if (ctx.type !== 'data' || ctx.xStarted) {
//         return 0;
//       }
//       ctx.xStarted = true;
//       return ctx.index * delayBetweenPoints;
//     }
//   },
//   y: {
//     type: 'number',
//     easing: 'linear',
//     duration: delayBetweenPoints,
//     from: previousY,
//     delay(ctx) {
//       if (ctx.type !== 'data' || ctx.yStarted) {
//         return 0;
//       }
//       ctx.yStarted = true;
//       return ctx.index * delayBetweenPoints;
//     }
//   }
// };


// const chart = new Chart(ctx, {
//     type:'line',
//     data: {
//         datasets: [{
//             data: data,
//             // fill:false,
//             tension:0.4,
//             radius:0,
//             borderColor:[
//                 'rgba(0, 255, 25, 1)',
//             ],
//             borderWidth:1
//         }]
//     },
//     options: {
//         animation,
//         interaction: {
//             intersect: false
//         },
//         plugins: {
//             legend: {
//                 display:false
//             },
//             elements: {
//                 point: {
//                     radius:0
//                 }
//             },
//         },
//         scales: {
//           x: {
//             type: 'linear'
//           }
//         }
//       }
// });

// d3 test
const $vitalEcg = $('#vital-ecg-graph');