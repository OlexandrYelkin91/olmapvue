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
                <tr>
                    <td></td>
                    <td></td>
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
            stopsObj: {}
        }),
        mounted() {
            axios.post('http://api-server.hidora.com/tracker/353173060445960/2020-12-15/2020-12-16')
                .then(response => (this.jsontrack = response.data));
        },
        watch: {
            jsontrack() {
                let el = -1;
                let stop = 0;
                let date = "";
                for (el in this.jsontrack) {
                    if (this.jsontrack[el]) {
                        date = new Date(this.jsontrack[el].date_time)
                        this.stopsObj[stop] = date;
                        this.stopsObj[stop].speed = this.jsontrack[el].gps_data.speed
                        stop++
                    }
                }
                console.log(this.stopsObj)
                // console.log(this.jsontrack)
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
        padding: 10px 20px;
    }
</style>