<template>
    <div class="page-table scrollable only-y" id="affix-container">
        <order-bar />

        <div class="card-base card-shadow--medium bg-white">
            <el-radio-group v-model="changeTab" @change="tabChange" fill="#fffafa" >
                <el-radio-button label="open">
                    <img src="../../../assets/oper_asset/openorder_red.png" class="drive-acount" v-if="changeTab === 'open'">
                    <img src="../../../assets/oper_asset/openorder_grey.png" class="drive-acount" v-else>
                </el-radio-button>
                <el-radio-button label="inprogress">
                    <img src="../../../assets/oper_asset/inprogress_red.png" class="drive-acount" v-if="changeTab === 'inprogress'">
                    <img src="../../../assets/oper_asset/inprogress_grey.png" class="drive-acount" v-else>
                </el-radio-button>
                <el-radio-button label="cancel">
                    <img src="../../../assets/oper_asset/cancelled_red.png" class="drive-acount" v-if="changeTab === 'cancel'">
                    <img src="../../../assets/oper_asset/cancelled_grey.png" class="drive-acount" v-else>
                </el-radio-button>
                <el-radio-button label="complete">
                    <img src="../../../assets/oper_asset/completed_red.png" class="drive-acount" v-if="changeTab === 'complete'">
                    <img src="../../../assets/oper_asset/completed_grey.png" class="drive-acount" v-else>
                </el-radio-button>
            </el-radio-group>

            <el-row :gutter="20">
                <el-col :span="16">
                    <div >
                        <el-button
                                v-if="path"
                                @click="newCorp"
                                type="primary">
                            New Order
                        </el-button>
                    </div>
                </el-col>
                <!--<el-col :lg="{span: 8, offset}">-->
                    <!--<el-input-->
                            <!--placeholder="Search"-->
                            <!--style="width: 300px"-->
                            <!--v-model="input"-->
                            <!--@change="search">-->
                    <!--</el-input>-->
                <!--</el-col>-->
            </el-row>

            <!--<el-row :gutter="10" style="margin-top: 20px">-->
                <!--<el-col :span="7">-->
                    <!--<el-breadcrumb separator="/">-->
                        <!--<el-breadcrumb-item :to="{ path: '/order/open' }">Open</el-breadcrumb-item>-->
                        <!--<el-breadcrumb-item :to="{ path: '/order/inprogress' }">Inprogress</el-breadcrumb-item>-->
                        <!--<el-breadcrumb-item :to="{ path: '/order/complete' }">Complete</el-breadcrumb-item>-->
                        <!--<el-breadcrumb-item ></el-breadcrumb-item>-->
                    <!--</el-breadcrumb>-->
                <!--</el-col>-->
            <!--</el-row>-->
            <el-row :gutter="10" style="margin-top: 20px">
                <el-col :span="3">
                    <el-select v-model="form.month" placeholder="Select Month">
                        <el-option label="All Months" selected value="0">All Months</el-option>
                        <el-option label="January" selected value="1">January</el-option>
                        <el-option label="February" value="2">February</el-option>
                        <el-option label="March" value="3">March</el-option>
                        <el-option label="April" value="4">April</el-option>
                        <el-option label="May" value="5">May</el-option>
                        <el-option label="June" value="6">June</el-option>
                        <el-option label="July" value="7">July</el-option>
                        <el-option label="August" value="8">August</el-option>
                        <el-option label="September" value="9">September</el-option>
                        <el-option label="October" value="10">October</el-option>
                        <el-option label="November" value="11">November</el-option>
                        <el-option label="December" value="12">December</el-option>
                    </el-select>
                </el-col>
                <div v-if="role === 1">
                 <el-col :span="4">
                    <el-select v-model="form.idvendor" placeholder="Select Vendor">
                        <el-option v-for="item in vendor" :key="item.idvendor" :value="item.idvendor" :label="item.name"></el-option>
                    </el-select>
                </el-col>
                </div>
                <el-col :span="3">
                    <el-input
                            placeholder="Enterprise Name"
                            v-model="form.enterprise_name">
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <el-input
                            placeholder="Driver Name"
                            v-model="form.driver_name">
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-input
                            placeholder="Transaction ID"
                            v-model="form.trx_id">
                    </el-input>
                </el-col>

                <el-col :span="6">
                    <el-date-picker
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                    v-model="form.range_date" 
                    default-value="2019-06-01"
                    type="daterange"
                    start-placeholder="Start"
                    end-placeholder="End"
                    ></el-date-picker>
                </el-col>

                <el-col :span="1">
                    <el-button
                            icon="el-icon-search"
                            @click="searchSquare"
                            style="background: #D50000; font-size: 17px; color: white; "
                            square>

                    </el-button>
                </el-col>

            </el-row>

            <div class="contacts-list box grow scrollable only-y">
            <el-row>
                <el-col :span="24">
                    <el-table
                            v-loading="loading"
                            :data="listData"
                            stripe
                            :header-cell-style="headerRowStyle"
                            style="width: 100%"
                            @row-click="getId">
                        <el-table-column
                                type="index"
                                :index="indexMethod"
                                label="NO"
                                width="70">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                width="100"
                                label="PHOTO">
                            <template slot-scope="scope">
                                <img style="width: 35px; height: 35px; border-radius: 50%" :src="scope.row.profile_picture" @error="imgAlt">
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="driver.user.nama_driver"
                                label="DRIVER INFO">
                        </el-table-column>
                        <el-table-column
                                prop="user_fullname"
                                label="USER CUSTOMER">
                        </el-table-column>
                        <el-table-column
                                prop="enterprise.nama_client_enterprise"
                                label="ENTERPRISE NAME">
                        </el-table-column>
                        <el-table-column
                                prop="vehicle_type"
                                label="VEHICLE">
                        </el-table-column>
                        <el-table-column
                                prop="client_vehicle_license"
                                label="POLICE NUMBER">
                        </el-table-column>
                        <el-table-column
                                prop="status_text"
                                label="STATUS">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row>
                <el-col :lg="20">
                    <div class="grid-content">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                @current-change="handlePageChange"
                                :current-page="currentPage"
                                :total="paginato.totalP">

                        </el-pagination>
                    </div>
                </el-col>
                <el-col :lg="4">
                    <el-button
                            type="primary"
                            @click="exportExcel"
                            style="margin-top: 15px">
                        Export
                    </el-button>
                </el-col>
            </el-row>
        </div>
        </div>
    </div>
</template>

<script>
    import  OrderBar from '../../../components/order/order-bar'
    import Affix from '@/components/Affix'
    import { mapGetters } from 'vuex'
    import * as getter from '../../../store/getters-types'
    import * as mutation from '../../../store/mutation-types'
    import * as action from '../../../store/action-types'
    import swal from 'sweetalert2'

    export default {
        name: 'Table',
        data() {
            return {
                role            : '',
                currentPage     : 1,
                path            : null,
                input           :'',
                affixEnabled    : true,
                indexT          : 1,
                api             : "",
                downloadFile    : "",
                offset          : null,
                form            : {
                    enterprise_name : '',
                    month           : '',
                    trx_id          : '',
                    driver_name     : '',
                    idvendor        : '',
                    range_date      : ''
                },
                changeTab: 'inprogress',
            }
        },
        components: {
            Affix,
            OrderBar
        },
        computed: {
            ...mapGetters({
                listData : getter.GET_L_ORDER_CLIENT,
                paginate : getter.GET_PAG_ORDER_CLIENT,
                loading  : getter.GET_BUTTON,
                vendor      : getter.GET_DROPDOWN_VENDOR
            }),
            paginato(){
                return this.paginate
            },
            indexTam(){
                return this.indexT
            }
        },
        async created(){
            let userProfile = JSON.parse(localStorage.getItem('user')).idrole;
            this.path = this.$route.path === '/order/open';
            if(this.$route.path == '/order/inprogress')
                this.changeTab = 'inprogress'
            else if(this.$route.path == '/order/complete')
                this.changeTab = 'complete'
            else
                this.changeTab = 'cancel'
            // (this.$route.path == '/order/complete') ? this.changeTab = 'complete' : this.changeTab = 'inprogress';
            this.role = userProfile;
            let start, end;
                if(this.form.range_date === null || this.form.range_date === ''){
                    start = '',
                    end   = ''
                }else {
                    start = this.form.range_date[0],
                    end   = this.form.range_date[1]
                }
            let obj = {
                page    : this.currentPage,
                path    : this.$route.path,
                enterprise_name  : this.form.enterprise_name,
                month           : this.form.month,
                trx_id          : this.form.trx_id,
                driver_name     : this.form.driver_name,
                idvendor        : this.form.idvendor,
                start_date      : start,
                end_date        : end
            };

            this.$store.commit(mutation.BUTTON_STATUS, true);
            let data = await this.$store.dispatch(action.LIST_ORDER_CLIENT, obj)
        },
        methods: {
            headerRowStyle({row, column, rowIndex, columnIndex}) {
                // if (columnIndex === 2 && this.changeTab === 'open') {
                // return {"wordSpacing":"80px"};
                // } else if (columnIndex === 3 && this.changeTab === 'open') {
                // return {"wordSpacing":"70px"};
                // } else if (columnIndex === 5 && this.changeTab === 'open') {
                // return {"wordSpacing":"50px"};
                // } else 
                if (columnIndex === 3 && this.changeTab !== 'open') {
                return {"wordSpacing":"170px"};
                } else if (columnIndex === 4 && this.changeTab !== 'open') {
                return {"wordSpacing":"180px"};
                } else if (columnIndex === 6 && this.changeTab !== 'open') {
                return {"wordSpacing":"170px"};
                }
            },
            newCorp()   {
                this.$router.replace('/order/create')
            },
            async exportExcel(){
                let data = '';
                if(this.form.month === '' || this.form.month === '0' ){
                    swal('please select month (except all month)','', 'error')
                }else {
                    let obj = {
                        path    : this.$route.path,
                        month   : this.form.month
                    };
                   data = await this.$store.dispatch(action.EXPORT_ORDER_LIST, obj)
                    let firstD = data.slice(1)
                    let secondD = firstD.slice(0, firstD.length -1)
                    window.open(secondD)
                }
            },
            handlePageChange(page) {
                let start, end;
                if(this.form.range_date === null || this.form.range_date === ''){
                    start = '',
                    end   = ''
                }else {
                    start = this.form.range_date[0],
                    end   = this.form.range_date[1]
                }
                let obj = {
                    page    : page,
                    path    : this.$route.path,
                    enterprise_name  : this.form.enterprise_name,
                    month           : this.form.month,
                    trx_id          : this.form.trx_id,
                    driver_name     : this.form.driver_name,
                    idvendor        : this.form.idvendor,
                    start_date      : start,
                    end_date        : end
                };
                this.$store.commit(mutation.BUTTON_STATUS, true);
                this.currentPage = page;
                this.$store.dispatch( action.LIST_ORDER_CLIENT, obj )
            },
            search(){
                this.$store.dispatch( action.LIST_ORDER_CLIENT, this.input.trim() )
            },
            async getId(id){
                let obj = {
                    id    : id.idorder,
                    path  : this.$route.path
                };
                await this.$store.dispatch(action.ID_ORDER_CLIENT, obj)
                this.$router.replace('/detail-order')
            },
            indexMethod(index) {
                return index + this.paginato.fromP;
            },
            searchSquare(){
                let start, end;
                if(this.form.range_date === null || this.form.range_date === ''){
                    start = '',
                    end   = ''
                }else {
                    start = this.form.range_date[0],
                    end   = this.form.range_date[1]
                }
                let obj = {
                    page            : this.currentPage,
                    path            : this.$route.path,
                    enterprise_name  : this.form.enterprise_name,
                    month           : this.form.month,
                    trx_id          : this.form.trx_id,
                    driver_name     : this.form.driver_name,
                    idvendor        : this.form.idvendor,
                    start_date      : start,
                    end_date        : end
                };
                this.$store.dispatch(action.LIST_ORDER_CLIENT, obj)
            },
            tabChange(v) {
                this.$router.replace(v)
            },
            imgAlt(event) {
                event.target.src = require("../../../assets/images/avatar-2.jpg");
            },
        }
    }
</script>

<style lang="scss" scoped>

    .table-box {
        overflow: auto;
    }
    .el-pagination {
        padding-top: 20px;
    }
    .card-base {
        padding: 20px;
    }
    .el-row {
        padding: 0px 10px 5px;
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
    .drive-acount {
        height: 113px;
        margin-top: 10px;
    }
    @media only screen and (min-width: 1590px) {
        .drive-acount {
            height: 147px;
            margin-top: 10px;
        }
    }

</style>

