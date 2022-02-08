<template>
    <div style="height: 100%">
            <ag-grid-vue
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                id="myGrid"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :masterDetail="true"
                :detailCellRendererParams="detailCellRendererParams"
                :rowData="rowData"
                :rowSelection="multiRowSelection"
                :rowMultiSelectWithClick="true"></ag-grid-vue>
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
        { field: 'name', cellRenderer: 'agGroupCellRenderer', headerCheckboxSelection: true, checkboxSelection: true},
        { field: 'account' },
        { field: 'calls' },
        { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: { flex: 1 },
      detailCellRendererParams: null,
      rowData: null,
      multiRowSelection: "multiple"
    };
  },
  created() {
    this.detailCellRendererParams = {
      detailGridOptions: {
        rowSelection: 'multiple',
        suppressRowClickSelection: true,
        enableRangeSelection: true,
        pagination: true,
        paginationAutoPageSize: true,
        columnDefs: [
          {
            field: 'callId',
            checkboxSelection: true,
          },
          { field: 'direction' },
          {
            field: 'number',
            minWidth: 150,
          },
          {
            field: 'duration',
            valueFormatter: "x.toLocaleString() + 's'",
          },
          {
            field: 'switchCode',
            minWidth: 150,
          },
        ],
        defaultColDef: {
          sortable: true,
          flex: 1,
        },
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.callRecords);
      },
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        this.rowData = data;
      };

      fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
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