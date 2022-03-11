<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :lg="12">
                    <el-form-item prop="job_name">
                        <el-input placeholder="Location Name" v-model="form.job_name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12">
                    <div v-if="showPrice === true">
                        <el-form-item prop="price">
                            <el-input placeholder="Price" v-model="form.price"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :lg="2">
                <el-button :loading="button" @click="onSubmit('form')" type="success">Save</el-button>
            </el-col>
            <el-col :lg="2">
                <el-button @click="Cancel()" type="succes">Cancel</el-button>
            </el-col>
            <el-col :offset="17" :lg="3">
                <el-button @click="deleteButton" type="danger">Delete</el-button>
            </el-col>
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
import * as mutation from '../../../store/mutation-types';
import Swal from "sweetalert2";
export default {
    name: "EditPosition",
    data() {
        return {
            form: {
                job_name: "",
                idemployee_position: "",
                price: "",
            },
            // payload: {
            //     identerprise: null,
            //     page: 1,
            // },
            rules: {
                job_name: [{
                    required: true,
                    message: "Job Name is required!",
                    trigger: "blur"
                }],
                price: [{
                    required: true,
                    message: "Price is required!",
                    trigger: "blur",

                }],
            }
        };
    },
    methods: {
        onSubmit(formName) {
            if (!this.form.price) {
                let obj = {
                    job_name: this.job_name,
                };
            } else {
                let obj = {
                    job_name: this.job_name,
                    price: this.price
                };
            }
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.UPDATE_POSITION, this.form);
                } else {
                    return false;
                }
            });
        },
        Cancel() {
            this.$store.dispatch(action.LIST_POSITION, {
                page: 1,
                status: this.status
            });
            this.$router.push({
                path: "/employee/list-position"
            });
        },
        deleteButton() {
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
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.DELETE_POSITION, this.form.idemployee_position);
                }
            });
        },
    },
    computed: {
        ...mapGetters({
            button: getter.GET_BUTTON,
            error: getter.GET_ERROR,
            position: getter.GET_DETAIL_POSITION,
            profile: getter.GET_DATA_PROFILE
        }),
        showPrice() {
            if (this.profile.vendor.show_employee_price === 1) {
                return true
            } else {
                return false
            }
        }
    },
    created() {
        this.form.job_name = this.position.job_name
        this.form.price = this.position.price
        this.form.idemployee_position = this.position.idemployee_position
    }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/_variables";

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

.el-radio {
    margin: 0 160px 0 10px;
}

.el-select {
    width: 100%;
}

.thumbnail {
    position: relative;
    width: 300px;
    height: 300px;
    overflow: hidden;
}

.thumbnail img {
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

a {
    border-style: dotted;
    border-radius: 15px;
    padding: 10px;
    height: 150px;
}

td {
    padding: 10px;
}
</style>
