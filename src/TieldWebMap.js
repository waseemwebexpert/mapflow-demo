import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';

// Load the map module
HighchartsMap(Highcharts);

const WorldPopulationMap = () => {
  useEffect(() => {
    const fetchMapData = async () => {
      const topologyResponse = await fetch(
        'https://code.highcharts.com/mapdata/custom/world.topo.json'
      );
      const topology = await topologyResponse.json();

      const dataResponse = await fetch(
        'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-population.json'
      );
      const data = await dataResponse.json();

      // Create the Highcharts map chart
      Highcharts.mapChart('container', {
        chart: {
            map: topology
        },

        title: {
            text: 'World population 2016 by country'
        },

        subtitle: {
            text: 'Demo of Highcharts map with bubbles'
        },

        accessibility: {
            description: 'We see how China and India by far are the countries with the largest population.'
        },

        legend: {
            enabled: false
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        mapView: {
            fitToGeometry: {
                type: 'MultiPoint',
                coordinates: [
                    // Alaska west
                    [-164, 54],
                    // Greenland north
                    [-35, 84],
                    // New Zealand east
                    [179, -38],
                    // Chile south
                    [-68, -55]
                ]
            }
        },

        series: [{
            name: 'Countries',
            color: '#E0E0E0',
            enableMouseTracking: false
        }, {
            type: 'mapbubble',
            name: 'Population 2016',
            joinBy: ['iso-a3', 'code3'],
            data: data,
            minSize: 4,
            maxSize: '12%',
            tooltip: {
                pointFormat: '{point.properties.hc-a2}: {point.z} thousands'
            }
        }]
    });
    };

    fetchMapData();
  }, []);

  return (
    <div>
      <div id="container"></div>
    </div>
  );
};

export default WorldPopulationMap;
