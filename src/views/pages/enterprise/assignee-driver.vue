<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="10">
            <el-col :lg="4">
                <el-button @click="Back()" style="width: 100%">Back</el-button>
            </el-col>
            <el-col :offset="12" :lg="8">
                <el-button :loading="button" @click="Create" style="width: 100%" type="success">Assign Driver To Enterprise</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :lg="24">
                <el-table :data="listData" style="width: 100%">
                    <el-table-column type="index" :index="paginate.fromP" label="No" width="100"></el-table-column>
                    <el-table-column prop="name" label="Name"></el-table-column>
                    <el-table-column prop="phonenumber" label="Mobile"></el-table-column>
                    <el-table-column prop="email" label="Email"></el-table-column>
                    <el-table-column fixed="right" width="60">
                        <template slot-scope="scope">
                            <el-checkbox :checked="ifChange" @change="Add(scope.row)"></el-checkbox>
                        </template>
                    </el-table-column>
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
    mapGetters,
    mapActions
} from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from '../../../store/mutation-types';

export default {
    name: "ListDriverEnterprise",
    data() {
        return {
            form: {
                'page': 1,
                'identerprise': '',
                'userid': [],
            },
            currentPage: 1,
            input: "",
            affixEnabled: true,
            indexT: 1,
            checks: [],
            ifChange: false,

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
            enterprise: getter.ENTERPRISE,
            button: getter.GET_BUTTON,
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
        },

    },

    mounted() {
        this.$store.dispatch(action.LIST_DRIVER_ASSIGNEE, this.form);
    },

    methods: {
        handlePageChange(page) {
            this.form.page = page;
            this.ifChange = false;
            this.$store.dispatch(action.LIST_DRIVER_ASSIGNEE, this.form);
        },

        Create() {
            this.$store.commit(mutation.BUTTON_STATUS, true)
            this.$store.dispatch(action.ASSIGN_DRIVER, this.form);
        },
        Back() {
            this.$router.push({
                path: "/list-driver-enterprise/" + this.enterprise.identerprise
            });
        },
        Add(e) {
            const self = this;
            const self2 = e;
            const foo = new Set(this.form.userid);
            if (foo.has(e.users_id) == true) {
                const index = self.form.userid.indexOf(self2.users_id)
                self.form.userid.splice(index, 1)
            } else {
                self.form.userid.push(self2.users_id)
            }
        },

    },
    created() {
        this.form.identerprise = this.enterprise.identerprise
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
