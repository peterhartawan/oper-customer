<template>
  <div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white" v-loading="loading">
      <el-row
        type="flex"
        :gutter="10"
        justify="end"
        style="margin-top: 20px"
        v-if="this.idrole === 2"
      >
        <el-col :span="4">
          <el-input placeholder="Search" v-model="search"> </el-input>
        </el-col>
        <!-- <el-col :span="4">
          <el-input
            placeholder="Nama Enterprise"
            v-model="form.enterprise_name"
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="dropdown_location" placeholder="Pilih Lokasi">
            <el-option
              v-for="item in dropdown_location"
              :key="item.value"
              :label="item.name"
              :value="item.idplaces"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-date-picker
            format="dd MMM yyyy"
            value-format="dd MMM yyyy"
            style="width: 100%"
            v-model="form.date"
            type="date"
            placeholder="Tanggal"
          ></el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-time-picker
            v-model="form.time"
            type="time"
            placeholder="00:00"
            format="HH:mm"
            value-format="HH:mm"
            style="width: 100%"
          >
          </el-time-picker>
        </el-col>
        <el-col :span="3">
          <el-input placeholder="Jumlah" v-model="form.numbers_of_drivers">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="Note" v-model="form.note"> </el-input>
        </el-col>

        <el-col :span="1">
          <el-button
            icon="el-icon-search"
            @click="searchSquare"
            style="background: #d50000; font-size: 17px; color: white"
            square
          >
          </el-button>
        </el-col> -->
      </el-row>
      <el-row v-if="this.idrole === 5" :gutter="20" type="flex" justify="end">
        <el-button @click="reqDriver" type="primary">
          Request Driver
        </el-button>
      </el-row>
      <el-row>
        <el-table
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.enterprise.name
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                data.place.name.toLowerCase().includes(search.toLowerCase()) ||
                data.date.toLowerCase().includes(search.toLowerCase()) ||
                data.time.toLowerCase().includes(search.toLowerCase()) ||
                data.note.toLowerCase().includes(search.toLowerCase()) ||
                data.number_of_drivers.toString().includes(search.toLowerCase())
            )
          "
          @row-click="assignDrivers"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            align="center"
            label="NO"
            width="60"
          ></el-table-column>
          <el-table-column
            v-if="this.idrole === 2"
            prop="enterprise.name"
            align="center"
            label="ENTERPRISE"
          ></el-table-column>
          <el-table-column
            prop="place.name"
            align="center"
            label="LOKASI"
          ></el-table-column>
          <el-table-column
            prop="date"
            header-align="center"
            align="center"
            label="TANGGAL"
          ></el-table-column>
          <el-table-column
            prop="time"
            header-align="center"
            align="center"
            label="JAM"
          ></el-table-column>
          <el-table-column
            prop="number_of_drivers"
            header-align="center"
            align="center"
            label="JUMLAH"
          ></el-table-column>
          <el-table-column
            prop="note"
            header-align="center"
            align="center"
            label="NOTES"
          ></el-table-column>
        </el-table>
      </el-row>
      <el-row :gutter="20">
        <div align="right" style="margin-bottom: 10px">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page.sync="currentPage"
            @current-change="handlePageChange"
            :total="totalData"
          ></el-pagination>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import router from "../../../router";
import moment from "moment";
import Affix from "@/components/Affix";
import { mapGetters, mapActions } from "vuex";
import * as mutation from "../../../store/mutation-types";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
export default {
  name: "RequestList",
  data() {
    return {
      search: "",
      status: "",
      type: "",
      dropdown_location: "",
      totalData: null,
      currentPage: null,
      idrole: "",
      tableData: [],
      form: {},
    };
  },
  components: {
    Affix,
  },
  methods: {
    Cancel() {
      this.$router.push("/driver");
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    reqDriver() {
      this.$router.push("/driver/request-driver");
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.$store.commit(mutation.BUTTON_STATUS, true);
      this.$store.dispatch(action.LIST_DISPATCHER, {
        page: this.currentPage,
        dispathcer_search: input4,
        typedispatcher: this.type,
        status: this.status,
      });
    },
    findLocation(id) {
      this.list.forEach((element) => {});
    },
    formatTime() {
      this.form.purpose_time = moment(
        this.form.date + " " + this.form.time
      ).format("YYYY-MM-DD hh:mm:ss");
    },
    searchSquare() {
      formatTime();
      let obj = {
        page: this.currentPage,
        path: this.$route.path,
        enterprise_name: this.form.enterprise.name,
        place_name: this.form.place.name,
        purpose_time: this.form.purpose_time,
        number_of_drivers: this.form.number_of_drivers,
        idvendor: this.form.idvendor,
      };
      this.$store.dispatch(action.LIST_ORDER_CLIENT, obj);
    },
    async assignDrivers(row){
      let idrole = JSON.parse(localStorage.getItem('user')).idrole
      let requestDetails = [row];
      if (idrole === 2) {
        this.$store.commit(mutation.SET_REQUEST_DETAILS, requestDetails)
        this.$store.commit(mutation.SET_LOADING, true);
        await this.$store.dispatch(action.DATA_ID_CORP, row.enterprise_id)
        router.push('/assignee-driver/' + row.enterprise_id)
      }
    }
  },
  async created() {
    this.$store.commit(mutation.SET_LOADING, true);
    await this.listData;
    await this.profile;
    await this.dropdown_location;
  },
  computed: {
    ...mapGetters({
      listData: getter.GET_LIST_REQ_DRIVER,
      error: getter.GET_ERROR,
      venID: getter.GET_VENDOR_PROFILE,
      button: getter.GET_BUTTON,
      loading: getter.GET_LOADING,
      vendor: getter.VENDOR,
      profile: getter.GET_DATA_PROFILE,
    }),
  },
  async mounted() {
    this.dropdown_location = await this.$store.dispatch(
      action.DROPDOWN_LOCATION
    );
    await this.$store.dispatch(
      action.LIST_REQ_DRIVER,
      this.profile.idrole === 5 ? this.profile.enterprise.identerprise : ""
    );
    this.$store.dispatch(action.VENDOR_PROFILE);
    this.listData.dataList.forEach((el) => {
      el.date = moment(el.purpose_time).format("DD MMMM YYYY");
      el.time = moment(el.purpose_time).format("hh:mm");
    });
    this.tableData = this.listData.dataList;
    this.totalData = this.listData.total;
    this.currentPage = this.listData.fromPA;
    this.idrole = this.profile.idrole;
  },
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
