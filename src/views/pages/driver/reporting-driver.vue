<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="10">
            <el-col :lg="6">
                <el-date-picker value-format="yyyy-MM-dd" style="width: 100%;" v-model="startdate" type="date" placeholder="Start Date"></el-date-picker>
            </el-col>
            <el-col :lg="6">
                <el-date-picker value-format="yyyy-MM-dd" style="width: 100%;" v-model="duedate" type="date" placeholder="End Date"></el-date-picker>
            </el-col>
            <el-col :lg="1">
                <el-button :loading="button" icon="el-icon-search" @click="onFind({startdate: startdate, duedate:duedate, type:type})" square size="small"></el-button>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :lg="10">
                <el-select :disabled="tableData == null" v-model="template" value-key="task_template_id" filterable placeholder="Select">
                    <el-option v-for="item in tableData" :key="item.task_template_id" :label="item.task_template_name" :value="item"></el-option>
                </el-select>
            </el-col>
            <el-col :lg="4">
                <el-button style="width: 100%" :loading="button" type="primary" @click="exportExcel">
                    Export
                </el-button>
            </el-col>
        </el-row>
        <el-row>
            <div v-if="template">
                <h2>Template Detail</h2>
                <el-row>
                    <el-col :lg="6">
                        <b>Task Name</b>
                    </el-col>
                    <el-col :lg="15">
                        <b>:</b>
                        {{template.task_template_name}}
                    </el-col>
                    <el-col :lg="6">
                        <b>Task Description</b>
                    </el-col>
                    <el-col :lg="15">
                        <b>:</b>
                        {{template.task_template_description}}
                    </el-col>
                </el-row>
            </div>
        </el-row>
    </div>
</div>
</template>

<script>
import moment from "moment";
import Affix from "@/components/Affix";
import {
    mapGetters,
    mapActions
} from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from '../../../store/mutation-types'
import swal from 'sweetalert2'

export default {
    name: "Reporting Driver",
    data() {
        return {
            currentPage: 1,
            input: "",
            affixEnabled: true,
            indexT: "",
            startdate: null,
            duedate: null,
            type: "driver",
            template: null,
            tableData: null,
            totalData: null,
        };
    },
    components: {
        Affix
    },
    computed: {
        ...mapGetters({
            filterAttendance: getter.GET_TEMPLATE_REPORT,
            button: getter.GET_BUTTON,
        }),
        paginator() {
            return this.paginate;
        },
        indexTam() {
            return this.indexT;
        },
    },
    methods: {
        async exportExcel() {
            let data = '';
            if (this.template == null) {
                swal('Please pick a template', '', 'error')
            } else {
                let obj = {
                    startdate: this.startdate,
                    duedate: this.duedate,
                    idtemplate: this.template.task_template_id,
                    type: this.type
                };
                this.$store.commit(mutation.BUTTON_STATUS, true);
                data = await this.$store.dispatch(action.EXPORT_ORDER_TEMPLATE, obj)
                let firstD = data.slice(1)
                let secondD = firstD.slice(0, firstD.length - 1)
                window.open(secondD)
            };
        },
        async onFind(payload) {
            this.template = null;
            if ((this.startdate == null) || (this.duedate == null)) {
                swal('Please pick start date and due date', '', 'error')
            } else {
                this.$store.commit(mutation.BUTTON_STATUS, true);
                await this.$store.dispatch(action.TEMPLATE_REPORTING, payload)
                this.tableData = this.filterAttendance;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.card-base {
    padding: 20px;
}

.el-row {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    padding: 0px 10px;
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 5px;
}

.el-select {
    width: 100%;
}

// .el-date-picker {
//     width: 100px;
// }
</style>
