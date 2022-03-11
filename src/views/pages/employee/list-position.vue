<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="10">
            <el-col :lg="4">
                <el-button @click="Create()" style="width: 100%" type="primary">New Position</el-button>
            </el-col>
            <el-col :offset="17" :lg="3">
                <el-button style="width: 100%" @click="Cancel()" type="success">Cancel</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :lg="24">
                <el-table :data="listData" style="width: 100%" @row-click="getId">
                    <el-table-column type="index" :index="paginate.fromP" label="No" width="100"></el-table-column>
                    <el-table-column align="center" prop="job_name" label="Job Name"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <div align="right">
            <el-pagination background layout="prev, pager, next" @current-change="handlePageChange" :total="forTotal"></el-pagination>
        </div>
    </div>
</div>
</template>

<script>
import Affix from "@/components/Affix";
import {
    mapGetters
} from "vuex";
import * as mutation from '../../../store/mutation-types';
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";

export default {
    name: "ListPosition",
    data() {
        return {
            currentPage: 1,
            input: "",
            affixEnabled: true,
            indexT: 1,
            vendorId: null,
            status: 1,
            select: [{
                    name: "ACTIVE",
                    status: 1,
                },
                {
                    name: "SUSPENDED",
                    status: 3
                }
            ],
        };
    },
    components: {
        Affix
    },
    computed: {
        ...mapGetters({
            listData: getter.GET_LIST_POSITION,
            paginate: getter.GET_PAGINATE_POSITION,
            total: getter.GET_POSITION_TOTAL,
            //   dropDown    : getter.GET_DROPDOWN_EMPLOYEE 
        }),
        paginator() {
            return this.paginate;
        },
        indexTam() {
            return this.indexT;
        },
        forTotal() {
            if (this.listData) {
                return this.total;
            }
        },

    },

    mounted() {
        this.$store.dispatch(action.LIST_POSITION, {
            page: this.currentPage,
            status: this.status
        });
    },

    methods: {
        newVen() {
            this.$router.push("NewVendor");
        },
        handlePageChange(page) {
            this.currentPage = page;
            this.$store.dispatch(action.LIST_POSITION, {
                page: this.currentPage,
                status: this.status
            });
        },

        Create() {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            this.$router.push({
                name: "NewPosition"
            });
        },
        Cancel() {
            this.$store.dispatch(action.LIST_EMPLOYEE, 1);
            this.$router.push({
                path: "/employee"
            });
        },
        // filterStatus(status){
        //   this.status = status;
        //    this.$store.dispatch(action.LIST_DATA_EMPLOYEE, 
        //   { 
        //   page: 1,
        //   status: this.status});
        // },

        getId(id) {
            this.$store.dispatch(action.DETAIL_POSITION, id.idemployee_position);
            this.$router.push({
                path: "/employee/list-position/" + id.idemployee_position
            });
        },
    }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/_variables";

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

a {
    border-style: dotted;
    border-radius: 15px;
    padding: 10px;
    height: 150px;
}

td {
    padding: 10px;
}
</style>
