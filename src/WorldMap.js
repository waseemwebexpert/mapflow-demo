import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import mapData from './world.topo.json'; // Import the world map data locally
// import data from './world-population-density.json'; // Import the population density data locally

const WorldMap = () => {
  useEffect(() => {
    const fetchData = async () => {
      const responseMapData = await fetch(
        'https://code.highcharts.com/mapdata/custom/world.topo.json'
      );
      const mapData = await responseMapData.json();

      const responseData = await fetch(
        'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-population-density.json'
      );
      const data = await responseData.json();

      Highcharts.mapChart('container', {
        title: {
          text: 'Predefined zoomed area',
        },

        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: 'bottom',
          },
        },

        mapView: {
          projection: {
            name: 'WebMercator',
          },
          center: [10, 58],
          zoom: 2.8,
        },

        colorAxis: {
          min: 1,
          max: 1000,
          type: 'logarithmic',
        },

        legend: {
          title: {
            text: 'Population density per km²',
          },
        },

        series: [
          {
            data,
            mapData,
            joinBy: ['iso-a2', 'code'],
            name: 'Population density',
            tooltip: {
              valueSuffix: '/km²',
            },
          },
        ],
      });
    };

    fetchData();
  }, []);

  return <div id="container" style={{ height: '500px', width: '100%' }} />;
};

export default WorldMap;
