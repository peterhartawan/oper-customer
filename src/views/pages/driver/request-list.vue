<template>
  <div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white" v-loading="loading">
      <el-row :gutter="20" type="flex" justify="end">
        <el-button @click="reqDriver" type="primary">
          Request Driver
        </el-button>
      </el-row>
      <el-row>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            type="index"
            align="center"
            label="NO"
            width="60"
          ></el-table-column>
          <el-table-column
            prop="place_id"
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
      totalData: null,
      currentPage: null,
      tableData: [
        {
          location: "",
          date: "",
          time: "",
          note: "",
          purpose_time: "",
        },
      ],
    };
  },
  components: {
    Affix,
  },
  methods: {
    Cancel() {
      this.$router.replace("/driver");
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
      this.$router.replace("/driver/request-driver");
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
  },
  async created() {
    await this.listData;
  },
  computed: {
    ...mapGetters({
      listData: getter.GET_LIST_REQ_DRIVER,
      error: getter.GET_ERROR,
      venID: getter.GET_VENDOR_PROFILE,
      button: getter.GET_BUTTON,
      loading: getter.GET_LOADING,
    }),
  },
  async mounted() {
    await this.$store.dispatch(action.LIST_REQ_DRIVER);
    this.$store.dispatch(action.VENDOR_PROFILE);
    this.tableData = this.listData.dataList;
    this.totalData = this.listData.total;
    this.currentPage = this.listData.fromPA;

    this.listData.dataList.forEach((el) => {
      el.date = moment(el.purpose_time).format("DD MMMM YYYY");
      el.time = moment(el.purpose_time).format("hh:mm");
    });
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
