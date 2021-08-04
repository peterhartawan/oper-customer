<template>
    <div class="page-table scrollable only-y" id="affix-container">
        <div class="card-base card-shadow--medium bg-white">
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-button
                            @click="onBackButton"
                    >
                        Back
                    </el-button>
                    <el-button @click="newTemplate" type="primary">
                        + New Template
                    </el-button>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-table
                            :data="listData"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                type="index"
                                label="No"
                                :index="indexMethod"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="task_template_name"
                                label="Template Name">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                width="120">
                            <template slot-scope="scope">
                                <el-button
                                        type="danger"
                                        icon="el-icon-delete"
                                        size="mini"
                                        @click="delButton(scope.row.task_template_id)"
                                        style="margin-top: 10px;">
                                </el-button>
                                <el-button
                                        type="success"
                                        icon="el-icon-edit"
                                        @click="handleEdit(scope.row.task_template_id)"
                                        size="mini"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <div class="grid-content">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                @current-change="handlePageChange"
                                :total="paginat.totalP">

                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>

    import router from '../../../router'
    import { mapGetters } from 'vuex'
    import * as getter from '../../../store/getters-types'
    import * as action from '../../../store/action-types'
    import * as mutation from '../../../store/mutation-types'
    import Swal from 'sweetalert2'

    export default {
        name: 'Table',
        data() {
            return {
                currentPage: 1,
                input:'',
                buttonStatus: null,
                affixEnabled: true,
                indexT: 1

            }
        },
        computed: {
            ...mapGetters({
                listData : getter.GET_TEMPLATE_LIST,
                paginate : getter.GET_TEMPLATE_PAGINATE,
                identer  : getter.GET_ID_ENTERPRISE
            }),
            paginat(){
                return this.paginate
            },
            indexTam(){
                return this.indexT
            }
        },
        created(){
            (JSON.parse(localStorage.getItem('user')).idrole === 2) ? this.buttonStatus = false : this.buttonStatus = true;
            let obj = {
                    id : this.identer,
                    page: this.currentPage
            };
            this.$store.dispatch(action.TEMPLATE_LIST, obj)
        },
        methods: {
            newTemplate()   {
                this.$router.replace('/new-template-task')
                this.$store.commit(mutation.SET_ID_ENTERPRISE, this.identer)
            },
            handlePageChange(page) {
                this.currentPage = page;
                let obj = {
                    id : this.identer,
                    page: this.currentPage
                };
                this.$store.dispatch( action.TEMPLATE_LIST, obj )
            },
            delButton(e){
                let obj = {
                    idList: e,
                    id: this.identer,
                    currPage: this.currentPage
                }
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.$store.dispatch(action.DELETE_TEMPLATE, obj)
                    }
                })
            },
            indexMethod(index) {
                return index + this.paginat.fromP;
            },
            handleEdit(e){
                this.$router.replace('/edit-template-task')
                this.$store.commit(mutation.SET_ID_ENTERPRISE, e)
            },
            onBackButton() {
                if(this.buttonStatus){
                    router.replace(`/detail-enterprise/${this.identer}`)
                }else {
                    router.replace(`/employee/inprogress`)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../assets/scss/variables';

    .table-box {
        overflow: auto;
    }
    .el-pagination {
        padding-top: 20px;
    }
    .el-input {
        width: 300px !important;
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
</style>

