<template>
    <div class="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
        <header class="px-5 py-4 border-b border-slate-100">
            <h2 class="font-semibold text-slate-800">Used devices</h2>
        </header>
        <!-- Chart built with Chart.js 3 -->
        <!-- Change the height attribute to adjust the chart height -->
        <DoughnutChart v-if="chartData" :data="chartData" width="389" height="260"/>
    </div>
</template>

<script>
import {ref} from 'vue'
import PolarChart from '../../charts/PolarChart.vue'

// Import utilities
import {tailwindConfig, hexToRGB} from '../../utils/Utils'
import DoughnutChart from "@/charts/DoughnutChart.vue";

export default {
    name: 'UsedDevicesStats',
    props: ['appId', 'API_URL'],
    components: {
        DoughnutChart,
    },
    data() {
        return {
            chartData: null,
            devices: [],
        }
    },
    methods: {
        async getAllDevices() {
            const response = await fetch(`${this.API_URL}/device`, {
                headers: {
                    'Content-Type': 'application/json',
                    "App-Id": this.appId,
                },
                method: 'GET',
            });
            this.devices = await response.json();
        },
    },
    async created() {
        await this.getAllDevices();

        const chartData = ref({
            labels: ['0'],
            datasets: [
                {
                    label: 'Used devices',
                    data: [
                        0,
                    ],
                    backgroundColor: [
                        `rgba(${hexToRGB(tailwindConfig().theme.colors.indigo[500])}, 0.8)`,
                        `rgba(${hexToRGB(tailwindConfig().theme.colors.sky[400])}, 0.8)`,
                        `rgba(${hexToRGB(tailwindConfig().theme.colors.emerald[500])}, 0.8)`,
                    ],
                    hoverBackgroundColor: [
                        `rgba(${hexToRGB(tailwindConfig().theme.colors.indigo[600])}, 0.8)`,
                        `rgba(${hexToRGB(tailwindConfig().theme.colors.sky[500])}, 0.8)`,
                        `rgba(${hexToRGB(tailwindConfig().theme.colors.emerald[600])}, 0.8)`,
                    ],
                    hoverBorderColor: tailwindConfig().theme.colors.white,
                },
            ],
        })

        this.chartData = chartData;
        let counter = 0;

        for (let device of this.devices) {
            this.chartData.labels[counter] = device._id;
            this.chartData.datasets[0].data[counter] = device.count;
            counter++;

            if (!this.devices[counter]) {
                this.chartData.labels.splice(counter)
                this.chartData.datasets[0].data.length = counter;
            }
        }
    },
}
</script>