<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="20">
            <el-col :span="3">
                <el-button @click="Back()" type="primary" style="width: 100%">Back</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-table :data="listData" style="width: 100%">
                    <el-table-column type="index" :index="paginate.fromP" label="No" width="100"></el-table-column>
                    <el-table-column prop="name" label="Name"></el-table-column>
                    <el-table-column prop="phonenumber" label="Mobile"></el-table-column>
                    <el-table-column prop="email" label="Email"></el-table-column>
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
    name: "ListDriverEnterprise",
    data() {
        return {
            payload: {
                'page': 1,
                'identerprise': null,
            },
            currentPage: 1,
            input: "",
            affixEnabled: true,
            indexT: 1,
            vendorId: null,
        };
    },
    components: {
        Affix
    },
    computed: {
        ...mapGetters({
            listData: getter.GET_LIST_DRIVER,
            paginate: getter.GET_PAGINATE_DRIVER,
            totalDriver: getter.GET_DRIVER_TOTAL,
            profile: getter.GET_DATA_PROFILE
        }),
        paginator() {
            return this.paginate;
        },
        indexTam() {
            return this.indexT;
        },
        forTotal() {
            if (this.listData) {
                return this.totalDriver;
            }
        },
        forPage() {
            return this.currentPage
        }
    },
    mounted() {
        this.$store.dispatch(action.LIST_DRIVER_ENTERPRISE, this.payload);
    },

    methods: {
        handlePageChange(page) {
            this.payload.page = page;
            this.$store.dispatch(action.LIST_DRIVER_ENTERPRISE, this.payload);
        },
        Back() {
            this.$router.replace({
                path: "/profile"
            });
        },
    },
    created() {
        this.payload.page = this.currentPage
        this.payload.identerprise = this.profile.enterprise.identerprise
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

.thumbnail {
    position: relative;
    width: 300px;
    height: 300px;
    overflow: hidden;
}

.thumbnail img {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    width: auto;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.thumbnail img.portrait {
    width: 100%;
    height: auto;
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
