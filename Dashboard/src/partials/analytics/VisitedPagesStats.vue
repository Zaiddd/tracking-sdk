<template>
  <div
    class="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200"
  >
    <header class="px-5 py-4 border-b border-slate-100">
      <h2 class="font-semibold text-slate-800">Top visited pages</h2>
    </header>
    <div class="grow p-3">
      <div class="flex flex-col h-full">
        <!-- Card content -->
        <div class="grow">
          <ul
            class="flex justify-between text-xs uppercase text-slate-400 font-semibold px-2 space-x-2"
          >
            <li>Page link</li>
            <li>Visits</li>
          </ul>

          <ul class="space-y-1 text-sm text-slate-800 mt-3 mb-4">
            <li
              v-for="result in data"
              :key="result._id.page"
              class="relative px-2 py-1"
            >
              <div
                class="absolute inset-0 bg-emerald-100"
                aria-hidden="true"
                :style="
                  'width:' + result.totalVisits * 10 + 'px; max-width: 100%'
                "
              ></div>
              <div class="relative flex justify-between space-x-2">
                <div
                  style="
                    text-overflow: ellipsis;
                    overflow: hidden;
                    width: 400px;
                    white-space: nowrap;
                  "
                >
                  {{ result._id.page }}
                </div>
                <div class="font-medium">{{ result.totalVisits }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VisitedPagesStats",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>
