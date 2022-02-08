<template>
    <div style="height: 100%">
        <el-row style="height: 100%" :gutter="20">
            <el-col :span="20">
                <ag-grid-vue
                    style="width: 100%; height: 100%;"
                    class="ag-theme-alpine"
                    id="myGrid"
                    :columnDefs="columnDefs"
                    @grid-ready="onGridReady"
                    :defaultColDef="defaultColDef"
                    :enableRangeSelection="true"
                    :rowData="rowData">
                </ag-grid-vue>
            </el-col>
            <el-col :span="4">
                <el-card class="box-card">
                    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>



<script>
import { AgGridVue } from 'ag-grid-vue3';

export default {
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'athlete', minWidth: 150 },
        { field: 'age', maxWidth: 90 },
        { field: 'country', minWidth: 150 },
        { field: 'year', maxWidth: 90 },
        { field: 'date', minWidth: 150 },
        { field: 'sport', minWidth: 150 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => params.api.setRowData(data);

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  }
}
</script>

<style scoped>
.example-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#myGrid {
  flex: 1 1 0px;
  width: 100%;
}

.example-header {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 13px;
  margin-bottom: 5px;
}
</style>