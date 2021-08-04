<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="20" style="margin-top: 10px">
            <el-col :offset="1" style="margin-top: 40px" :span="8">
                <div class="thumbnail">
                    <img class="potrait" :src="profilepicture" @error="imgAlt" />
                </div>
            </el-col>
            <el-col :span="1">
                <hr width="1" size="350" style="background-color: #b8babe; border: none;">
            </el-col>
            <el-col style="margin-top: 30px" :span="12">
                <div class="thumbnail2">
                    <img class="potrait2" :src="additionalimage" />
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 20px">
            <el-col :span="8">
                <h3>Employee Name</h3>
                {{employee.name }}
                <h3>Employee Email</h3>
                {{employee.email }}
                <h3>Employee Phone Number</h3>
                {{employee.phonenumber}}
            </el-col>
            <el-col :span="8">
                <h3>Employee Gender</h3>
                {{(employee.gender == 1) ? 'Male' : 'Female'}}
                <h3>Employee Birth Date</h3>
                {{employee.birthdate}}
                <h3>Employee NIK</h3>
                {{employee.nik }}
            </el-col>
            <el-col :span="8">
                <h3>Employee Type</h3>
                {{employee.employee_position.job_name}}
                <h3>Employee Address</h3>
                {{employee.address }}
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px">
            <el-col :span="3">
                <el-button @click="backButton">Back</el-button>
            </el-col>
            <el-col :span="4">
                <el-button @click="editButton" type="primary">Edit</el-button>
            </el-col>
            <div v-if="employee.status === 1 ">
                <el-col :offset="13" :span="4">
                    <el-button :loading="button" type="danger" @click="suspendButton">Suspend</el-button>
                </el-col>
            </div>
            <div v-else-if="employee.status === 3">
                <el-col :offset="9" :span="4">
                    <el-button :loading="button" @click="deleteB" type="danger">Delete</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button :loading="button" @click="activeButton" type="success">Activate</el-button>
                </el-col>
            </div>
        </el-row>
    </div>
    <div v-if="employee.is_first_login === 1">
        <el-button style="width: auto" :loading="resendPinButton" class="topright" type="warning" @click="resendPIN">Resend PIN</el-button>
    </div>
    <div v-if="employee.status === 1 ">
        <el-button v-if="buttonTrack" style="width: auto" class="topleft" type="info" @click="trackEmployee">Track Employee</el-button>
    </div>
</div>
</template>

<script>
import router from "../../../router";
import {
    mapGetters,
    mapMutations
} from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from "../../../store/mutation-types";
import Swal from "sweetalert2";

export default {
    data() {
        return {
            buttonTrack: false,
            payload: {
                reason_suspend: "",
                users_id: null
            },
            alt: require("@/assets/images/avatar-2.jpg"),
            alt2: require("@/assets/images/Oper_Logo_Landscape.png")
        };
    },
    computed: {
        ...mapGetters({
            employee: getter.GET_DETAIL_EMPLOYEE,
            button: getter.GET_BUTTON,
            resendPinButton: getter.GET_BUTTON_RESEND_PIN
        }),
        profilepicture() {
            if (this.employee.profile_picture == null) {
                return this.alt;
            } else {
                return this.employee.profile_picture;
            }
        },
        additionalimage() {
            if (this.employee.profil_picture_2 == null || this.employee.profil_picture_2 == "" ) {
                return this.alt2;
            } else {
                return this.employee.profil_picture_2;
            }
        },
        offsetSize() {
            if (this.employee.is_first_login === 1) {
                return 1;
            } else {
                return 16;
            }
        }
    },
    methods: {
        ...mapMutations({
            type: mutation.TRACKING_TYPE,
            id: mutation.ID_ORDER,
            pathType: mutation.SET_PATH
        }),
        deleteB() {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(result => {
                if (result.value) {
                    this.$store.commit(mutation.BUTTON_STATUS, true);
                    this.$store.dispatch(action.DELETE_EMPLOYEE, this.employee.users_id);
                }
            });
        },
        resendPIN() {
            let obj = {
                pin_type: "/employee/resend-pin",
                id: this.employee.users_id
            };
            this.$store.commit(mutation.SET_RESEND_PIN_BUTTON, true);
            this.$store.dispatch(action.RESEND_PIN, obj);
        },
        activeButton() {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, activate it!"
            }).then(result => {
                if (result.value) {
                    this.$store.commit(mutation.BUTTON_STATUS, true);
                    this.$store.dispatch(
                        action.ACTIVATE_EMPLOYEE,
                        this.employee.users_id
                    );
                }
            });
        },
        trackEmployee() {
            this.type("task?idorder=");
            this.id(this.employee.id);
            this.pathType(this.$route.path);
            router.replace("/order/tracking");
        },
        async suspendButton() {
            const {
                value: reason
            } = await Swal.fire({
                title: "Enter the reason of suspending",
                input: "text",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, suspend it!",
                inputValidator: value => {
                    if (!value) {
                        return "You need to write something!";
                    }
                }
            });
            if (reason) {
                this.$store.commit(mutation.BUTTON_STATUS, true);
                this.payload.reason_suspend = reason;
                this.payload.users_id = this.employee.users_id;
                this.$store.dispatch(action.SUSPEND_EMPLOYEE, this.payload);
            }
        },
        editButton() {
            this.$store.commit(mutation.BUTTON_STATUS, false);
            this.$store.dispatch(action.DETAIL_EMPLOYEE, this.employee.id);
            router.push({
                path: `/edit-employee/` + this.employee.id
            });
        },
        backButton() {
            router.replace("/employee");
        },
        imgAlt(event) {
            event.target.src = this.alt;
        }
    },
    created() {
        this.buttonTrack = this.employee.is_on_task === 1;
    }
};
</script>

<style lang="scss" scoped>
.verticalLine {
    border-left: thick solid #ff0000;
}

.card-base {
    padding: 20px;
}

.el-button {
    width: 100%;
}

.el-row {
    padding: 0px 10px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-select {
    width: 100%;
}

.thumbnail {
    border-radius: 8px;
    position: relative;
    width: 263px;
    height: 300px;
    overflow: hidden;
}

.thumbnail img {
    border-radius: 8px;
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    width: auto;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.thumbnail img.portrait {
    width: 100%;
    height: auto;
}

.thumbnail2 {
    border-radius: 0px;
    position: relative;
    width: 500px;
    height: 300px;
    overflow: hidden;
}

.thumbnail2 img {
    border-radius: 0px;
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    width: auto;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.thumbnail2 img.portrait2 {
    width: 100%;
    height: auto;
}

.topright {
    position: absolute;
    top: 10px;
    right: 60px;
    font-size: 16px;
}

.disabled {
    pointer-events: none;
    cursor: not-allowed;
    -webkit-box-shadow: none;
    box-shadow: none;
}

.topleft {
    position: absolute;
    top: 10px;
    left: 60px;
    font-size: 16px;
}

.six {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
