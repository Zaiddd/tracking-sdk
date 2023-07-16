<template>
    <div class="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
        <header class="px-5 py-4 border-b border-slate-100">
            <h2 class="font-semibold text-slate-800">Used browsers</h2>
        </header>
        <!-- Chart built with Chart.js 3 -->
        <!-- Change the height attribute to adjust the chart height -->
        <DoughnutChart v-if="chartData" :data="chartData" width="389" height="260"/>
    </div>
</template>

<script>
import {ref} from 'vue'
import DoughnutChart from '../../charts/DoughnutChart.vue'

// Import utilities
import {tailwindConfig} from '../../utils/Utils'

export default {
    name: 'UsedBrowsersStats',
    props: ['appId', 'API_URL'],
    components: {
        DoughnutChart,
    },
    data() {
        return {
            chartData: null,
            browsers: [],
        }
    },
    methods: {
        async getAllUsedBrowers() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/browser`, {
                headers: {
                    'Content-Type': 'application/json',
                    "App-Id": this.appId,
                },
                method: 'GET',
            });

            this.browsers = await response.json();
        },
    },
    async created() {
        await this.getAllUsedBrowers();

        const chartData = ref({
            labels: ['0'],
            datasets: [
                {
                    label: 'Used Browsers',
                    data: [
                        0
                    ],
                    backgroundColor: [
                        tailwindConfig().theme.colors.indigo[500],
                        tailwindConfig().theme.colors.sky[400],
                        tailwindConfig().theme.colors.rose[500],
                        tailwindConfig().theme.colors.emerald[500],
                    ],
                    hoverBackgroundColor: [
                        tailwindConfig().theme.colors.indigo[600],
                        tailwindConfig().theme.colors.sky[500],
                        tailwindConfig().theme.colors.rose[600],
                        tailwindConfig().theme.colors.emerald[600],
                    ],
                    hoverBorderColor: tailwindConfig().theme.colors.white,
                },
            ],
        })

        this.chartData = chartData;
        let counter = 0;

        for (let browser of this.browsers) {
            this.chartData.labels[counter] = browser._id;
            this.chartData.datasets[0].data[counter] = browser.count;
            counter++;

            if (!this.browsers[counter]) {
                this.chartData.labels.splice(counter)
                this.chartData.datasets[0].data.length = counter;
            }
        }
    }
}
</script>