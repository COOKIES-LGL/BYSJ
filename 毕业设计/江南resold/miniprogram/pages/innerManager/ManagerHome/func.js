import * as echarts from '../../../ec-canvas/echarts';

function generatePieOptions(title) {
   const option = {
      title: {
         text: title,
         x: 'center'
      },
      series: [
         {
            label: {
               normal: {
                  fontSize: 10,
                  position: 'inner'
               }
            },
            type: 'pie',
            center: ['50%', '50%'],
            radius: [0, '30%'],
            data: []
         }]
   }
   return option;
}

const pieOption = generatePieOptions('使用权重');


function initChart(_pieOption) {
   return function (canvas, width, height) {
      const chart = echarts.init(canvas, null, {
         width: width,
         height: height
      });
      canvas.setChart(chart);
      chart.setOption(_pieOption);
      return chart;
   }
}

export{
   pieOption,
   initChart,
}