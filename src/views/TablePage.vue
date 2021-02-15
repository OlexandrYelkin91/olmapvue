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
    import { getDistance } from 'ol/sphere';
    export default {
        data: () => ({
            jsontrack: {},
            tempObj: { [0]: false },
        }),
        mounted() {
            axios.post('http://api-server.hidora.com/tracker/353173060445960/2020-12-15/2020-12-16')
                .then(response => (this.jsontrack = response.data));
        },
        watch: {
            jsontrack() {
                let jtob = this.jsontrack;
                let sw = false;
                let elem = 1;
                let distance = '';
                let getdistance = '';
                let coord = [];
                for (let i = +jtob.length - 1; i > 0; i--) {
                    if (jtob[i].gps_data.speed === 0 && jtob[+i - 1].gps_data.speed === 0 && sw==false) {
                        this.tempObj[elem] = {};
                        this.tempObj[elem].idfrom = jtob[i].id;
                        this.tempObj[elem].from = new Date(jtob[i].date_time).toString().split(' ', 6).join(' ');
                        this.tempObj[elem].fromcoord = [jtob[i].gps_data.longitude, jtob[i].gps_data.latitude];
                        
                        if (elem > 1) {
                            this.tempObj[+elem - 1].idto = jtob[i].id;
                            this.tempObj[+elem-1].to = new Date(jtob[i].date_time).toString().split(' ', 6).join(' ');
                            if (this.tempObj[+elem - 1].betweenstops) {

                                for (let inc = 0; inc < this.tempObj[+elem - 1].betweenstops.length - 1; inc++) {
                                    let c1;
                                    let c2;
                                    if (inc == 0) {
                                        c1 = this.tempObj[+elem - 1].fromcoord;
                                        c2 = this.tempObj[+elem - 1].betweenstops[inc];
                                    }
                                    else {
                                        c1 = this.tempObj[+elem - 1].betweenstops[inc];
                                    }
                                    if (inc === this.tempObj[+elem - 1].betweenstops.length - 2) {
                                        c2 = this.tempObj[elem].fromcoord;
                                    }
                                    if (inc != 0)
                                    {
                                        c2 = this.tempObj[+elem - 1].betweenstops[+inc + 1];
                                    }
                                    let get = getDistance(c1, c2);
                                    getdistance = +getdistance + +get;
                                }
                            }
                            if (getdistance > 1000) {
                                distance = (Math.round(getdistance / 1000 * 100) / 100) + ' ' + 'km';
                            }
                            else {
                                distance = (Math.round(getdistance * 100) / 100) + ' ' + 'm';
                            }
                            this.tempObj[+elem-1].distance = distance
                        }
                        elem++;
                        sw = true;
                        getdistance = 0;
                    }
                    if (jtob[i].gps_data.speed != 0 && sw == true) {
                        this.tempObj[elem] = {}
               
                        if (elem > 0)
                        {
                            coord.push([jtob[i].gps_data.longitude, jtob[i].gps_data.latitude]);
                            this.tempObj[+elem - 1].betweenstops = coord;
                        }
                        if (i > 1 && jtob[+i - 1].gps_data.speed === 0 && jtob[+i - 2].gps_data.speed === 0) {
                            sw = false
                            coord  = []
                        }
                    } 
                }
                console.log(this.tempObj)
                this.tempObj[0] = true;
            }
        }
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