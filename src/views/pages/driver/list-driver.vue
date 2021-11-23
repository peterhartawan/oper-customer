<template>
  <div class="page-table scrollable only-y" id="affix-container">
    <div class="container mb-200">
      <p class="font-weight-600" v-if="user.idrole === 2">ACCOUNT</p>
      <el-row :gutter="50" v-if="user.idrole === 2">
        <el-col :span="19" v-if="driverAcc !== null">
          <el-card shadow="always" :body-style="{padding: '5px'}" class="card-border">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="line">
                  <p class="pb-20 font-weight-600 mt-8">TOTAL DRIVER</p>
                  <span class="font-size-44 font-weight-600">{{driverAcc.total_driver}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="line">
                  <p class="pb-20 font-weight-600 mt-8">ACTIVE ACCOUNT</p>
                  <span class="font-size-44 font-weight-600">{{driverAcc.total_driver_active}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="text-center">
                  <p class="pb-20 font-weight-600 mt-8">SUSPENDED ACCOUNT</p>
                  <span class="font-size-44 font-weight-600">{{driverAcc.total_driver_suspend}}</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-button @click="Create()" shadow="always" :body-style="{padding: '10px'}" class="card-border plus-bg text-center">
            <i class="mdi mdi-plus font-size-60 font-weight-500 white-text"></i>
            <span class="text-p">Add New</span>
            <span class="text-p">Driver</span>
          </el-button>
        </el-col>
      </el-row>

      <p class="font-weight-600 mt-40">INFO</p>
      <el-row class="mt-20">
        <el-card shadow="always" class="card-border">
            <el-row :gutter="20">
                <el-col :span="12" class="line-not-center">
                    <div class="avatar2 align-vertical text-center">
                        <img :src="form.photo" class="align-vertical-middle" alt="user avatar" @error="imgAlt" >
                        <h1 class="name-of">{{ form.name }}</h1>
                        <span>{{ form.status }}</span>
                    </div>
                    <el-row type="flex" justify="center" :gutter="20">
                        <el-col :span="9">
                            <div style="overflow-wrap: break-word">
                                <dl>
                                    <dt>NIK</dt>
                                    <dd>{{form.nik}}</dd>

                                    <dt>PHONE</dt>
                                    <dd>{{form.phone}}</dd>

                                    <dt>EMAIL</dt>
                                    <dd>{{form.email}}</dd>

                                    <dt>DRIVER TYPE</dt>
                                    <dd>{{ form.driver_type }}</dd>
                                </dl>
                            </div>
                        </el-col>
                        <el-col :span="9">
                            <div>
                                <dl>
                                    <dt>GENDER</dt>
                                    <dd>{{form.gender}}</dd>

                                    <dt>ADDRESS</dt>
                                    <dd>{{form.address}}</dd>

                                    <dt>BIRTHDAY</dt>
                                    <dd>{{form.birthdate}}</dd>
                                </dl>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row type="flex"  justify="center" class="mt-10" v-if="user.idrole == 2">
                        <el-col :span="6"><el-button @click="editButton()" type="info" size="small" class="small-edit">Edit</el-button></el-col>
                        <el-col :span="spanPIN">
                            <el-button
                                    type="danger"
                                    size="small"
                                    :loading="buttonSuspend"
                                    @click="suspendButton"
                                    v-if="status === 1">
                                Suspend
                            </el-button>
                            <el-button
                                    type="success"
                                    size="small"
                                    :loading="buttonResendPIN"
                                    @click="resendPIN"
                                    v-if="form.first_login === 1 && status === 1">
                                Resend PIN
                            </el-button>
                            <el-button
                                    type="danger"
                                    size="small"
                                    :loading="buttonDelete"
                                    @click="deleteB"
                                    v-if="status === 3">
                                Delete
                            </el-button>
                            <el-button
                                    type="primary"
                                    size="small"
                                    :loading="buttonActive"
                                    @click="activeButton"
                                    v-if="status === 3">
                                Active
                            </el-button>
                        </el-col>
                    </el-row>
                </el-col>

                <el-col :span="12">
                    <el-row type="flex"  justify="center" :gutter="20" class="mt-10">
                        <el-col :span="10">
                            <el-input
                                    size="mini"
                                    placeholder="Search"
                                    @keyup.native="searchChange"
                                    v-model="input4">
                                <i slot="suffix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </el-col>

                        <el-col :span="6">
                            <el-select @change="filterStatus" v-model="status" filterable size="mini" placeholder="All Status">
                                <el-option
                                        v-for="item in select"
                                        :key="item.status"
                                        :label="item.name"
                                        :value="item.status">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>

                    <div class="contacts-list box grow scrollable only-y" v-loading="loading">
                        <el-row>
                            <div v-for="c in listData" :key="c.id" class="flex contact" @click="openDialog(c)">
                                <div class="avatar align-vertical el-col el-col-4">
                                    <img :src="c.profile_picture" class="align-vertical-middle" alt="user avatar" @error="imgAlt">
                                </div>
                                <div class="info box grow flex el-col el-col-20">
                                    <div class="name box grow flex column justify-center p-10 scrollable only-x">
                                        <div class="fullname fs-18"><strong>{{c.name}}</strong></div>
                                        <div class="phone fs-14 secondary-text">{{c.phonenumber}}</div>
                                        <div class="email fs-14 secondary-text">{{c.email}}</div>
                                    </div>
                                    <div class="phone align-vertical p-10 green" v-if="c.status === 1"><span class="align-vertical-middle font-weight-600">ACTIVE</span></div>
                                    <div class="phone align-vertical p-10" v-if="c.status === 2"><span class="align-vertical-middle font-weight-600">IN ACTIVE</span></div>
                                    <div class="phone align-vertical p-10 red" v-if="c.status === 3"><span class="align-vertical-middle font-weight-600">SUSPANDED</span></div>
                                </div>
                            </div>
                        </el-row>
                        <div class="grid-content">
                            <el-pagination
                                    background
                                    layout="prev, pager, next"
                                    @current-change="handlePageChange"
                                    :total="forTotal"
                            ></el-pagination>
                        </div>
                    </div>
                </el-col>

            </el-row>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
    import Affix from "@/components/Affix";
    import { mapGetters } from "vuex";
    import * as getter from "../../../store/getters-types";
    import * as action from "../../../store/action-types";
    import * as mutation from '../../../store/mutation-types';
    import Swal from 'sweetalert2'

export default {
  name: "ListDriver",
  data() {
    return {
      user          : JSON.parse(localStorage.getItem('user')),
      currentPage   : 1,
      input         : "",
      affixEnabled  : true,
      indexT        : 1,
      vendorId      : null,
      input4        : '',
      status        : 1,
      spanPIN       : 8,
      form: {
            name: '',
            status: '',
            nik: '',
            phone: '',
            email: '',
            driver_type: '',
            gender: '',
            address: '',
            birthdate: '',
            photo: '',
            id: '',
            first_login: '',
      },
      payload: {
          reason_suspend: "",
          users_id: null,
          iddriver: ''
      },
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
        };
      },
      components: {
        Affix
      },
      computed: {
        ...mapGetters({
            listData        : getter.GET_LIST_DRIVER,
            paginate        : getter.GET_PAGINATE_DRIVER,
            totalDriver     : getter.GET_DRIVER_TOTAL,
            dropDown        : getter.GET_DROPDOWN_DRIVER,
            driverAcc       : getter.GET_TOTAL_ACCOUNT_DRIVER,
            loading         : getter.GET_BUTTON,
            buttonDelete    : getter.GET_BUTTON_DELETE,
            buttonResendPIN : getter.GET_BUTTON_RESEND_PIN,
            buttonActive    : getter.GET_BUTTON_ACTIVE,
            buttonSuspend   : getter.GET_BUTTON_SUSPEND,
            buttonEdit      : getter.GET_BUTTON_EDIT
        }),
        paginator() {
          return this.paginate;
        },
        indexTam() {
          return this.indexT;
        },
        forTotal() {
          if (this.listData) {
            return this.totalDriver;
          }
        }
      },

  async created() {
      await this.$store.dispatch(action.TOTAL_ACCOUNT_DRIVER);
      this.$store.commit(mutation.BUTTON_STATUS, true);
      this.dataBeforeCreated()
  },

  methods: {
      async searchChange(v){
          let trimName = this.input4.trim();
          this.$store.commit(mutation.BUTTON_STATUS, true);
          await this.$store.dispatch(action.LIST_DATA_DRIVER, {
              page: 1,
              typedispatcher    : this.type,
              q                 : trimName,
              status            : this.status
          });
          this.firstData()
      },
      async handlePageChange(page) {
        this.currentPage = page;
        await this.$store.dispatch(action.LIST_DATA_DRIVER, {
            page    : this.currentPage,
            q       : this.input4,
            status  : this.status});
        this.firstData();
      },
      Create() {
        this.$store.commit(mutation.BUTTON_STATUS, false);
        this.$router.push({
            name: "NewDriver"

        });
      },
      async filterStatus(status){
          this.$store.commit(mutation.BUTTON_STATUS, true);
          this.status = status;
          await this.$store.dispatch(action.LIST_DATA_DRIVER, {
             page    : 1,
             q       : this.input4,
             status  : this.status});
          this.firstData();
        },
      openDialog(data){
          this.form.name        = data.name;
          this.form.status      = (data.status === 1) ? 'ACTIVE' : (data.status === 2) ? 'INACTIVE' : 'SUSPENDED'
          this.form.nik         = data.nik;
          this.form.phone       = data.phonenumber;
          this.form.photo       = data.profile_picture;
          this.form.email       = data.email;
          this.form.driver_type = data.drivertype.name;
          this.form.gender      = (data.gender === 1) ? 'Male' : 'Female';
          this.form.address     = data.address;
          this.form.birthdate   = data.birthdate;
          this.form.id          = data.id;
          this.payload.iddriver = data.iddriver;
          this.form.first_login = data.is_first_login;
          (this.form.first_login === 1) ? this.spanPIN = 10 : this.spanPIN = 8;
      },
      getId(id) {
         this.$store.dispatch(action.DATA_ID_DRIVER, id.users_id);
      },
      imgAlt(event) {
        event.target.src = require("../../../assets/images/avatar-2.jpg");
      },
      resendPIN() {
          let obj = {
              pin_type: '/driver/resend-pin',
              id: this.form.id
          };
          this.$store.commit(mutation.SET_RESEND_PIN_BUTTON, true);
          this.$store.dispatch(action.RESEND_PIN, obj)
      },
      editButton(){
          this.$store.commit(mutation.BUTTON_STATUS, false);
          this.$store.dispatch(action.EDIT_DRIVER, this.form.id);
      },
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
                  this.payload.users_id = this.form.id;
                  this.$store.commit(mutation.SET_BUTTON_DELETE, true);
                  this.$store.dispatch(action.DELETE_DRIVER, this.payload);
                  this.dataBeforeCreated();
              }
          });
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
          }).then(async result => {
              if (result.value) {
                  this.payload.users_id = this.form.id;
                  this.$store.commit(mutation.SET_BUTTON_ACTIVE, true);
                  this.$store.commit(mutation.BUTTON_STATUS, true);
                  await this.$store.dispatch(action.ACTIVATE_DRIVER, this.payload);
                  this.dataBeforeCreated();
              }
             
          });
      },
      async suspendButton() {
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
          });
          if (reason) {
              // this.$store.commit(mutation.BUTTON_STATUS, true);
              this.payload.reason_suspend = reason;
              this.payload.users_id = this.form.id;
              this.$store.commit(mutation.SET_BUTTON_SUSPEND, true);
              await this.$store.dispatch(action.SUSPEND_DRIVER, this.payload)
              this.dataBeforeCreated();
          }
      },
      firstData(){
          if(this.listData.length > 0){
              let data              = this.listData[0];
              this.form.name        = data.name;
              this.form.status      = (data.status === 1) ? 'ACTIVE' : (data.status === 2) ? 'INACTIVE' : 'SUSPENDED'
              this.form.nik         = data.nik;
              this.form.phone       = data.phonenumber;
              this.form.photo       = data.profile_picture;
              this.form.email       = data.email;
              this.form.driver_type = data.drivertype.name;
              this.form.gender      = (data.gender === 1) ? 'Male' : 'Female';
              this.form.address     = data.address;
              this.form.birthdate   = data.birthdate;
              this.form.id          = data.id;
              this.payload.iddriver = data.iddriver;
              this.form.first_login = data.is_first_login;
              (this.form.first_login === 1) ? this.spanPIN = 10 : this.spanPIN = 8;
          }
      },
      async dataBeforeCreated(){
          await this.$store.dispatch(action.LIST_DATA_DRIVER, {
              page  : this.currentPage,
              q     : this.input4,
              status: this.status});
          this.firstData()
      }
    }
};
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/_variables";
    .card-border {
        border-radius: 11px;
    }
    .line-not-center {
        border-right: 1px solid $text-color-info;
    }
    .line {
        border-right: 1px solid $text-color-info;
        text-align: center;
    }
    .text-p {
        display: block;
        color: white;
        font-weight: 600;
    }
    .plus-bg {
        background-color: #a31424;
        height: 139px;

    }
    .avatar {
        img {
            border: 1px solid transparentize($text-color, .9);
            box-sizing: border-box;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            transition: all .5s .25s;
        }
    }
    .avatar2 {
        img {
            border: 1px solid transparentize($text-color, .9);
            box-sizing: border-box;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            transition: all .5s .25s;
        }
    }
    .name-of {
        margin-bottom: 10px;
        color: #a31424;
    }
    .contacts-list {
        //margin: 0 auto;
        height: 500px;
        width: 100%;
        max-width: 965px;
        padding: 0px 30px;
        box-sizing: border-box;
        .contact {
            margin: 10px 0;
            padding: 5px;
            box-sizing: border-box;
            cursor: pointer;
            border-bottom: 1px solid $text-color-info;
        }
    }
    .small-edit {
        width: 90px;
    }
    .green {
        color :green;
    }
    .red {
        color: red;
    }


    /*.card-base {*/
    /*padding: 20px;*/
    /*}*/

    /*.el-row {*/
    /*// display: flex;*/
    /*// align-items: center;*/
    /*// justify-content: center;*/
    /*padding: 0px 10px;*/
    /*margin-bottom: 20px;*/

    /*&:last-child {*/
        /*margin-bottom: 0;*/
    /*}*/
    /*}*/

    /*.el-col {*/
    /*border-radius: 5px;*/
    /*}*/

    /*.el-select {*/
    /*width: 100%;*/
    /*}*/
</style>
