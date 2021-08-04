<template>
    <div class="page-table scrollable only-y" id="affix-container">
        <dispatcher-count />
    </div>
</template>

<script>
    import DispatcherCount from '@/components/dispatcher/total-acount'
    import Affix from '@/components/Affix'
    import { mapGetters } from 'vuex'
    import * as getter from '../../../store/getters-types'
    import * as mutation from '../../../store/mutation-types'
    import * as action from '../../../store/action-types'

    export default {
        name: 'Table',
        data() {
            return {
                currentPage: 1,
                input:'',
                affixEnabled: true,
                indexT: 1,
                status:1 ,
                select: [
                {
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
                type : '',
                dispatcher_type: [
                    {
                        name: "REGULER",
                        status: 4
                    },
                    {
                        name: "PLUS",
                        status: 5
                    }
                ]
            }
        },
        components: {
            Affix,
            DispatcherCount
        },
        computed: {
            ...mapGetters({
                listData : getter.GET_LIST_DISPATCHER,
                paginate : getter.GET_PAGINATE_DISPATCHER,
                loading  : getter.GET_BUTTON
            }),
            paginato(){
                return this.paginate
            },
            indexTam(){
                return this.indexT
            }
        },
    //    async created(){
    //         this.$store.commit(mutation.BUTTON_STATUS, true);
    //         await this.$store.dispatch(action.LIST_DISPATCHER,{
    //             page: this.currentPage,
    //             typedispatcher : this.type,
    //             status: this.status});
    //         },
        methods: {
            newCorp()   {
                this.$router.replace('new-dispatcher')
            },
            handlePageChange(page) {
                this.currentPage = page
                this.$store.commit(mutation.BUTTON_STATUS, true);
                this.$store.dispatch( action.LIST_DISPATCHER,
                    {
                        page: this.currentPage,
                        typedispatcher : this.type,
                        status: this.status
                    });
                },
            search(){
                this.$store.dispatch( action.LIST_DATA_COR, this.input.trim() )
            },
            async getId(id){
                await this.$store.dispatch(action.DATA_ID_DISPATCHER, id.id)
                this.$router.replace({ path: '/detail-dispatcher' })
            },
            indexMethod(index) {
                return index + this.paginato.fromP;
            },
            filterStatus(status){
                this.$store.commit(mutation.BUTTON_STATUS, true);
                this.status = status;
                this.$store.dispatch(action.LIST_DISPATCHER,
                    {
                        page: 1,
                        typedispatcher : this.type,
                        status: this.status
                    });
            },
            filterTypeDispatcher(type){
                this.$store.commit(mutation.BUTTON_STATUS, true);
                this.type = type;
                this.$store.dispatch(action.LIST_DISPATCHER,
                    {
                        page: 1,
                        typedispatcher : this.type,
                        status: this.status
                    });
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
    .el-input {
        width: 300px !important;
    }
    .card-base {
        padding: 20px;
    }
    .el-row {
        padding: 0px 10px 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 5px;
    }

</style>

