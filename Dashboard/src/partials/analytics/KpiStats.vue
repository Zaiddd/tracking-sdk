<template>
  <div
    class="col-span-full bg-white shadow-lg rounded-sm border border-slate-200"
  >
    <header class="px-5 py-4 border-b border-slate-100">
      <h2 class="font-semibold text-slate-800">Events tracker</h2>
    </header>
    <div class="p-3">
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <!-- Table header -->
          <thead
            class="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm"
          >
            <tr>
              <th class="p-2 whitespace-nowrap">
                <div class="font-semibold text-left">User (ID Visitor)</div>
              </th>
              <th class="p-2 whitespace-nowrap">
                <div class="font-semibold text-left">Event</div>
              </th>
              <th class="p-2 whitespace-nowrap">
                <div class="font-semibold text-left">Tag</div>
              </th>
              <th class="p-2 whitespace-nowrap">
                <div class="font-semibold text-left">Content</div>
              </th>
              <th class="p-2 whitespace-nowrap">
                <div class="font-semibold text-center">Created at</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-slate-100">
            <!-- Row -->
            <tr v-for="(result, index) in data" :key="index">
              <td class="p-2 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="">{{ result.id_visitor }}</div>
                </div>
              </td>
              <td class="p-2 whitespace-nowrap">
                <div class="">{{ result.event }}</div>
              </td>
              <td class="p-2 whitespace-nowrap">
                <div class="font-medium text-slate-800">{{ result.tag }}</div>
              </td>
              <td class="p-2 whitespace-nowrap">
                <div
                  class=""
                  style="
                    text-overflow: ellipsis;
                    overflow: hidden;
                    width: 400px;
                    white-space: nowrap;
                  "
                >
                  {{ result.content }}
                </div>
              </td>
              <td class="p-2 whitespace-nowrap">
                <div class="">{{ formatDate(result.createdAt) }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KpiStats",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString() + " at " + date.toLocaleTimeString();
    },
  },
};
</script>
