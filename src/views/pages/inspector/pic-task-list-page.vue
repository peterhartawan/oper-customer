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
                    <el-button
                            @click="newCorp"
                            type="primary">
                        New Pic
                    </el-button>
                </el-col>
                <el-col :span="8">
                    <el-input placeholder="Search" v-model="input" @change="search">
                    </el-input>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-table
                            v-loading="loading"
                            :data="listData"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                type="index"
                                label="No"
                                :index="indexMethod"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="PIC Name">
                        </el-table-column>
                        <el-table-column
                                prop="phonenumber"
                                label="PIC Mobile Phone">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                width="120">
                            <template slot-scope="scope">
                                <el-button
                                        type="danger"
                                        icon="el-icon-delete"
                                        size="mini"
                                        @click="delButton(scope.row.idinspector)"
                                        style="margin-top: 10px;">
                                </el-button>
                                <el-button
                                        type="success"
                                        icon="el-icon-edit"
                                        @click="handleEdit(scope.row.idinspector)"
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
    import { mapGetters, mapMutations } from 'vuex'
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
                affixEnabled: true,
                indexT: 1

            }
        },
        computed: {
            ...mapGetters({
                listData : getter.GET_PICTASK_LIST,
                paginate : getter.GET_PICTASK_PAGINATE,
                identer  : getter.GET_ID_ENTERPRISE,
                loading  : getter.GET_LOADING
            }),
            paginat(){
                return this.paginate
            },
            indexTam(){
                return this.indexT
            }
        },
       async created(){
            let obj = {
                currentP        : 1,
                identerpriseS   : this.identer
            };
            await this.$store.dispatch(action.PICTASK_LIST, obj)
        },
        methods: {
            ...mapMutations({
                setIdEnt : mutation.SET_ID_ENTERPRISE,
                idInspec : mutation.SET_ID_INSPECTOR
            }),

            newCorp()   {
                this.$router.push('/new-pic')
                this.$store.commit(mutation.SET_ID_ENTERPRISE, this.identer)
            },
            handlePageChange(page) {
                this.currentPage = page
                let obj = {
                    currentP        : this.currentPage,
                    identerpriseS   : this.identer
                }
                this.$store.dispatch( action.PICTASK_LIST, obj)
            },
            search(){
            },
            delButton(e){
                let obj = {
                    idList: e,
                    currPage: this.currentPage,
                    identer : this.identer
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
                        this.$store.dispatch(action.DELETE_INSPECTOR, obj)
                        // router.push('/pic-task-list')
                        // this.$store.dispatch(action.PICTASK_LIST, this.currentPage)

                    }
                })
            },
            indexMethod(index) {
                return index + this.paginat.fromP;
            },
            async handleEdit(e){
                await this.setIdEnt(this.identer)
                await this.idInspec(e)
                this.$router.push('/edit-inspector')
            },
            onBackButton() {
                router.push(`/detail-enterprise/${this.identer}`)
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

