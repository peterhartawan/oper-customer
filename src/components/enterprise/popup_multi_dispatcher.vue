<template>
<span>
    <div class="hoverhand" slot="reference">
        <el-button @click="renderDialog" style="width: 100%; border-color: #f4f4f5;" type="info" plain>
            <span style=" text-align: justify;">
                <h2><img src="../../../src/assets/oper_asset/employee.png" class="drive-acount">&nbsp; Dispatcher List</h2>
            </span>
        </el-button>
    </div>
    <el-dialog :visible.sync="dialogTableVisible" title="Assign Dispatcher Plus" width="70%">
        <el-form :model="form" @submit.prevent.native>
            <el-row :gutter="20">
                <el-col :span="20">
                    <el-form-item>
                        <el-input placeholder="Search" clearable v-model="form.search"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-button @click="buttonSearch" icon="el-icon-search"></el-button>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-table 
                ref="tableRef"
                v-loading="loading" 
                :data="listData" 
                height="280"
                @selection-change="handleSelectionChange"
            >

                <el-table-column type="index" :index="indexMethod" label="No" width="80"/>
                <el-table-column prop="name" label="Name"/>
                <el-table-column prop="phonenumber" label="Mobile"/>
                <el-table-column type="selection"/>

            </el-table>
        </el-row>
        <el-row style="margin-top: 20px; width: 100%;">
            <el-button 
                @click="apply"
                :disabled="applyDisabled"
                style="float: right;"
                type="success">
                Apply
            </el-button>
        </el-row>
    </el-dialog>
    <el-dialog :visible.sync="showFinalList" title="Dispatcher List" width="70%">
        <el-row v-if="final_dispatcher_list.length != 0">
            <el-table :data="final_dispatcher_list">
                <el-table-column type="index" label="No" width="80"/>
                <el-table-column prop="name" label="Name"/>
                <el-table-column prop="phonenumber" label="Mobile"/>
            </el-table>
        </el-row>
        <el-row v-if="final_dispatcher_list.length != 0">
            <p class="font-weight-600" align="center">Apakah anda yakin untuk assign dispatcher?</p>
        </el-row>
        <el-row v-else>
            <p class="font-weight-600" align="center">Apakah anda yakin untuk mengosongkan dispatcher?</p>
        </el-row>
        <el-row type="flex" justify="center">
            <el-button @click="confirm" type="success" size="medium">
                Ya
            </el-button>
            <el-button @click="cancel" type="danger" size="medium">
                Tidak
            </el-button>
        </el-row>
    </el-dialog>
</span>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import * as getter from '../../store/getters-types'
import * as action from '../../store/action-types'
import Swal from 'sweetalert2'
import * as mutation from '../../store/mutation-types'

export default {
    props: ['identerprise', 'picture'],
    data() {
        return {
            currentPage: 1,
            dialogTableVisible: false,
            form: {
                assignEnterprise: this.identerprise,
                search: ''
            },
            firstLoad: true,
            buttonSearchPress: false,
            showFinalList: false,
            applyDisabled: true,
            selected_dispatcher_ids: [],
            unassign_dispatcher_ids: [],
            final_dispatcher_list: []
        };
    },
    computed: {
        ...mapGetters({
            paginate: getter.GET_PAGINATE_DISPATCHER,
            listData: getter.GET_DISPATCHER_AVAILABLE,
            loading: getter.GET_BUTTON,
            default_dispatchers: getter.GET_SELECTED_DISPATCHERS
        }),
        paginato() {
            return this.paginate
        },
        indexTam() {
            return this.indexT
        },
        vendor() {
            let idrole = JSON.parse(localStorage.getItem('user')).idrole
            if (idrole === 2) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        apply(){
            this.final_dispatcher_list = []

            let ld = this.listData
            let dd = this.default_dispatchers
            let ud = this.unassign_dispatcher_ids
            let sd = this.selected_dispatcher_ids

            let lenLd = ld.length
            let lenDd = dd.length
            let lenUd = ud.length
            let lenSd = sd.length

            //get unchanged dispatchers
            //default dispatchers - unassigned dispatchers
            let count
            for(let i = 0; i < lenDd; i++){
                count = 0
                for(let j = 0; j < lenUd; j++){
                    if(dd[i].id == ud[j]){
                        count++
                    }
                }
                //doesn't exist
                if(count == 0)
                    this.final_dispatcher_list.push(dd[i])
            }

            //push assigned dispatchers
            for(let i = 0; i < lenSd; i++){
                for(let j = 0; j < lenLd; j++){
                    //exists
                    if(sd[i] == ld[j].id)
                        this.final_dispatcher_list.push(ld[j])
                }
            }

            this.dialogTableVisible = false
            this.showFinalList = true
        },
        confirm(){
            this.showFinalList = false
            let obj = {
                // id: id.id,
                assign_ids  : this.selected_dispatcher_ids,
                unassign_ids: this.unassign_dispatcher_ids,
                identerprise: this.identerprise
            };
            this.$store.dispatch(action.MULTI_TO_ENTERPRISE, obj);
        },
        cancel(){
            this.showFinalList = false
        },
        renderDialog(){
            this.dialogTableVisible = true
            if(this.firstLoad){
                this.selected_dispatcher_ids = []
                this.unassign_dispatcher_ids = []
                this.$store.commit(mutation.BUTTON_STATUS, true)
                setTimeout(
                    () => {
                        this.$refs.tableRef.clearSelection()
                        this.default_dispatchers.forEach((element) => {
                            this.$refs.tableRef.toggleRowSelection(element)
                        })
                        this.firstLoad = false
                        this.$store.commit(mutation.BUTTON_STATUS, false)
                        // console.log(this.selected_dispatcher_ids)
                    }, 
                    1000
                )
            }
        },
        async handlePageChange(page) {
            this.currentPage = page;
            let obj = {
                role: 4,
                page: this.currentPage
            };
            this.$store.commit(mutation.BUTTON_STATUS, true)
            await this.$store.dispatch(action.LIST_DISPATCHER_ROLE, obj);
        },
        indexMethod(index) {
            return index + 1;
        },
        async buttonSearch() {
            this.buttonSearchPress = true

            this.$store.commit(mutation.BUTTON_STATUS, true);
            await this.$store.dispatch(action.MULTI_DISPATCHER_AVAILABLE, this.form)

            let ld = this.listData
            let sd = []
            this.default_dispatchers.forEach((element) => {
                sd.push(element.id)
            })
            this.selected_dispatcher_ids.forEach((element) => {
                sd.push(element)
            })
            let lenLd = ld.length
            let lenSd = sd.length

            //check the box of selected dispatchers
            for(let i = 0; i < lenLd; i++){
                for(let j = 0; j < lenSd; j++){
                    if(ld[i].id == sd[j]){
                        this.$refs.tableRef.toggleRowSelection(ld[i])
                    }
                }
            }
            this.buttonSearchPress = false
        },
        handleSelectionChange(val) {
            if(this.firstLoad)
                return
            
            if(this.buttonSearchPress)
                return
                
            var count
            this.selected_dispatcher_ids = []
            this.unassign_dispatcher_ids = []

            let s = val
            let d = this.default_dispatchers
            let lenS = s.length
            let lenD = d.length

            //newly added dispatchers
            for(let i = 0; i < lenS; i++){
                count = 0
                for(let j = 0; j < lenD; j++){
                    if(s[i].id == d[j].id)
                        count++
                }
                if(count == 0)
                    this.selected_dispatcher_ids.push(s[i].id)
            }

            //removed dispatchers
            for(let j = 0; j < lenD; j++){
                count = 0
                for(let i = 0; i < lenS; i++){
                    if(s[i].id == d[j].id)
                        count++
                }
                if(count == 0)
                    this.unassign_dispatcher_ids.push(d[j].id)
            }

            if(this.selected_dispatcher_ids.length != 0 || this.unassign_dispatcher_ids.length != 0 ){
                this.applyDisabled = false
            } else {
                this.applyDisabled = true
            }
        }
    },
};
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

.image {
    max-width: 100%;
    height: 150px;
    display: block;
}

.vl {
    border-left: 3px solid #f2f2f2;
    height: 90%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.avatar {
    border-radius: 50%;
    max-width: 80px;
    height: 80px;
    border: 1px solid #fff;
    box-sizing: border-box;
    display: block;
    box-shadow: 0 2px 5px 0 rgba(49, 49, 93, 0.1),
        0 1px 2px 0 rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.5s;
}

.left {
    text-align: left;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.middle {
    margin-top: -30px
}

.drive-acount {
    height: 39px;
    margin-top: -11px;
    margin-bottom: -10px;
}

.hoverhand:hover {
    cursor: pointer;
}
</style>
