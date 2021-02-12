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
            <tbody>
                <tr v-for="(el, index) in doObj" :key="index" >
                    <td>{{index}}</td>
                    <td>{{el.from}}</td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <div>

        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data: () => ({
            jsontrack: {},
            doObj: {}
        }),
        mounted() {
            axios.post('http://api-server.hidora.com/tracker/353173060445960/2020-12-15/2020-12-16')
              .then(response => (this.jsontrack = response.data));
        },
        watch: {
            jsontrack() {
                    for (let i = 0; i < this.jsontrack.length; i++) {
                        //if (this.jsontrack[i].gps_data.speed === 0) {
                        //    if (this.jsontrack[+i + 1].gps_data.speed === 0) {
                        //        console.log(i)
                        //    }
                        //}
                        this.doObj[i] = {}
                        this.doObj[i].from = new Date(this.jsontrack[i].date_time).toString();
                        this.doObj[i].speed = this.jsontrack[i].gps_data.speed
                        this.doObj[i].latitude = this.jsontrack[i].gps_data.latitude
                        this.doObj[i].longitude = this.jsontrack[i].gps_data.longitude
                    }
                console.log(this.doObj);
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
</style>