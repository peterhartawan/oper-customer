<template>
  <div class="page-table scrollable only-y" ref="topside" id="affix-container">
    <div class="card-base card-shadow--medium bg-white" v-loading="loading">
      <gmap-map
        :center="markDefault"
        :zoom="16"
        map-type-id="terrain"
        style="width: 100%; height: 500px"
      >
        <div v-if="mapMark">
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :icon="{ url: m.position.icon }"
            :position="m.position"
            :clickable="true"
            @click="openWindow(m.position)"
          ></gmap-marker>
          <gmap-info-window
            @closeclick="window_open = false"
            :opened="window_open"
            :position="infowindow"
            :options="{ pixelOffset: { width: 0, height: -35 } }"
          >
            {{ infowindow.name }}
          </gmap-info-window>
        </div>
        <div v-if="mapLine">
          <gmap-polyline
            :path="path"
            v-bind:options="{ strokeColor: '#BB0000' }"
          >
          </gmap-polyline>
        </div>
      </gmap-map>
      <el-row style="margin-top: 20px; margin-left: 3px" :gutter="20">
        <el-col :span="1">
          <p style="margin-top: 7px">Driver:</p>
        </el-col>
        <el-col :span="6">
          <el-select
            style="width: 100%; margin-left: 20px"
            v-model="userid"
            filterable
            placeholder="Driver Name"
          >
            <el-option label="All Drivers" value="0">All Drivers</el-option>
            <el-option
              v-for="item in dropDown"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="1">
          <p style="margin-top: 7px; margin-left: 15px">Time:</p>
        </el-col>
        <el-col :span="1">
          <el-radio
            style="margin-top: 10px; margin-left: 25px"
            v-model="radio"
            label="1"
            ><br
          /></el-radio>
        </el-col>
        <el-col :span="4">
          <el-select
            style="width: 100%; margin-left: 15px"
            v-model="month"
            placeholder="Select"
            @change="removeDate"
            :disabled="disableRadio1"
          >
            <el-option label="Today" selected value="99">Today</el-option>
            <el-option label="All Months" selected value="0"
              >All Months</el-option
            >
            <el-option label="January" selected value="1">January</el-option>
            <el-option label="February" value="2">February</el-option>
            <el-option label="March" value="3">March</el-option>
            <el-option label="April" value="4">April</el-option>
            <el-option label="May" value="5">May</el-option>
            <el-option label="June" value="6">June</el-option>
            <el-option label="July" value="7">July</el-option>
            <el-option label="August" value="8">August</el-option>
            <el-option label="September" value="9">September</el-option>
            <el-option label="October" value="10">October</el-option>
            <el-option label="November" value="11">November</el-option>
            <el-option label="December" value="12">December</el-option>
          </el-select>
        </el-col>
        <el-col :span="1">
          <el-radio
            style="margin-top: 10px; margin-left: 10px"
            v-model="radio"
            label="2"
          >
            <p><br /></p>
          </el-radio>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            style="width: 100%"
            value-format="yyyy-MM-dd"
            :disabled="disableRadio2"
            @change="removeDate2"
            v-model="date"
            type="daterange"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="1">
          <el-button
            icon="el-icon-search"
            style="background: #d50000; font-size: 17px; color: white"
            :loading="button"
            @click="onFind"
            square
            size="small"
          ></el-button>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-table :data="tableData" style="width: 100%" @row-click="getId">
            <el-table-column
              type="index"
              :index="indexMethod"
              align="center"
              label="NO"
              width="60"
            ></el-table-column>
            <el-table-column align="center" width="100" label="PHOTO">
              <template slot-scope="scope">
                <img
                  style="width: 35px; height: 35px; border-radius: 50%"
                  :src="scope.row.profile_picture"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="DRIVER INFO"
            ></el-table-column>
            <div v-if="isAdminVendor">
              <el-table-column
                prop="nama_enterprise"
                align="center"
                label="ENTERPRISE"
              ></el-table-column>
            </div>
            <el-table-column
              prop="clock_in"
              header-align="center"
              label="CHECK IN"
            ></el-table-column>
            <el-table-column
              prop="clock_out"
              header-align="center"
              label="CHECK OUT"
            ></el-table-column>
            <el-table-column
              prop="remark"
              header-align="center"
              label="MESSAGE"
            ></el-table-column>
            <el-table-column align="center" label="">
              <template slot-scope="scope">
                <img
                  style="width: 35px; height: 35px"
                  @click="Dialog(scope.row.image_url, $event)"
                  :src="scope.row.image_url"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div v-if="date || month == 99">
        <el-col :span="3">
          <el-button
            style="
              width: 100%;
              margin-left: 30px;
              margin-bottom: 5px;
              background-color: #d50000;
            "
            :loading="button"
            type="danger"
            @click="exportExcel"
          >
            Export
          </el-button>
        </el-col>
      </div>
      <div align="right" style="margin-bottom: 10px">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page.sync="currentPage"
          @current-change="handlePageChange"
          :total="totalData"
        ></el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="25%">
      <center>
        <div v-if="image_url">
          <img style="max-width: 250px; max-height: 250px" :src="image_url" />
        </div>
      </center>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import Affix from "@/components/Affix";
import { mapGetters, mapActions } from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from "../../../store/mutation-types";
import swal from "sweetalert2";

export default {
  name: "Attendance",
  data() {
    return {
      dialogVisible: false,
      currentPage: 1,
      input: "",
      affixEnabled: true,
      indexT: "",
      userid: null,
      date: null,
      radio: null,
      month: null,
      tableData: null,
      totalData: null,
      mapMark: null,
      markers: [],
      mapLine: null,
      path: [],
      markDefault: {
        lat: -6.21462,
        lng: 106.84513,
      },
      resultTrack: null,
      image_url: null,
      info_marker: null,
      infowindow: {
        lat: 0,
        lng: 0,
        name: null,
      },
      orangeIcon: require("@/assets/images/orange-dot.png"),
      redIcon: require("@/assets/images/red-dot.png"),
      blueDot: require("@/assets/images/blue-dot.png"),
      window_open: false,
      isAdminVendor: false
    };
  },
  components: {
    Affix,
  },
  computed: {
    ...mapGetters({
      listData: getter.GET_LIST_ATT,
      paginate: getter.GET_PAGINATE_ATT,
      dropDown: getter.GET_DROPDOWN_DRIVER,
      filterAttendance: getter.GET_FILTER_ATT,
      attTotal: getter.GET_ATT_TOTAL,
      filterTotal: getter.GET_FILTER_TOTAL,
      button: getter.GET_BUTTON,
      loading: getter.GET_LOADING,
      attendance: getter.GET_TRACKING_ATTENDANCE,
    }),
    paginator() {
      return this.paginate;
    },
    indexTam() {
      return this.indexT;
    },
    disableRadio1() {
      if (this.radio == 2) {
        return true;
      } else if (this.radio == 1) {
        return false;
      } else {
        return true;
      }
    },
    disableRadio2() {
      if (this.radio == 1) {
        return true;
      } else if (this.radio == 2) {
        return false;
      } else {
        return true;
      }
    },
    dateExport() {
      if (this.date) {
        const foo = {
          startdate: this.date[0],
          duedate: this.date[1],
        };
        return foo;
      } else if (this.month == 99) {
        const foo = {
          startdate: this.forToday,
          duedate: this.forToday,
        };
        return foo;
      } else {
        return null;
      }
    },
    forToday() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;
      return today;
    },
  },
  async mounted() {
    await this.$store.commit(mutation.BUTTON_STATUS, false);
    await this.$store.commit(mutation.SET_LOADING, true);
    await this.$store.dispatch(action.LIST_ATT_DRIVER, this.currentPage);
    this.tableData = this.listData;
    console.log("listData ", this.listData);
    this.totalData = this.attTotal;
    this.$store.dispatch(action.DROPDOWN_DRIVER);
  },
  methods: {
    removeDate2() {
      this.month = null;
    },
    removeDate() {
      this.date = null;
    },
    openWindow(position) {
      this.window_open = true;
      this.infowindow.lat = position.lat;
      this.infowindow.lng = position.lng;
      this.infowindow.name = position.name;
    },
    Dialog(foo, e) {
      e.stopPropagation();
      this.image_url = foo;
      this.dialogVisible = true;
    },
    async exportExcel() {
      let data = "";
      if (this.dateExport == null) {
        swal("Please select a start date", "", "error");
      } else {
        if (this.userid) {
          let obj = {
            date: this.dateExport,
            path: "driver",
            userid: this.userid,
          };
          this.$store.commit(mutation.BUTTON_STATUS, true);
          data = await this.$store.dispatch(action.EXPORT_ATTENDANCE, obj);
          let firstD = data.slice(1);
          let secondD = firstD.slice(0, firstD.length - 1);
          window.open(secondD);
        } else if ((this.userid == null) | (this.userid == 0)) {
          let obj = {
            date: this.dateExport,
            path: "driver",
            userid: null,
          };
          this.$store.commit(mutation.BUTTON_STATUS, true);
          data = await this.$store.dispatch(action.EXPORT_ATTENDANCE, obj);
          let firstD = data.slice(1);
          let secondD = firstD.slice(0, firstD.length - 1);
          window.open(secondD);
        }
      }
    },
    async onFind() {
      if (this.userid == null) {
        this.currentPage = 1;
        await this.$store.commit(mutation.BUTTON_STATUS, true);
        await this.$store.dispatch(action.FILTER_DRIVER, {
          radio: this.radio,
          iduser: 0,
          today: this.forToday,
          idmonth: this.month,
          startdate: this.date ? this.date[0] : null,
          duedate: this.date ? this.date[1] : null,
          page: 1,
        });
      } else {
        this.currentPage = 1;
        await this.$store.commit(mutation.BUTTON_STATUS, true);
        await this.$store.dispatch(action.FILTER_DRIVER, {
          radio: this.radio,
          iduser: this.userid,
          today: this.forToday,
          idmonth: this.month,
          startdate: this.date ? this.date[0] : null,
          duedate: this.date ? this.date[1] : null,
          page: 1,
        });
      }
      this.tableData = this.filterAttendance;
      this.totalData = this.filterTotal;
      this.markers = [];
      this.path = [];
      this.window_open = false;
      for (var i = 0; i < this.tableData.length; i++) {
        const marker = {
          lat: parseFloat(this.tableData[i].clock_in_latitude),
          lng: parseFloat(this.tableData[i].clock_in_longitude),
          name:
            this.tableData[i].name +
            ", " +
            this.tableData[i].clock_in +
            " (CLOCK IN)",
          icon: this.redIcon,
        };
        this.markDefault.lat = parseFloat(this.tableData[i].clock_in_latitude);
        this.markDefault.lng = parseFloat(this.tableData[i].clock_in_longitude);
        this.markers.push({
          position: marker,
        });
        this.mapMark = 1;
      }
      for (var i = 0; i < this.tableData.length; i++) {
        const marker = {
          lat: parseFloat(this.tableData[i].clock_out_latitude),
          lng: parseFloat(this.tableData[i].clock_out_longitude),
          name:
            this.tableData[i].name +
            ", " +
            this.tableData[i].clock_out +
            " (CLOCK OUT)",
          icon: this.orangeIcon,
        };
        this.markers.push({
          position: marker,
        });
      }
    },
    async handlePageChange(currentpage) {
      this.currentPage = currentpage;
      if (this.userid == null) {
        await this.$store.commit(mutation.SET_LOADING, true);
        await this.$store.dispatch(action.FILTER_DRIVER, {
          radio: this.radio,
          iduser: 0,
          idmonth: this.month,
          today: this.forToday,
          startdate: this.date ? this.date[0] : null,
          duedate: this.date ? this.date[1] : null,
          page: this.currentPage,
        });
      } else {
        await this.$store.commit(mutation.SET_LOADING, true);
        await this.$store.dispatch(action.FILTER_DRIVER, {
          radio: this.radio,
          iduser: this.userid,
          idmonth: this.month,
          today: this.forToday,
          startdate: this.date ? this.date[0] : null,
          duedate: this.date ? this.date[1] : null,
          page: this.currentPage,
        });
      }
      this.tableData = this.filterAttendance;
      this.totalData = this.filterTotal;
      this.markers = [];
      this.path = [];
      this.window_open = false;
      for (var i = 0; i < this.tableData.length; i++) {
        const marker = {
          lat: parseFloat(this.tableData[i].clock_in_latitude),
          lng: parseFloat(this.tableData[i].clock_in_longitude),
          name:
            this.tableData[i].name +
            ", " +
            this.tableData[i].clock_in +
            " (CLOCK IN)",
          icon: this.redIcon,
        };
        this.markDefault.lat = parseFloat(this.tableData[i].clock_in_latitude);
        this.markDefault.lng = parseFloat(this.tableData[i].clock_in_longitude);
        this.markers.push({
          position: marker,
        });
        this.mapMark = 1;
      }
      for (var i = 0; i < this.tableData.length; i++) {
        const marker = {
          lat: parseFloat(this.tableData[i].clock_out_latitude),
          lng: parseFloat(this.tableData[i].clock_out_longitude),
          name:
            this.tableData[i].name +
            ", " +
            this.tableData[i].clock_out +
            " (CLOCK OUT)",
          icon: this.orangeIcon,
        };
        this.markers.push({
          position: marker,
        });
      }
    },
    async getId(id) {
      await this.$store.commit(mutation.SET_LOADING, true);
      await this.$store.dispatch(action.TRACKING_ATTENDANCE, id.id);
      await this.attendance;
      if (this.attendance.length == 0) {
        swal("This user does not have any tracking yet", "", "");
      } else {
        this.markers = [];
        this.path = [];
        this.window_open = false;
        for (var i = 0; i < this.attendance.length; i++) {
          const marker = {
            lat: parseFloat(this.attendance[i].latitude),
            lng: parseFloat(this.attendance[i].longitude),
            name: id.name + ", " + this.attendance[i].created_at,
            icon: this.blueDot,
          };
          this.markDefault.lat = parseFloat(this.attendance[i].latitude);
          this.markDefault.lng = parseFloat(this.attendance[i].longitude);
          this.markers.push({
            position: marker,
          });
          this.path.push({
            lat: parseFloat(this.attendance[i].latitude),
            lng: parseFloat(this.attendance[i].longitude),
          });
          this.mapLine = 1;
          this.mapMark = 1;
        }
      }
      var self = this;
      setTimeout(function () {
        self.$refs.topside.scrollTop = 0;
      }, 900);
    },
    indexMethod(index) {
      return index + this.paginator.fromP;
    },
  },
  async created() {
    this.isAdminVendor = JSON.parse(localStorage.getItem('user')).idrole == 2
    await this.$store.dispatch(action.LIST_ATT_DRIVER, this.currentPage);
    await this.listData;
    this.markers = [];
    this.path = [];
    this.window_open = false;
    for (var i = 0; i < this.listData.length; i++) {
      const marker = {
        lat: parseFloat(this.listData[i].clock_in_latitude),
        lng: parseFloat(this.listData[i].clock_in_longitude),
        name:
          this.listData[i].name +
          ", " +
          this.listData[i].clock_in +
          " (CLOCK IN)",
        icon: this.redIcon,
      };
      this.markDefault.lat = parseFloat(this.listData[i].clock_in_latitude);
      this.markDefault.lng = parseFloat(this.listData[i].clock_in_longitude);
      this.markers.push({
        position: marker,
      });
      this.mapMark = 1;
    }
    for (var i = 0; i < this.listData.length; i++) {
      const marker = {
        lat: parseFloat(this.listData[i].clock_out_latitude),
        lng: parseFloat(this.listData[i].clock_out_longitude),
        name:
          this.listData[i].name +
          ", " +
          this.listData[i].clock_out +
          " (CLOCK OUT)",
        icon: this.orangeIcon,
      };
      this.markers.push({
        position: marker,
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  padding: 0px 10px;
  margin-bottom: 20px;

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

#map {
  height: 100%;
}
</style>
