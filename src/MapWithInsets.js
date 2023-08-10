import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import flowmapModule from 'highcharts/modules/flowmap';

// Initialize Highcharts modules
highchartsMap(Highcharts);
flowmapModule(Highcharts);

const Flowmap = () => {
    const fetchData = async () => {
        const response = await fetch(
            'https://code.highcharts.com/mapdata/custom/europe.topo.json'
        );
        const topology = await response.json();

        Highcharts.mapChart('container', {
            chart: {
                map: topology,
            },
            title: {
                text: 'Highmaps basic flowmap demo',
            },
            subtitle: {
                text: 'Highcharts Maps flow map',
            },
            mapNavigation: {
                enabled: true,
            },
            legend: {
                enabled: false,
            },
            accessibility: {
                point: {
                    valueDescriptionFormat: '{xDescription}.',
                },
            },
            plotOptions: {
                mappoint: {
                    tooltip: {
                        headerFormat: '{point.point.id}<br>',
                        pointFormat: 'Lat: {point.lat} Lon: {point.lon}',
                    },
                },
            },
            series: [
                {
                    name: 'Basemap',
                    showInLegend: false,
                    states: {
                        inactive: {
                            enabled: false,
                        },
                    },
                },
                {
                    type: 'mappoint',
                    id: 'europe',
                    name: 'Cities',
                    dataLabels: {
                        format: '{point.id}',
                    },
                    data: [
                        {
                            id: 'Oslo',
                            lat: 59.91,
                            lon: 10.76,
                        },
                        // Add more data points here as needed
                    ],
                },
                {
                    type: 'flowmap',
                    name: 'Flow route',
                    accessibility: {
                        description:
                            'This is a demonstration of the flowmap using weighted links.',
                    },
                    linkedTo: ':previous',
                    minWidth: 5,
                    maxWidth: 15,
                    growTowards: true,
                    markerEnd: {
                        width: '50%',
                        height: '50%',
                    },
                    fillColor: '#31c2cc',
                    fillOpacity: 0.2,
                    color: '#0000FF',
                    data: [
                        {
                            from: 'Oslo',
                            to: 'Helsinki',
                            weight: 20,
                            markerEnd: {
                                width: '70%',
                                height: '70%',
                            },
                        },
                        // Add more flow data here as needed
                    ],
                },
            ],
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return <div id="container" style={{ height: '500px', width: '100%' }} />;
};

export default Flowmap;
