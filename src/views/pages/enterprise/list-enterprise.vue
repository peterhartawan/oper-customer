<template>
<div class="page-table scrollable only-y" id="affix-container">
    <el-row :gutter="10" style="margin-bottom: 20px;">
        <el-col :span="4">
            <div v-if="buttonStatus">
                <el-button style="width: 100%; background-color:#D50000; border-color:#D50000" @click="newCorp" type="primary">
                    New Enterprise
                </el-button>
            </div>
        </el-col>
        <el-col :span="5" :offset="offset">
            <el-input style="width: 100%" placeholder="Search" prefix-icon="el-icon-search" clearable @keyup.native="nameE" @clear="clearInputButton" v-model="enterpriseName">
            </el-input>
        </el-col>
        <el-col :span="6">
            <el-select style="width: 100%" @change="filterTypeEnterprise" v-model="type" filterable placeholder="Select Enterprise Type">
                <el-option v-for="item in enterprise_type" :key="item.status" :label="item.name" :value="item.status"></el-option>
            </el-select>
        </el-col>
        <el-col :span="4">
            <el-select style="width: 100%" @change="filterStatus" v-model="status" filterable placeholder="Select">
                <el-option v-for="item in select" :key="item.status" :label="item.name" :value="item.status"></el-option>
            </el-select>
        </el-col>
    </el-row>
    <p class="font-weight-600 mt-40">&nbsp;&nbsp; PARTNER</p>
    <el-row :gutter="20">
        <div v-for="item in listData" v-bind:key="item.idententerprise">
            <el-col :span="8">
                <el-popover placement="top-left" :title="item.name" width="180" trigger="hover">
                    <div class="hoverhand" slot="reference">
                        <div class="card-base card-shadow--medium mb-30 widget small-widget" @click="getId(item.identerprise)">
                            <el-row>
                                <el-col :offset="8" :span="8">
                                    <div v-if='item.image_logo == ""'>
                                        <img src="../../../../src/assets/images/Oper_Logo_Landscape_Red.png" class="image">
                                    </div>
                                    <div v-else>
                                        <img :src="item.image_logo" class="image">
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-popover>
            </el-col>
        </div>
    </el-row>
    <el-row>
        <h1></h1>
        <el-col :span="24">
            <div class="grid-content">
                <el-pagination background layout="prev, pager, next" @current-change="handlePageChange" :total="paginato.totalP">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import Affix from '@/components/Affix'
import {
    mapGetters
} from 'vuex'
import * as getter from '../../../store/getters-types'
import * as action from '../../../store/action-types'
import * as mutation from '../../../store/mutation-types'

export default {
    name: 'Table',
    data() {
        return {
            currentPage: 1,
            input: '',
            affixEnabled: true,
            indexT: 1,
            buttonStatus: null,
            offset: null,
            status: 1,
            enterpriseName: '',
            select: [{
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
            type: '',
            enterprise_type: [{
                    name: "REGULER",
                    status: 1,
                },
                {
                    name: "PLUS",
                    status: 2,
                }
            ]
        };
    },
    components: {
        Affix
    },
    computed: {
        ...mapGetters({
            listData: getter.GET_LIST,
            paginate: getter.GET_PAGINATE,
            loading: getter.GET_BUTTON
        }),
        paginato() {
            return this.paginate
        },
        indexTam() {
            return this.indexT
        }
    },
    async mounted() {
        this.$store.commit(mutation.BUTTON_STATUS, true)
        await this.$store.dispatch(action.LIST_DATA_COR, {
            page: 1,
            typeenterprise: this.type,
            enterprise_name: this.enterpriseName,
            status: this.status
        });
        let userProfile = JSON.parse(localStorage.getItem('user')).idrole
        this.buttonStatus = userProfile === 1;
        (userProfile === 1) ? this.offset = 5: this.offset = 9
    },
    methods: {
        newCorp() {
            this.$router.push('new-enterprise')
        },
        handlePageChange(page) {
            this.currentPage = page;
            this.$store.commit(mutation.BUTTON_STATUS, true);
            this.$store.dispatch(action.LIST_DATA_COR, {
                page: this.currentPage,
                typeenterprise: this.type,
                enterprise_name: this.enterpriseName,
                status: this.status
            });
        },
        clearInputButton() {
            this.$store.dispatch(action.LIST_DATA_COR, {
                page: 1,
                typeenterprise: this.type,
                enterprise_name: this.enterpriseName,
                status: this.status
            });
        },
        search() {
            this.$store.dispatch(action.LIST_DATA_COR, this.input.trim())
        },
        async getId(id) {
            await this.$store.dispatch(action.DATA_ID_CORP, id);
            let idvendor = JSON.parse(localStorage.getItem('user')).vendor_idvendor
            let idOlx = process.env.VUE_APP_ID_VENDOR_OLX
            if(idvendor != idOlx){
                this.$router.push({
                    path: '/detail-enterprise/' + id
                })
            } else {
                this.$router.push({
                    path: '/detail-enterprise-md/' + id
                })
            }
        },
        indexMethod(index) {
            return index + this.paginato.fromP;
        },
        nameE() {
            let trimName = this.enterpriseName.trim()
            if (trimName.length > 0) {
                this.$store.commit(mutation.BUTTON_STATUS, true);
                this.$store.dispatch(action.LIST_DATA_COR, {
                    page: 1,
                    typeenterprise: this.type,
                    enterprise_name: trimName,
                    status: this.status
                });
            }
        },
        filterStatus(status) {
            this.$store.commit(mutation.BUTTON_STATUS, true);
            this.status = status;
            this.$store.dispatch(action.LIST_DATA_COR, {
                page: 1,
                typeenterprise: this.type,
                enterprise_name: this.enterpriseName,
                status: this.status
            });
        },
        filterTypeEnterprise(type) {
            this.$store.commit(mutation.BUTTON_STATUS, true);
            this.type = type;
            this.$store.dispatch(action.LIST_DATA_COR, {
                page: 1,
                typeenterprise: this.type,
                enterprise_name: this.enterpriseName,
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

/*.el-input {*/
/*width: 300px !important;*/
/*}*/

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
    object-fit: scale-down;
    width: 100%;
    height: 100px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
}

.hoverhand:hover {
    cursor: pointer;
}
</style>
