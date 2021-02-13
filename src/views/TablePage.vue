<template>
    <div id="table-way">
        <table>
            <thead>
                <tr>
                    <th>&#8470;</th>
                    <th>stop time from</th>
                    <th>stop time to</th>
                    <th>km</th>
                </tr>
            </thead>
            <tbody v-for="(el, index) in tempObj" :key="index">
                <tr v-if="el.from!=undefined">
                    <td>{{index}}</td>
                    <td>{{el.from}}</td>
                    <td>{{el.to}}</td>
                    <td>{{el.distance}}</td>
                </tr>
            </tbody>
            <tbody v-if="tempObj[0]==false">
                <div class="load"></div>
            </tbody>
        </table>
    </div>
</template>
<script>
    import axios from 'axios'
    //import ol from 'ol'
    //import GeoJSON from 'ol/format/GeoJSON'
    //import map from 'ol/Map'
    //import Point from 'ol/geom/Point'
    import { getDistance } from 'ol/sphere';
    export default {
        data: () => ({
            jsontrack: {},
            tempObj: {[0]:false},
        }),
        mounted() {
            axios.post('http://api-server.hidora.com/tracker/353173060445960/2020-12-15/2020-12-16')
              .then(response => (this.jsontrack = response.data));
        },
        watch: {
            jsontrack() {
                let jtob = this.jsontrack;
                let inc = 0;
                let elem = 1;
                //                                 --путь в json почемуто идет с конца--
                //for (let i = 0; i < jtob.length; i++) { 
                for (let i = +jtob.length - 1; i > 0; i--) {
                    //if (i < +jtob.length - 1) {
                    //if (jtob[i].gps_data.speed === 0 && jtob[+i + 1].gps_data.speed === 0 && inc == 0) {
                    if (jtob[i].gps_data.speed === 0 && jtob[+i - 1].gps_data.speed === 0 && inc == 0) {

                        inc = 1;
                        this.tempObj[elem] = {};
                        this.tempObj[elem].idfrom = jtob[i].id;
                        this.tempObj[elem].from = new Date(jtob[i].date_time).toString().split(' ', 6).join(' ');
                        this.tempObj[elem].fromcoord = [jtob[i].gps_data.longitude, jtob[i].gps_data.latitude];
                        elem++;
                    }
                    //if (i != 0 && jtob[+i - 1].gps_data.speed === 0 && jtob[i].gps_data.speed != 0) {
                    if (i < +jtob.length - 1 && jtob[+i + 1].gps_data.speed === 0 && jtob[i].gps_data.speed != 0 && inc == 1) {
                        inc = 0;
                        elem--;
                        this.tempObj[elem].idto = jtob[i].id;
                        this.tempObj[elem].to = new Date(jtob[i].date_time).toString().split(' ', 6).join(' ');
                        elem++;
                    }
                    // }
                }

                this.tempObj[0] = true;              
                    
                let distance;
                for (let i = 1; i < elem - 1; i++) {
                    let getdistance = getDistance(this.tempObj[i].fromcoord, this.tempObj[+i+1].fromcoord)
                    if (getdistance > 1000) {
                        distance = (Math.round(getdistance / 1000 * 100) / 100) + ' ' + 'km';
                    } else {
                        distance = (Math.round(getdistance * 100) / 100) + ' ' + 'm';
                    }
                    this.tempObj[+i + 1].distance = distance
                }
            }
        },
    }
</script>
<style scoped>
    table {
        border: 2px solid #42b983;
        border-radius: 3px;
        background-color: #fff;
        margin: 30px auto;
    }

    th {
        background-color: #42b983;
        color: rgba(255, 255, 255, 0.66);
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    td {
        background-color: #f9f9f9;
    }

    th,
    td {
        min-width: 120px;
        max-width:400px;
        padding: 10px 20px;
    }
    .load {
        width: 645px;
        height: 200px;
        background: url('../assets/load.gif') no-repeat center;
        z-index: 10;
        position:absolute;
        z-index:11;
    }
</style>