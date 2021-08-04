<template>
    <div class="page-table scrollable only-y" id="affix-container">
        <div class="card-base card-shadow--medium bg-white">
            <el-row :gutter="20">
                <el-col :span="24" style="margin-bottom: 20px">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/employee/inprogress' }">Inprogress</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path:'/employee/complete' }">Complete</el-breadcrumb-item>
                        <el-breadcrumb-item ></el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
<!--                <el-col :span="16">-->
<!--                    <div >-->
<!--                        <el-button-->
<!--                                v-if="path"-->
<!--                                @click="newCorp"-->
<!--                                type="primary">-->
<!--                            New Order-->
<!--                        </el-button>-->
<!--                    </div>-->
<!--                </el-col>-->
                <!--<el-col :lg="{span: 8, offset}">-->
                <!--<el-input-->
                <!--placeholder="Search"-->
                <!--style="width: 300px"-->
                <!--v-model="input"-->
                <!--@change="search">-->
                <!--</el-input>-->
                <!--</el-col>-->
            </el-row>

            <el-row :gutter="10" style="margin-top: 20px">
                    <el-col :lg="{span: 10, offset:0}">
                        <el-button type="danger" @click="templateButton">
                            Template
                        </el-button>
                        <el-button type="danger" @click="assignButton">
                            Assign
                        </el-button>
                    </el-col>

                <el-col :span="6">
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

                <!--<el-col :span="6">-->
                    <!--<el-input-->
                            <!--placeholder="Enterprise Name"-->
                            <!--v-model="form.enterprise_name">-->
                    <!--</el-input>-->
                <!--</el-col>-->

                <el-col :span="6">
                    <el-input
                            placeholder="Transaction ID"
                            v-model="form.trx_id">
                    </el-input>
                </el-col>

                <el-col :span="1">
                    <el-button
                            icon="el-icon-search"
                            @click="searchSquare"
                            square
                            size="small">

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
                                label="No"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="trx_id"
                                label="Transaction ID">
                        </el-table-column>
                        <el-table-column
                                prop="employee.user.name"
                                label="Name">
                        </el-table-column>
                        <el-table-column
                                prop="employee.employee_position.job_name"
                                label="Position">
                        </el-table-column>
                        <el-table-column
                                prop="status_text"
                                label="Status">
                        </el-table-column>
                        <el-table-column
                                prop="created_at"
                                label="Date">
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
                <!--<el-col :lg="4">-->
                    <!--<el-button-->
                            <!--type="primary"-->
                            <!--@click="exportExcel"-->
                            <!--style="margin-top: 15px">-->
                        <!--Export-->
                    <!--</el-button>-->
                <!--</el-col>-->
            </el-row>
        </div>
    </div>
</template>

<script>
    import Affix from '@/components/Affix'
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
            Affix
        },
        computed: {
            ...mapGetters({
                listData : getter.GET_LIST_EMPLOYEE,
                paginate : getter.GET_PAGINATE_EMPLOYEE,
                loading  : getter.GET_BUTTON,
                total    : getter.GET_EMPLOYEE_TOTAL
            }),
            paginato(){
                return this.paginate
            },
            indexTam(){
                return this.indexT
            }
        },
        async created(){
            // this.path = this.$route.path == '/order/open';
            // (this.$route.path == '/order/open') ? this.offset = 0 : this.offset = 16

            let objList = {
                dataList    : null,
                nextC       : null,
                prevC       : null,
                firstP      : null,
                fromPA      : null,
                total       : null
            }
            await this.$store.commit(mutation.SET_EMPLOYEE_LIST, objList)

            let obj = {
                page    : this.currentPage,
                path    : '/employee/task/complete',
                month           : this.form.month,
                trx_id          : this.form.trx_id,
                form            : this.form.formP,
                to              : this.form.to
            }
            this.$store.commit(mutation.BUTTON_STATUS, true)
            let data = await this.$store.dispatch(action.LIST_EMPLOYEE_TASK, obj)
        },
        methods: {
            // newCorp()   {
            //     this.$router.replace('/order/create')
            // },
            // exportExcel(){
            //     if(this.form.month === '' || this.form.month === '0' ){
            //         swal('please select month (except all month)','', 'error')
            //     }else {
            //         let obj = {
            //             path    : this.$route.path,
            //             month   : this.form.month
            //         }
            //         this.$store.dispatch(action.EXPORT_ORDER_LIST, obj)
            //     }
            // },
            handlePageChange(page) {
                let obj = {
                    page    : page,
                    path    : '/employee/task/complete',
                    month           : this.form.month,
                    trx_id          : this.form.trx_id,
                    form            : this.form.formP,
                    to              : this.form.to
                };
                this.currentPage = page
                this.$store.dispatch(action.LIST_EMPLOYEE_TASK, obj)
            },
            search(){
                this.$store.dispatch( action.LIST_ORDER_CLIENT, this.input.trim() )
            },
            templateButton(){
                this.$router.replace('/template-list')
            },
            assignButton(){
                this.$router.replace('/employee/assign-task')
            },
           async getId(id){
                let obj = {
                    id    : id.idorder,
                    path  : '/employee/task/complete'
                };
               await this.$store.dispatch(action.EMPLOYEE_TASK_ID, obj)
                this.$router.replace('/detail-task-employee')
            },
            indexMethod(index) {
                return index + this.paginate.fromP;
            },
            searchSquare(){
                let obj = {
                    page    : '1',
                    path    : '/employee/task/complete',
                    month           : this.form.month,
                    trx_id          : this.form.trx_id,
                    form            : this.form.formP,
                    to              : this.form.to
                }
                this.$store.dispatch(action.LIST_EMPLOYEE_TASK, obj)
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
</style>

