<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">        
        <el-row v-if="request_details" :gutter="10">
            <p class="font-weight-600">REQUEST DRIVER DETAILS</p>
        </el-row>
        <el-row v-if="request_details" :gutter="10">
            <el-table
            :data="request_details"
            style="width: 100%"
            >
            <el-table-column
                type="index"
                align="center"
                label="NO"
                width="60"
            ></el-table-column>
            <el-table-column
                prop="enterprise.name"
                align="center"
                label="ENTERPRISE"
            ></el-table-column>
            <el-table-column
                prop="place.name"
                align="center"
                label="LOKASI"
            ></el-table-column>
            <el-table-column
                prop="date"
                header-align="center"
                align="center"
                label="TANGGAL"
            ></el-table-column>
            <el-table-column
                prop="time"
                header-align="center"
                align="center"
                label="JAM"
            ></el-table-column>
            <el-table-column
                prop="number_of_drivers"
                header-align="center"
                align="center"
                label="JUMLAH"
            ></el-table-column>
            <el-table-column
                prop="note"
                header-align="center"
                align="center"
                label="NOTES"
            ></el-table-column>
            </el-table>
        </el-row>
        <el-row :gutter="10">
            <p class="font-weight-600 mt-40" align="center">DRIVER LIST</p>
        </el-row>
        <el-row :gutter="10">
            <el-col :lg="4">
                <el-button @click="Back()" style="width: 100%">Back</el-button>
            </el-col>
            <el-col :lg="12">
                <el-select
                    v-model="userid"
                    filterable
                    placeholder="Driver Name"
                    @change="selectChange"
                >
                    <el-option label="All Drivers" value="0">All Drivers</el-option>
                    <el-option
                    v-for="item in dropDown"
                    :key="item.id"
                    :label="item.name"
                    :value="item.numrow"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :lg="8">
                <el-button :loading="button" @click="Create" style="width: 100%" type="success">Assign Driver To Enterprise</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :lg="24">
                <el-table highlight-current-row ref="assigneeTable" :data="listData" style="width: 100%" v-loading="loading">
                    <el-table-column type="index" :index="paginate.fromP" label="NO" width="100"></el-table-column>
                    <el-table-column prop="name" label="NAME"></el-table-column>
                    <el-table-column prop="phonenumber" label="PHONE"></el-table-column>
                    <el-table-column prop="email" label="EMAIL"></el-table-column>
                    <el-table-column prop="ce_name" label="ENTERPRISE"></el-table-column>
                    <el-table-column label="STAY LOCATION">
                        <template slot-scope="scope_location">
                            <el-select
                                v-model="selected_places[currentPageIndex+scope_location.$index]"
                                filterable
                                placeholder="Pilih Lokasi"
                                @change="selectLocation(scope_location)"
                            >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.name"
                                :value="item"
                            ></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" width="60">
                        <template slot-scope="scope">
                            <el-checkbox 
                                v-model="check_status[currentPageIndex+scope.$index]"
                                @change="Add(scope)"
                            ></el-checkbox>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <div align="right">
            <el-pagination :current-page.sync="currentPage" background layout="prev, pager, next" @current-change="handlePageChange" :total="forTotal"></el-pagination>
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
                page: 1,
                identerprise: '',
                idplaces: '',
                idrequest: null,
                time: null,
                unassign_ids: [],
                userdata:[
                    {
                        id          : null,
                        idplaces    : null
                    }
                ],
            },
            currentPage: 1,
            currentPageIndex: 0,
            input: "",
            affixEnabled: true,
            indexT: 1,
            checks: [],
            options: null,
            unassign_ids: [],
            userid: null,
            currentRow: null,
        };
    },
    components: {
        Affix
    },
    computed: {
        ...mapGetters({
            listData: getter.GET_LIST_DRIVER_ASSIGNEE,
            paginate: getter.GET_PAGINATE_DRIVER,
            totalDriver: getter.GET_DRIVER_TOTAL,
            dropDown: getter.GET_DROPDOWN_DRIVER,
            enterprise: getter.ENTERPRISE,
            button: getter.GET_BUTTON,
            loading: getter.GET_LOADING,
            selected_drivers: getter.GET_ASSIGNED_DRIVERS,
            check_status: getter.GET_CHECK_STATUS,
            selected_places: getter.GET_SELECTED_PLACES,
            search_index: getter.GET_SEARCH_INDEX,
            request_details: getter.GET_REQUEST_DETAILS
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
        this.form.identerprise = this.enterprise.identerprise
        if(this.request_details){
            this.form.idplaces = this.request_details[0].place_id
            this.form.idrequest = this.request_details[0].id
            this.form.time = this.request_details[0].purpose_time
        }
        this.$store.commit(mutation.SET_LOADING, true)
        this.$store.commit(mutation.RESET_ASSIGNED_DRIVERS)
        this.$store.dispatch(action.DROPDOWN_D_ASSIGNEE, this.form)
        this.$store.dispatch(action.LIST_DRIVER_ASSIGNEE, this.form)
    },

    methods: {
        setCurrent(row) {
            this.$refs.assigneeTable.setCurrentRow(row)
        },
        selectChange(val){
            let numpage = Math.ceil(val / 10)
            let indexOnPage = (val - 1) % 10
            this.$store.commit(mutation.SET_SEARCH_INDEX, indexOnPage)
            if(this.currentPage != numpage){
                this.currentPage = numpage
                this.handlePageChange(this.currentPage)
            } else {
                this.setCurrent(this.listData[this.search_index])
            }
        },
        async handlePageChange(page) {
            this.form.page = page
            this.currentPageIndex = (page - 1) * 10
            this.$store.commit(mutation.SET_LOADING, true)
            await this.$store.dispatch(action.LIST_DRIVER_ASSIGNEE, this.form)
            this.setCurrent(this.listData[this.search_index])
        },
        Create() {
            this.form.userdata = []
            this.selected_drivers.forEach((element, index) => {
                let idplaces
                if(this.selected_places[index] != null){
                    idplaces = this.selected_places[index].idplaces
                } else {
                    idplaces = null
                }
                if(element != null){
                    let id = element.users_id
                    var userdata = 
                        {
                            id          : id,
                            idplaces    : idplaces
                        }
                    this.form.userdata.push(userdata)
                }
            })
            this.form.unassign_ids = []
            this.unassign_ids.forEach((element) => {
                if(element != null){
                    let id = element.users_id
                    this.form.unassign_ids.push(id)
                }
            })

            this.$store.commit(mutation.SET_LOADING, true)
            this.$store.commit(mutation.BUTTON_STATUS, true)
            this.$store.dispatch(action.ASSIGN_DRIVER, this.form);
        },
        Back() {
            this.$router.push({
                path: "/list-driver-enterprise/" + this.enterprise.identerprise
            });
        },
        Add(e) {
            let pageToIndex = (this.form.page - 1) * 10
            let x = pageToIndex + e.$index
            if(this.selected_drivers[x] == null){
                this.selected_drivers[x] = e.row
                if(this.selected_places[x] == null)
                    this.selected_drivers[x].places = this.selected_places[x]
                if(e.row.client_enterprise_identerprise == this.form.identerprise)
                    this.unassign_ids[x] = null
            } else {
                this.selected_drivers[x] = null
                this.check_status[x] = false
                if(e.row.client_enterprise_identerprise == this.form.identerprise)
                    this.unassign_ids[x] = e.row
            }
        },
        selectLocation(e){
            let pageToIndex = (this.form.page - 1) * 10
            let x = pageToIndex + e.$index
            if(this.selected_drivers[x] == null){
                this.selected_drivers[x] = e.row
                this.selected_drivers[x].places = this.selected_places[x]
                this.check_status[x] = true
                if(e.row.client_enterprise_identerprise == this.form.identerprise)
                    this.unassign_ids[x] = null
            }
        },
    },
    async created() {
        let data = await this.$store.dispatch(action.ASSIGNEE_LOCATION, this.enterprise.identerprise)
        this.options = data
    },
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
