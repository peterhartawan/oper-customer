<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="20">
            <el-col :lg="12">
                <b>Vendor Name</b>
                <br>
                {{ vendor.name}}
            </el-col>
            <el-col :lg="12">
                <b>Vendor Email</b>
                <br>
                {{ vendor.email}}
            </el-col>
            <el-col :lg="24">
                <b>Vendor Office Phone</b>
                <br>
                {{ vendor.office_phone_number}}
            </el-col>
            <el-col :lg="24">
                <b>Vendor Office Adress</b>
                <br>
                {{ vendor.office_address}}
            </el-col>
        </el-row>
        <div style="margin: 20px 0;"></div>
        <el-row :gutter="20">
            <el-col>
                <h3>PIC</h3>
                <hr color="#dcdfe6">
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :lg="8">
                <b>PIC Name</b>
                <br>
                {{ vendor.pic_name}}
            </el-col>
            <el-col :lg="6">
                <b>PIC Mobile Phone</b>
                <br>
                {{ vendor.pic_mobile_number}}
            </el-col>
            <el-col :lg="8">
                <b>PIC Email</b>
                <br>
                <span style="word-break: break-all">
                    {{ vendor.pic_email}}
                </span>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col>
                <h3>Admin <el-button class="el-icon-plus" type="success" size="mini" @click="addButton" circle style="margin-left: 10px">
                    </el-button>
                </h3>

                <hr color="#dcdfe6">
            </el-col>
        </el-row>
        <div v-for="(domain) in vendor.admins" :key="domain.key">
            <el-row :gutter="20" style="margin-top: 20px">
                <el-col :lg="5">
                    <b>Admin Name</b>
                    <br>
                    {{ domain.name}}
                </el-col>
                <el-col :lg="5">
                    <b>Admin Mobile Phone</b>
                    <br>
                    {{ domain.phonenumber}}
                </el-col>
                <el-col :lg="7">
                    <b>Admin Email</b>
                    <br>
                    <span style="word-break: break-all">
                        {{ domain.email}}
                    </span>
                </el-col>
                <el-col :lg="5">
                    <b>Admin Type</b>
                    <br>
                    <span v-if="domain.idrole == 2" style="word-break: break-all">
                        Admin
                    </span>
                    <span v-if="domain.idrole == 9" style="word-break: break-all">
                        Sub-Admin
                    </span>
                </el-col>
                <el-col :lg="2">
                    <el-button type="success" @click="editAdmin(domain)" icon="el-icon-edit" style="padding: 12px"></el-button>
                </el-col>
            </el-row>
        </div>
        <div style="margin: 100px 0;"></div>
        <el-row>
            <el-col :lg="2">
                <el-button @click="Cancel()" type="default" index="/vendor">Back</el-button>
            </el-col>
            <el-col :lg="offsetV">
                <el-button @click="editVendor(vendor.idvendor)" type="success">Edit</el-button>
            </el-col>
            <div v-if="adminVendorStatus">
                <el-col :lg="4">
                    <el-button :loading="button" type="success" @click="resendActivation">Resend Activation</el-button>
                </el-col>
            </div>
            <div v-if="vendor.status===1">
                <el-col style="margin: 0 15px;" :lg="2">
                    <el-button :loading="button" type="danger" @click="suspend">Suspend</el-button>
                </el-col>
            </div>
            <div v-else-if="vendor.status===3 || vendor.status===2">
                <el-col style="margin: 0 15px;" :lg="2">
                    <el-button :loading="button" @click="activeButton" type="primary">Active</el-button>
                </el-col>
            </div>
        </el-row>
    </div>
</div>
</template>

<script>
import router from "../../../router";
import moment from "moment";
import Affix from "@/components/Affix";
import {
    mapGetters,
    mapActions
} from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from "../../../store/mutation-types";
import Swal from "sweetalert2";
export default {
    name: "DetailVendor",
    data() {
        return {
            payload: {
                idadmin: "",
                reason_suspend: null,
                idvendor: null
            },
            adminVendorStatus: null,
            offsetV: null
        };
    },
    methods: {
        Cancel() {
            this.$router.push({
                name: "IndexVendor"
            });
        },
        editVendor() {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            this.$store.dispatch(action.DATA_ID_VENDOR, this.vendor.idvendor);
            this.$router.push({
                path: "/edit-vendor/" + this.vendor.idvendor
            });
        },
        addButton() {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            router.push(`/new-admin-vendor/${this.vendor.idvendor}`)
        },
        resendActivation() {
            let obj = {
                page: '/vendor',
                id: this.payload.idvendor
            }
            this.$store.commit(mutation.BUTTON_STATUS, true)
            this.$store.dispatch(action.RESEND_LINK_ACTIVATION, obj)
        },
        editAdmin(e) {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            this.$store.commit(mutation.SET_DATA_ADMIN_VEND, e);
            this.$store.dispatch(action.DATA_ID_VENDOR, this.vendor.idvendor);
            this.$router.push({
                path: "/edit-admin-vendor/" + this.vendor.idvendor
            });
        },
        async suspend() {
            const {
                value: reason
            } = await Swal.fire({
                title: 'Enter the reason of suspending',
                input: 'text',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, suspend it!',
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!'
                    }
                }
            })
            if (reason) {
                this.payload.reason_suspend = reason;
                this.$store.commit(mutation.BUTTON_STATUS, true)
                this.$store.dispatch(action.SUSPEND_VENDOR, this.payload)
            }
        },
        activeButton() {
            Swal.fire({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, activate it!"
            }).then(result => {
                if (result.value) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.ACTIVATE_VENDOR, this.vendor.idvendor);
                }
            });
        },
    },
    computed: {
        ...mapGetters({
            vendor: getter.VENDOR,
            button: getter.GET_BUTTON,
        })
    },
    created() {
        this.payload.idvendor = this.vendor.idvendor;
        for (let i = 0; i < this.vendor.admins.length; i++) {
            if (this.vendor.admins[i].status === 2 || this.vendor.status === 2) {
                this.adminVendorStatus = true;
                this.offsetV = 15
            } else {
                this.adminVendorStatus = false;
                this.offsetV = 19
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.card-base {
    padding: 20px;
}

.el-row {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    padding: 0px 10px;
    margin-bottom: 10px;

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

// .el-date-picker {
//     width: 100px;
// }
</style>
