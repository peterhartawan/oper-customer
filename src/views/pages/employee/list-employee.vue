<template>
<div class="page-table scrollable only-y" id="affix-container">
    <employee-count />
    <!-- <div class="card-base card-shadow--medium bg-white">
      <div v-if="listData">
      <el-row :gutter="10">
        <el-col :lg="4">
          <el-button @click="Create()" style="width: 100%" type="primary">New Employee</el-button>
        </el-col>
        <el-col :lg="4">
          <el-button @click="Position()" style="width: 100%" type="success">List Position</el-button>
        </el-col>
        <el-col :offset="10" :lg="6">
           <el-select @change="filterStatus" v-model="status" filterable placeholder="Select">
                <el-option v-for="item in select" :key="item.status" :label="item.name" :value="item.status"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :lg="24">
          <el-table :data="listData" style="width: 100%" @row-click="getId">
            <el-table-column type="index" :index="paginate.fromP"  label="No" width="100"></el-table-column>
            <el-table-column prop="name" label="Name"></el-table-column>
            <el-table-column prop="phonenumber" label="Mobile"></el-table-column>
            <el-table-column prop="email" label="Email"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div align="right">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handlePageChange"
          :total="forTotal"
        ></el-pagination>
      </div>
      </div>
    </div> -->
</div>
</template>

<script>
import EmployeeCount from '@/components/employee/total-account'
import Affix from "@/components/Affix";
import {
    mapGetters
} from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from '../../../store/mutation-types';

export default {
    name: "Employee",
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
        Affix,
        EmployeeCount
    },
    computed: {
        ...mapGetters({
            listData: getter.GET_LIST_EMPLOYEE,
            paginate: getter.GET_PAGINATE_EMPLOYEE,
            total: getter.GET_EMPLOYEE_TOTAL,
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
        this.$store.dispatch(action.LIST_EMPLOYEE, {
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
            this.$store.dispatch(action.LIST_EMPLOYEE, {
                page: this.currentPage,
                status: this.status
            });
        },

        Create() {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            this.$router.push({
                name: "NewEmployee"
            });
        },
        Position() {
            this.$router.push({
                name: "ListPosition"
            });
        },
        filterStatus(status) {
            this.status = status;
            this.$store.dispatch(action.LIST_EMPLOYEE, {
                page: 1,
                status: this.status
            });
        },

        getId(id) {
            this.$store.dispatch(action.DETAIL_EMPLOYEE, id.idemployee);
            this.$router.push({
                path: '/detail-employee'
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
