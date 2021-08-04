<template>
    <div class="page-table scrollable only-y" id="affix-container">
        <task-employee />
        <div class="card-base card-shadow--medium bg-white">

            <el-row justify="center">
                <el-col :span="24">
                    <el-radio-group v-model="changeTab" @change="tabChange" fill="#fffafa">
                        <el-radio-button label="inprogress" >
                            <img src="../../../../assets/oper_asset/inprogress_red.png" class="drive-acount" v-if="changeTab === 'inprogress'">
                            <img src="../../../../assets/oper_asset/inprogress_grey.png" class="drive-acount" v-else>
                        </el-radio-button>
                        <el-radio-button label="complete">
                            <img src="../../../../assets/oper_asset/completed_red.png" class="drive-acount" v-if="changeTab === 'complete'">
                            <img src="../../../../assets/oper_asset/completed_grey.png" class="drive-acount" v-else>
                        </el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row>

            <el-row :gutter="10" style="margin-top: 20px">
                <el-col :span="11">
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

                <el-col :span="11">
                    <el-input
                            placeholder="Transaction ID"
                            v-model="form.trx_id">
                    </el-input>
                </el-col>

                <el-col :span="1">
                    <el-button
                            :loading="buttonSearch"
                            icon="el-icon-search"
                            @click="searchSquare"
                            style="background: #D50000; font-size: 15px; color: white; "
                            square>

                    </el-button>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-table
                            v-loading="loading"
                            element-loading-text="Loading..."
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.8)"
                            :data="listData"
                            stripe
                            style="width: 100%"
                            @row-click="getId">
                        <el-table-column
                                type="index"
                                :index="indexMethod"
                                label="NO"
                                width="80">
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
                                prop="task_template_name"
                                label="TEMPLATE NAME">
                        </el-table-column>
                        <el-table-column
                                prop="employee.user.name"
                                label="NAME">
                        </el-table-column>
                        <el-table-column
                                prop="employee.employee_position.job_name"
                                label="POSITION">
                        </el-table-column>
                        <!--<el-table-column-->
                                <!--prop="status_text"-->
                                <!--label="STATUS">-->
                        <!--</el-table-column>-->
                         <el-table-column
                                prop="created_at"
                                label="DATE">
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
                                :total="total">

                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import Affix from '@/components/Affix'
    import TaskEmployee from '../../../../components/employee/task-employee'
    import { mapGetters } from 'vuex'
    import * as getter from '../../../../store/getters-types'
    import * as action from '../../../../store/action-types'
    import * as mutation from '../../../../store/mutation-types'
    import swal from 'sweetalert2'

    export default {
        name: 'Table',
        data() {
            return {
                currentPage     : 1,
                changeTab       : 'inprogress',
                path            : null,
                input           :'',
                affixEnabled    : true,
                indexT          : 1,
                offset          : null,
                form            : {
                    enterprise_name : '',
                    month           : '',
                    trx_id          : '',
                    to              : '',
                    formP            : '',
                }
            }
        },
        components: {
            Affix,
            TaskEmployee
        },
        computed: {
            ...mapGetters({
                listData        : getter.GET_LIST_EMPLOYEE,
                paginate        : getter.GET_PAGINATE_EMPLOYEE,
                loading         : getter.GET_BUTTON,
                total           : getter.GET_EMPLOYEE_TOTAL,
                tab             : getter.GET_ROLE_TAB_EMPLOYEE,
                buttonSearch    : getter.GET_SEARCH_BUTTON
            }),
            indexTam(){
                return this.indexT
            }
        },
        async created(){
            let objList = {
                dataList    : null,
                nextC       : null,
                prevC       : null,
                firstP      : null,
                fromPA      : null,
                total       : null
            };
            this.$store.commit(mutation.BUTTON_STATUS, true);
            await this.$store.commit(mutation.SET_EMPLOYEE_LIST, objList);
            this.changeTab = this.tab;
            this.currentPage = 1;
            this.path = `/employee/task/${this.changeTab}`;
            this.sendForm()
        },
        methods: {
            tabChange(v) {
                this.$store.commit(mutation.SET_ROLE_TAB_EMPLOYEE, v);
                this.currentPage    = 1;
                this.path           = `/employee/task/${v}`;
                this.sendForm();
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
                    path  : this.path
                };
                await this.$store.dispatch(action.EMPLOYEE_TASK_ID, obj);
                this.$router.replace('/detail-task-employee')
            },
            indexMethod(index) {
                return index + this.paginate.fromP;
            },
            searchSquare(){
                this.currentPage = 1;
                this.$store.commit(mutation.SET_SEARCH_BUTTON, true);
                this.sendForm();
            },
            sendForm(){
                let obj = {
                    page    : this.currentPage,
                    path    : this.path,
                    month           : this.form.month,
                    trx_id          : this.form.trx_id,
                    form            : this.form.formP,
                    to              : this.form.to
                };
                this.$store.commit(mutation.BUTTON_STATUS, true);
                this.$store.dispatch(action.LIST_EMPLOYEE_TASK, obj)
            },
            imgAlt(event) {
                event = require('../../../../assets/images/avatar-2.jpg')
            }
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
        padding: 0px 10px;
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
            width: 470px;
        }
    }
</style>

