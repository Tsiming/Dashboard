<template>
    <div style="height: 100%">
        <el-row class="proj-manage-buttons">
            <el-col :span="24">
                <el-button type="primary">新建工程</el-button>
                <el-button type="primary">保存工程</el-button>
                <el-button type="primary">保存为模板</el-button>
                <el-button type="primary">测试开始</el-button>
                <el-button type="primary">测试暂停</el-button>
                <el-button type="primary">生成报告</el-button>
                <el-button type="primary">撤销</el-button>
                <el-button type="primary">恢复</el-button>
                <el-button type="primary">查找工程</el-button>
            </el-col>
        </el-row>
        <el-row style="height: 100%" :gutter="20">
            <el-col :span="20">
                <el-row style="height:30%;margin-bottom:10px;" :gutter="20">
                    <el-col :span="8">
                        <ag-grid-vue
                            style="width: 100%; height: 100%;"
                            class="ag-theme-alpine"
                            id="projBaseInfoGrid"
                            :columnDefs="projBaseInfoColumnDefs"
                            :defaultColDef="defaultColDef"
                            :rowData="projBaseInfoRowData"
                            :headerHeight="projBaseInfoHeaderHeight"
                            :enterMovesDown="true"
                            :enterMovesDownAfterEdit="true">
                        </ag-grid-vue>
                    </el-col>
                    <el-col :span="8">
                        <ag-grid-vue
                            style="width: 100%; height: 100%;"
                            class="ag-theme-alpine"
                            id="projConfigGrid"
                            :columnDefs="projConfigColumnDefs"
                            :defaultColDef="defaultColDef"
                            :rowData="projConfigRowData"
                            :rowSelection="multiRowSelection"
                            :rowMultiSelectWithClick="true">
                        </ag-grid-vue>
                    </el-col>
                    <el-col :span="8">
                        <ag-grid-vue
                            style="width: 100%; height: 100%;"
                            class="ag-theme-alpine"
                            id="projVersionGrid"
                            :columnDefs="projVersionColumnDefs"
                            :defaultColDef="defaultColDef"
                            :rowData="projVersionRowData"
                            :rowSelection="multiRowSelection"
                            :rowMultiSelectWithClick="true">
                        </ag-grid-vue>
                    </el-col>
                </el-row>
                <el-row style="height:70%">
                    <ag-grid-vue
                        style="width: 100%; height: 100%;"
                        class="ag-theme-alpine"
                        id="testItemGrid"
                        :columnDefs="testItemColumnDefs"
                        :defaultColDef="defaultColDef"
                        :enableRangeSelection="true"
                        :rowData="testItemRowData"
                        :rowSelection="multiRowSelection"
                        :rowMultiSelectWithClick="true"
                        :masterDetail="true"
                        :detailCellRendererParams="detailCellRendererParams">
                    </ag-grid-vue>
                </el-row>
                
            </el-col>
            <el-col :span="4">
                <el-card class="box-card" style="height:100%">
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
        projBaseInfoColumnDefs: [
            {field: "item", minWidth: 150},
            {field: "value", minWidth: 150, editable: true},
            {field: "branch", minWidth: 150}
        ],
        projBaseInfoRowData: [
            {"item": "工程名称", "value": "", "branch": "版本分支"},
            {"item": "模板名称", "value": "", "branch": "版本分支"},
            {"item": "设备名称", "value": "", "branch": ""},
            {"item": "测试模式", "value": "", "branch": ""},
        ],
        // 隐藏表头
        projBaseInfoHeaderHeight: 0,

        projConfigColumnDefs: [
            {field: "item", minWidth: 150, headerName: "工程配置项", headerCheckboxSelection: true, checkboxSelection: true},
            {field: "value", minWidth: 150, headerName: "配置值", editable: true}
        ],
        projConfigRowData: [
            {"item": "设备IP", "value": ""},
            {"item": "端口", "value": ""}
        ],

        projVersionColumnDefs: [
            {field: "versionID", minWidth: 150, headerName: "版本号", headerCheckboxSelection: true, checkboxSelection: true},
            {field: "versionDate", minWidth: 150, headerName: "版本更新日期", editable: true},
            {field: "itemDate", minWidth: 150, headerName: "更新日期", editable: true}
        ],
        projVersionRowData: [
            {"versionID": "...", "versionDate": "", "itemDate": ""},
            {"versionID": "...", "versionDate": "", "itemDate": ""}
        ],

        testItemColumnDefs: [
            {field: "Num", minWidth: 150, headerName: "序号", headerCheckboxSelection: true,
             checkboxSelection: true, cellRenderer: 'agGroupCellRenderer',
             filter: 'agNumberColumnFilter', filterParams: { applyMiniFilterWhileTyping: true }},
            {field: "testItem", minWidth: 150, headerName: "测试项", editable: true,
            filter: 'agTextColumnFilter', filterParams: { applyMiniFilterWhileTyping: true }},
            {field: "testItemDesc", minWidth: 150, headerName: "测试项描述", editable: true,
            filter: 'agTextColumnFilter', filterParams: { applyMiniFilterWhileTyping: true }},
            {field: "temp1", minWidth: 150, headerName: "...", editable: true,
            filter: 'agTextColumnFilter', filterParams: { applyMiniFilterWhileTyping: true }},
            {field: "temp2", minWidth: 150, headerName: "...", editable: true,
            filter: 'agTextColumnFilter', filterParams: { applyMiniFilterWhileTyping: true }}
        ],
        testItemRowData: [
            {"Num": "1", "testItem": "SM阻断", "testItemDesc": "", "temp1": "", "temp2": ""},
            {"Num": "2", "testItem": "IP白名单", "testItemDesc": "", "temp1": "", "temp2": ""},
            {"Num": "3", "testItem": "目标审计", "testItemDesc": "", "temp1": "", "temp2": ""},
            {"Num": "4", "testItem": "传输SM信息", "testItemDesc": "", "temp1": "", "temp2": ""},
            {"Num": "5", "testItem": "攻击**检测", "testItemDesc": "", "temp1": "", "temp2": ""},
            {"Num": "6", "testItem": "网络行为审计", "testItemDesc": "", "temp1": "", "temp2": ""}
        ],
        detailCellRendererParams: null,


        multiRowSelection: "multiple",

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
        floatingFilter: true,
      },
      rowData: null,
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
                    {field: 'srcIP',headerName: "源IP",checkboxSelection: true},
                    {field: 'destIP',headerName: "目的IP"},
                    {field: 'srcPort',headerName: "源端口"},
                    {field: 'destPort',headerName: "目的端口"},
                    {field: 'result',headerName: "结果"},
                    {field: 'log',headerName: "日志"},
                ],
                defaultColDef: {
                sortable: true,
                flex: 1,
                },
            },
            getDetailRowData: (params) => {
                params.successCallback(params.data.callRecords);
            },
        }
    },
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

.proj-manage-buttons {
    height: 60px;
    margin-bottom: 10px;
    background:rgb(50, 53, 83);
    text-align: center;
    align-items: center;
}

:deep(.el-card) {
  height: 100%;
}
</style>