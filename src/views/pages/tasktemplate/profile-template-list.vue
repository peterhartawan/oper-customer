<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="10">
            <el-col :lg="3">
                <el-button @click="Back()" type="primary" style="width: 100%">Back</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table :data="listData" stripe style="width: 100%">
                    <el-table-column type="index" label="No" :index="indexMethod" width="200"></el-table-column>
                    <el-table-column prop="task_template_name" label="Template Name"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="grid-content">
                    <el-pagination background layout="prev, pager, next" @current-change="handlePageChange" :total="paginat.totalP"></el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script>
import router from "../../../router";
import {
    mapGetters
} from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from "../../../store/mutation-types";
import Swal from "sweetalert2";

export default {
    name: "Table",
    data() {
        return {
            currentPage: 1,
            input: "",
            buttonStatus: null,
            affixEnabled: true,
            indexT: 1,
            identer: null,
        };
    },
    computed: {
        ...mapGetters({
            listData: getter.GET_TEMPLATE_LIST,
            paginate: getter.GET_TEMPLATE_PAGINATE,
            enterprise: getter.GET_DATA_PROFILE,
        }),
        paginat() {
            return this.paginate;
        },
        indexTam() {
            return this.indexT;
        }
    },
    async created() {
        this.identer = this.enterprise.enterprise.identerprise
        JSON.parse(localStorage.getItem("user")).id === 2 ?
            (this.buttonStatus = false) :
            (this.buttonStatus = true);
        let obj = {
            id: this.identer,
            page: this.currentPage
        };
        this.$store.dispatch(action.TEMPLATE_LIST, obj);
    },
    methods: {
        newTemplate() {
            this.$router.replace("/new-template-task");
            this.$store.commit(mutation.SET_ID_ENTERPRISE, this.identer);
        },
        handlePageChange(page) {
            this.currentPage = page;
            let obj = {
                id: this.identer,
                page: this.currentPage
            };
            this.$store.dispatch(action.TEMPLATE_LIST, obj);
        },
        Back() {
            this.$router.replace({
                path: "/profile"
            });
        },
        indexMethod(index) {
            return index + this.paginat.fromP;
        },
    }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/variables";

.table-box {
    overflow: auto;
}

.el-pagination {
    padding-top: 20px;
}

.el-input {
    width: 300px !important;
}

.card-base {
    padding: 20px;
}

.el-row {
    padding: 0px 10px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 5px;
}
</style>
