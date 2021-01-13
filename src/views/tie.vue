<template>
  <div>
    <div>
          <h1 class="field is-grouped is-grouped-centered">TIIE's</h1>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <button ref='trigger' type='button'>
        Change
      </button>
      <button @click="getTiies" class="button is-success ml-1">
                  <span class="icon is-small">
                      <i class="fas fa-check"></i>
                  </span>
      </button>
    </div>
    <div class="columns mt-6">
          <div class="column">
            <h1 class="field is-grouped is-grouped-centered">TIIE de Fondeo a Un Día Hábil Bancario,
                  Mediana ponderada por volumen</h1>
            <div class="small container">
              <line-chart :chart-data="datacollection"
                style="width: 500px; height: 500px;"></line-chart>
            </div>
          </div>
          <div class="column">
              <h1 class="field is-grouped is-grouped-centered">
                Tasas de interés interbancarias Por ciento anual TIIE a 91 días</h1>
            <div class="small container">
      <line-chart :chart-data="datacollection_2"
                   style="width:  500px; height: 500px;"></line-chart>
            </div>
          </div>
    </div>
    <br>
    <div class="columns mt-6">
      <div class="column">
        <h1 class="field is-grouped is-grouped-centered">TIIE a 182 días</h1>
        <div class="small container">
      <line-chart :chart-data="datacollection_3" style="width:  500px; height: 500px;"></line-chart>
        </div>
      </div>
      <div class="column">
        <h1 class="field is-grouped is-grouped-centered">
          TIIE a 28 días Tasa de interés en por ciento anual</h1>
        <div class="small container">
      <line-chart :chart-data="datacollection_4" style="width: 500px; height: 500px;"></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '@/axios';
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
      currency: 'SF331451,SF43783,SF43878,SF111916',
      datacollection: null,
      datacollection_2: null,
      datacollection_3: null,
      datacollection_4: null,
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
              label: 'Porcentaje',
              backgroundColor: '#56C56D',
              // eslint-disable-next-line no-undef
              data,
            },
          ],
          options: {
            responsive: true,
          },
        };
      },
      fillData_2(labels, data) {
        this.datacollection_2 = {
          // eslint-disable-next-line no-undef
          labels,
          datasets: [
            {
              label: 'Porcentaje',
              backgroundColor: '#56C56D',
              // eslint-disable-next-line no-undef
              data,
            },
          ],
          options: {
            responsive: true,
          },
        };
      },
      fillData_3(labels, data) {
        this.datacollection_3 = {
          // eslint-disable-next-line no-undef
          labels,
          datasets: [
            {
              label: 'Porcentaje',
              backgroundColor: '#56C56D',
              // eslint-disable-next-line no-undef
              data,
            },
          ],
          options: {
            responsive: true,
          },
        };
      },
      fillData_4(labels, data) {
        this.datacollection_4 = {
          // eslint-disable-next-line no-undef
          labels,
          datasets: [
            {
              label: 'Porcentaje',
              backgroundColor: '#56C56D',
              // eslint-disable-next-line no-undef
              data,
            },
          ],
          options: {
            responsive: true,
          },
        };
      },
      getTiies() {
        // eslint-disable-next-line camelcase
        const request_data = {
          init_date: this.init_date,
          end_date: this.end_date,
          currency: this.currency,
        };
        axios.post('currencies/', request_data).then((response) => {
          this.datos = response.data;
          // eslint-disable-next-line camelcase,no-array-constructor
          const T1_labels = new Array();
          // eslint-disable-next-line camelcase,no-array-constructor
          const T1_data = new Array();
          // eslint-disable-next-line camelcase,no-array-constructor
          const T2_labels = new Array();
          // eslint-disable-next-line camelcase,no-array-constructor
          const T2_data = new Array();
          // eslint-disable-next-line camelcase,no-array-constructor
          const T3_labels = new Array();
          // eslint-disable-next-line camelcase,no-array-constructor
          const T3_data = new Array();
          // eslint-disable-next-line camelcase,no-array-constructor
          const T4_labels = new Array();
          // eslint-disable-next-line camelcase,no-array-constructor
          const T4_data = new Array();
          response.data.T1.forEach((a) => {
            T1_labels.push(a.fecha);
            T1_data.push(a.dato);
          });
          response.data.T2.forEach((b) => {
            T2_labels.push(b.fecha);
            T2_data.push(b.dato);
          });
          response.data.T3.forEach((c) => {
            T3_labels.push(c.fecha);
            T3_data.push(c.dato);
          });
          response.data.T4.forEach((d) => {
            T4_labels.push(d.fecha);
            T4_data.push(d.dato);
          });
          console.log(T1_labels, T1_data);
          console.log(T2_labels, T2_data);
          console.log(T3_labels, T3_data);
          console.log(T4_labels, T4_data);
          // eslint-disable-next-line no-unused-vars
          let id;
          // eslint-disable-next-line no-unused-vars
          let id2;
          this.fillData(T1_labels, T1_data);
          this.fillData_2(T2_labels, T2_data);
          this.fillData_3(T3_labels, T3_data);
          this.fillData_4(T4_labels, T4_data);
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
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin:  150px auto;
}
</style>
