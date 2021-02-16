<template>
    <div>
        <div class="load" v-if="load"></div>
        <div ref="map-root"
             style="width: 100vh; height: 96vh">
        </div>
    </div>
</template>
<script>
    import View from 'ol/View'
    import Map from 'ol/Map'
    import TileLayer from 'ol/layer/Tile'
    import OSM from 'ol/source/OSM'
    import VectorLayer from 'ol/layer/Vector'
    import VectorSource from 'ol/source/Vector'
    import GeoJSON from 'ol/format/GeoJSON'
    import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
    import MultiPoint from 'ol/geom/MultiPoint';
    import Icon from 'ol/style/Icon'
    import Point from 'ol/geom/Point'
    import 'ol/ol.css'
    export default {
        name: 'MapContainer',
        components: {},
        props: {
            geojson: Object,
            getjson: Boolean
        },
        data: () => ({
            olMap: null,
            vectorLayer: null,
            load: true,
            jsontrack: {},
        }),
        mounted() {
            this.vectorLayer = new VectorLayer({
                source: new VectorSource({
                    features: [],
                }),
                style: [
                    new Style({
                        stroke: new Stroke({
                             color: 'blue',
                             width: 3,
                         }),
                    }),
                    new Style({
                        image: new CircleStyle({
                            radius: 5,
                            fill: new Fill({
                                color: 'red',
                            }),
                        }),
                        geometry: function (feature) {
                            var coordinates = feature.getGeometry().getCoordinates();
                            return new MultiPoint(coordinates);
                        },
                    }),
                    new Style({
                        image: new Icon({
                            anchor: [0.5, 1],
                            src: 'https://img3.freepng.ru/dy/f351d4aa7b4208e9a9471895ae9c1b7d/L0KzQYm3VMI2N5drj5H0aYP2gLBuTfdzbZZzRdVycnPvdX68gfUxbWo2eahvMEnkSXA8UcY5OmQ5SqMAMkS5SIq4V8g1PWU9RuJ3Zx==/kisspng-green-circle-5ae0e91a6f09a9.5168234215246891784548.png',
                            scale: 0.07,
                        }),
                        geometry: function (feature) {
                            var coordinates = feature.getGeometry().getCoordinates()[feature.getGeometry().getCoordinates().length - 1];
                            return new Point(coordinates);
                        },
                    })
                ]
            }),
            this.olMap = new Map({
                target: this.$refs['map-root'],
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                    this.vectorLayer
                ],
                view: new View({
                    zoom: 0,
                    center: [0, 0],
                    constrainResolution: true
                })
            })
        },
        watch: {
            getjson() {
                const view = this.olMap.getView()
                const source = this.vectorLayer.getSource()
                const features = new GeoJSON({
                    featureProjection: 'EPSG:3857'
                }).readFeatures(this.geojson)
                source.clear()
                source.addFeatures(features)
                view.fit(source.getExtent())
                this.load = false
            }
        }
    }
</script>
<style>
    .ol-attribution li {
        display: none;
    }
    .load {
        background: url('../assets/load.gif') no-repeat center;
        height: 96vh;
        width: 100vh;
        position: absolute;
        z-index: 10;
    }
</style>