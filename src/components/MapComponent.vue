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
                    features: []
                })
            })
            this.olMap = new Map({
                target: this.$refs['map-root'],
                layers: [
                    new TileLayer({
                        source: new OSM()
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