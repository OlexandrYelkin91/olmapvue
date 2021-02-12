<template>
    <div id="map-block">
        <map-component :geojson="geojson" :getjson ="getjson"></map-component>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'map-block',
        components: {
            MapComponent: () => import('@/components/MapComponent'),
        },
        data: () => ({
            getjson: false,
            jsontrack: {},
            geojson: {
                type: 'Feature',
                properties: {
                    name: 'rout',
                    transport: 'truck'
                },
                geometry: {
                    type: 'LineString',
                }
            }
        }),
        mounted() {
            axios.post('http://api-server.hidora.com/tracker/353173060445960/2020-12-15/2020-12-16')
                .then(response => (this.jsontrack = response.data))
        },
        watch: {
            jsontrack() {
                let coord = [];
                for (let el in this.jsontrack) {
                    if (this.jsontrack[el]) {
                        coord.push([this.jsontrack[el].gps_data.longitude, this.jsontrack[el].gps_data.latitude])
                    }
                }
                this.geojson.geometry.coordinates = coord
                this.getjson = true
            },
        },
    }
</script>
<style scoped>
    #map-block {
        height: 100%;
        width: 100vh;
        margin: 0 auto;
    }
</style>