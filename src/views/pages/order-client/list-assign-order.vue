<template>
    <div class="page-table scrollable only-y" id="affix-container">
        <order-bar />

        <div class="card-base card-shadow--medium bg-white">
        <el-row>
            <el-col :span="24">
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
            </el-col>
        </el-row>

            <el-row :gutter="20">
                <el-col :span="16">
                    <div class="grid-content" >
                        <el-button
                                v-if="path"
                                @click="newCorp"
                                type="primary">
                            New Order
                        </el-button>
                    </div>
                </el-col>
                <!--<el-col :span="8" :offset="offset">-->
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
                <el-col :span="spanMonth">
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
                <el-col :span="5">
                    <el-input
                            placeholder="Enterprise Name"
                            v-model="form.enterprise_name">
                    </el-input>
                </el-col>
                <el-col :span="5" v-if="changeTab !== 'open'">
                    <el-input
                            placeholder="Driver Name"
                            v-model="form.driver_name">
                    </el-input>
                </el-col>
                <el-col :span="spanDriver">
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

            <el-row >
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
                                <img v-if="changeTab === 'open'" style="width: 35px; height: 35px; border-radius: 50%" src="../../../assets/images/avatar-2.jpg">
                                <img v-else style="width: 35px; height: 35px; border-radius: 50%" :src="scope.row.profile_picture" @error="imgAlt">
                            </template>
                        </el-table-column>
                        <el-table-column
                                v-if="changeTab !== 'open'"
                                prop="driver.user.nama_driver"
                                label="DRIVER INFO">
                        </el-table-column>
                        <el-table-column
                                prop="user_fullname"
                                label="USER CUSTOMER">
                        </el-table-column>                        
                        <el-table-column
                                prop="booking_time"
                                label="BOOKING TIME">
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
                <el-col :span="20">
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
        name: 'Order',
        data() {
            return {
                role            : '',
                dropDown        : '',
                currentPage     : 1,
                path            : null,
                rolePath        : '',
                input           :'',
                affixEnabled    : true,
                indexT          : 1,
                offset          : null,
                spanMonth       : 6,
                spanDriver      : 5,
                start           : '',
                end             : '',
                form            : {
                    enterprise_name : '',
                    month           : '',
                    trx_id          : '',
                    driver_name     : '',
                    idvendor        : '',
                    range_date      : '',
                },
                changeTab           : 'open'
            }
        },
        components: {
            Affix,
            OrderBar
        },
        computed: {
            ...mapGetters({
                listData    : getter.GET_L_ORDER_CLIENT,
                paginate    : getter.GET_PAG_ORDER_CLIENT,
                loading     : getter.GET_BUTTON,
                vendor      : getter.GET_DROPDOWN_VENDOR,
                tab         : getter.GET_ROLE_PATH_ORDER
            }),
            paginato(){
                return this.paginate
            },
            indexTam(){
                return this.indexT
            },
        },
        async created(){
            // await this.$store.dispatch(action.ORDER_GRAPHIC_BAR, 'today');
            let userProfile = JSON.parse(localStorage.getItem('user')).idrole;
            this.path = userProfile === 5;
            this.role = userProfile;
            if(userProfile === 1){
                this.$store.dispatch(action.DROPDOWN_VENDOR);
            }
            this.changeTab = this.tab;
            this.rolePath = `/order/${this.tab}`;
            if(this.changeTab === 'open'){
                this.spanMonth = 6;
                this.spanDriver = 5;
            }else {
                this.spanDriver = 3;
                this.spanMonth = 3
            }
            if(this.listData == null)
                this.sendForm();
            if(this.paginato.curPage != null)
                this.currentPage = this.paginato.curPage
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
                this.$router.push('/order/create')
            },
            async exportExcel(){
                let data = '';
                if(this.form.month === '' || this.form.month === '0' ){
                    swal('please select month (except all month)','', 'error')
                }else {
                    let obj = {
                        path    : `/order/${this.changeTab}`,
                        month   : this.form.month
                    };
                    data = await this.$store.dispatch(action.EXPORT_ORDER_LIST, obj)
                    let firstD = data.slice(1)
                    let secondD = firstD.slice(0, firstD.length -1)
                    window.open(secondD)
                }
            },
            handlePageChange(page) {
                this.currentPage = page;
                this.sendForm();
            },
            search(){
                this.$store.dispatch( action.LIST_ORDER_CLIENT, this.input.trim() )
            },
            async getId(id){
                let obj = {
                    id    : id.idorder,
                    path  : this.rolePath
                };
                await this.$store.dispatch(action.ID_ORDER_CLIENT, obj);
                if(this.changeTab === 'open'){
                    this.$router.push('/order/detail')
                }else {
                    this.$router.push('/detail-order')
                }
            },
            indexMethod(index) {
                return index + this.paginato.fromP;
            },
            searchSquare(){
                this.sendForm()
            },
            async tabChange(v){
                this.$store.commit(mutation.SET_ROLE_PATH_ORDER, v);
                if(v === 'open'){
                    this.spanMonth = 6;
                    this.spanDriver = 5;
                }else {
                    this.spanDriver = 3;
                    this.spanMonth = 3
                }
                this.rolePath = `/order/${v}`;
                this.currentPage = 1;
                this.sendForm();
            },
            imgAlt(event) {
                event.target.src = require("../../../assets/images/avatar-2.jpg");
            },
            async sendForm(){
                if(this.form.range_date === null || this.form.range_date === ''){
                    this.start = '',
                        this.end   = ''
                }else {
                    this.start = this.form.range_date[0],
                        this.end   = this.form.range_date[1]
                }
                let obj = {
                    page            : this.currentPage,
                    path            : this.rolePath,
                    enterprise_name : this.form.enterprise_name,
                    month           : this.form.month,
                    trx_id          : this.form.trx_id,
                    driver_name     : this.form.driver_name,
                    idvendor        : this.form.idvendor,
                    start_date      : this.start,
                    end_date        : this.end
                };
                this.$store.commit(mutation.BUTTON_STATUS, true);
                await this.$store.dispatch(action.LIST_ORDER_CLIENT, obj)
            }
        },
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

