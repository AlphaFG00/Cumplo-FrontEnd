<template>
  <div>
    <div>
      <h1 class="field is-grouped is-grouped-centered">UDIS</h1>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <button ref='trigger' type='button'>
        Change
      </button>
      <button @click="getUdis" class="button is-success ml-1">
                  <span class="icon is-small">
                      <i class="fas fa-check"></i>
                  </span>
      </button>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <table class="table is-bordered">
        <thead>
        <tr>
          <th class="">Promedio</th>
          <th>Valor Minimo</th>
          <th>Valor Maximo</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="">{{datos.average}}</td>
          <td>{{datos.min}}</td>
          <td>{{datos.max}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="columns">
      <div class="column">
        <div class="small">
          <line-chart
            :chartData = datacollection
          />
        </div>
      </div>
      <div class="column">
        <div class="field is-grouped is-grouped-centered">
          <table class="table is-bordered">
            <thead>
            <tr>
              <th class="">Fecha</th>
              <th>Valor</th>
            </tr>
            </thead>
            <tbody>
            <tr :key="item" v-for="item in datos.currency_values">
              <td class="">{{item.fecha}}</td>
              <td>{{item.dato}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios';
import bulmaCalendar from 'bulma-calendar';
import moment from 'moment';
// eslint-disable-next-line import/extensions
import LineChart from '@/components/LineChart.js';

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      datos: '',
      init_date: new Date(),
      end_date: null,
      currency: 'SP68257',
      datacollection: null,
    };
  },
  methods:
    {
      fillData(labels, data) {
        this.datacollection = {
          // eslint-disable-next-line no-undef
          labels,
          datasets: [
            {
              label: 'UDIIS',
              backgroundColor: '#56C56D',
              // eslint-disable-next-line no-undef
              data,
            },
          ],
        };
      },
      getUdis() {
        // eslint-disable-next-line camelcase
        const request_data = {
          init_date: this.init_date,
          end_date: this.end_date,
          currency: this.currency,
        };
        console.log(request_data);
        axios.post('http://127.0.0.1:8000/currencies/', request_data).then((response) => {
          this.datos = response.data;
          // eslint-disable-next-line no-array-constructor
          const labels = new Array();
          // eslint-disable-next-line no-array-constructor
          const data = new Array();
          response.data.currency_values.forEach((a) => {
            labels.push(a.fecha);
            data.push(a.dato);
          });
          this.fillData(labels, data);
        });
      },
      // eslint-disable-next-line no-unused-vars
      filteringDates(value) {
        return moment(value).format('YYYY-MM-DD');
      },
    },
  mounted() {
    // eslint-disable-next-line new-cap
    const calendar = new bulmaCalendar(this.$refs.trigger, {
      startDate: this.init_date,
      type: 'date',
      isRange: true,
      color: 'success',
    });
    // eslint-disable-next-line no-return-assign
    calendar.on('select', (e) => {
      // eslint-disable-next-line camelcase
      const selected_date = e.data.value().split('-');
      // eslint-disable-next-line camelcase,prefer-destructuring
      this.init_date = this.filteringDates(selected_date[0]);
      // eslint-disable-next-line prefer-destructuring
      this.end_date = this.filteringDates(selected_date[1]);
      // eslint-disable-next-line no-undef
    });
    this.fillData(this.datos);
  },
};
</script>

<style>
.small {
  max-width: 800px;
  /* max-height: 500px; */
  margin:  50px auto;
}
</style>
