<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="10">
            <el-col :lg="3">
                <el-button @click="Back()" type="primary" style="width: 100%">Back</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :lg="24">
                <el-table :data="listData" style="width: 100%">
                    <el-table-column type="index" :index="paginate.fromP" label="No" width="100"></el-table-column>
                    <el-table-column prop="name" label="Location Name"></el-table-column>
                    <el-table-column prop="latitude" label="Latidute"></el-table-column>
                    <el-table-column prop="longitude" label="Longitude"></el-table-column>
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
import router from "../../../router";

import Affix from "@/components/Affix";
import {
    mapGetters,
    mapActions
} from "vuex";
import * as mutation from '../../../store/mutation-types';
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import Swal from "sweetalert2";

export default {
    data() {
        return {
            affixEnabled: true,
            indexT: 1,
            idplaces: "",
            payload: {
                idplaces: null,
                identerprise: null,
                page: 1,
            }
        };
    },
    components: {
        Affix
    },
    computed: {
        ...mapGetters({
            listData: getter.GET_LIST_LOCATION,
            paginate: getter.GET_PAGINATE_LOCATION,
            enterprise: getter.GET_DATA_PROFILE,
            total: getter.GET_LOCATION_TOTAL
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
        }
    },

    methods: {
        handlePageChange(page) {
            this.payload.page = page;
            this.$store.dispatch(action.LIST_LOCATION, this.payload);
        },

        Back() {
            this.$router.push({
                path: "/profile"
            });
        },
    },
    created() {
        this.payload.identerprise = this.enterprise.enterprise.identerprise
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
