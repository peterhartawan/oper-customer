<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="10">
            <el-col :lg="3" :xl="3">
                <el-button @click="Create()" style="width: 100%" type="primary">Create</el-button>
            </el-col>

            <el-col :lg="{ span:5, offset:10}" :xl="{ span:5, offset:10}">
                <el-input
                        placeholder="Search"
                        prefix-icon="el-icon-search"
                        clearable
                        @keyup.native="nameE"
                        @clear="clearInputButton"
                        v-model="vendorName">
                </el-input>
            </el-col>

            <el-col :lg="6" :xl="6">
                <el-select @change="filterStatus" v-model="status" filterable placeholder="Select">
                    <el-option v-for="item in select" :key="item.status" :label="item.name" :value="item.status"></el-option>
                </el-select>
            </el-col>
            <!-- <el-col :offset="15" :lg="6">
          <el-select v-model="vendorId" filterable placeholder="Select">
            <el-option label="All Vendor" value="0">All Vendor</el-option>
            <el-option v-for="item in dropDown" :key="item.idvendor" :label="item.name" :value="item.idvendor">
            </el-option>
          </el-select>
        </el-col> -->
        </el-row>
        <el-row :gutter="10">
            <el-col :lg="24">
                <el-table v-loading="loading" :data="listData" style="width: 100%" @row-click="getId">
                    <el-table-column type="index" :index="paginate.fromP" label="No" width="100"></el-table-column>
                    <el-table-column prop="name" label="Name"></el-table-column>
                    <el-table-column prop="office_phone_number" label="Mobile"></el-table-column>
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
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from '../../../store/mutation-types';

export default {
    name: "IndexVendor",
    data() {
        return {
            currentPage: 1,
            input: "",
            affixEnabled: true,
            indexT: 1,
            vendorId: null,
            status: 1,
            vendorName: '',
            select: [{
                    name: "ACTIVE",
                    status: 1,
                },
                {
                    name: "INACTIVE",
                    status: 2,
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
            listData: getter.GET_LIST_VEN,
            paginate: getter.GET_PAGINATE_VEN,
            totalVen: getter.GET_VEN_TOTAL,
            dropDown: getter.GET_DROPDOWN_VENDOR,
            loading: getter.GET_LOADING
        }),
        paginat() {
            return this.paginate;
        },
        indexTam() {
            return this.indexT;
        },
        forTotal() {
            if (this.listData) {
                return this.totalVen;
            }
        },
    },

    mounted() {
        this.$store.dispatch(action.LIST_DATA_VEN, {
            page: this.currentPage,
            vendor_name: this.vendorName,
            status: this.status
        });
        this.$store.dispatch(action.DROPDOWN_VENDOR);
    },

    methods: {
          Create() {
            this.$store.commit(mutation.BUTTON_STATUS, false);
            this.$router.push({
                name: "NewVendor"
            });
        },
        async clearInputButton(){
            this.$store.commit(mutation.SET_LOADING, true);
            await this.$store.dispatch(action.LIST_DATA_VEN, {
                page: 1,
                vendor_name: this.vendorName,
                status: this.status
            });
        },
        handlePageChange(page) {
            this.currentPage = page;
            this.$store.commit(mutation.SET_LOADING, true);
            this.$store.dispatch(action.LIST_DATA_VEN, {
                page: this.currentPage,
                vendor_name: this.vendorName,
                status: this.status
            });
        },
        nameE(){
            let trimName = this.vendorName.trim();
            this.$store.commit(mutation.SET_LOADING, true);
            this.$store.dispatch(action.LIST_DATA_VEN, {
                page: 1,
                vendor_name: trimName,
                status: this.status
            });
        },
        filterStatus(status) {
            this.status = status;
            this.$store.commit(mutation.SET_LOADING, true);
            this.$store.dispatch(action.LIST_DATA_VEN, {
                page: 1,
                vendor_name: this.vendorName,
                status: this.status
            });
        },

        getId(id) {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            this.$store.dispatch(action.DATA_ID_VENDOR, id.idvendor);
            this.$router.replace({
                path: "/detail-vendor/" + id.idvendor
            });
        }
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
