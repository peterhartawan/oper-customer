<template>
	<el-menu 
		:default-active.sync="activeLink" 
		:mode="mode" 
		@select="goto" 
		:collapse="isCollapse" 
		:unique-opened="true"
		background-color="transparent"
		class="main-navigation-menu"
		:class="{'nav-collapsed':isCollapse}">
		
		<div class="el-menu-item-group__title" style="padding-top: 4px;">
			<!--<span>Menu</span>-->
		</div>
		<span v-for="pure in pureParent" :key="pure.idmenu">
			<el-submenu v-if="pure.submenu.length" :index="pure.idmenu.toString()" popper-class="main-navigation-submenu">
				<template slot="title">
					<!--{{pure.icon}}-->
					<img v-if="pure.icon !== null" :src=" require( `@/assets/oper_asset/${pure.icon}.png`)" class="icon-home">
					<img v-else src="../assets/oper_asset/employee.png" class="icon-home">
					<span>{{ pure.name }}</span>
				</template>
				<el-menu-item v-for="sub in pure.submenu" :key="sub.idmenu" :index="sub.slug">
					<span slot="title">{{ sub.name }}</span>
				</el-menu-item>
			</el-submenu>

			<el-menu-item v-else :index="pure.slug">
				<!--{{imageNav}}-->
				<!--<img :src="../assets/oper_asset/driver.png" class="icon-home">-->
				<img v-if="pure.icon !== null" :src=" require( `@/assets/oper_asset/${pure.icon}.png`)" class="icon-home">
				<img v-else src="../assets/oper_asset/employee.png" class="icon-home">
				<span slot="title">{{pure.name}}</span>
				<!--<i class="mdi mdi-gauge" style="color:red"></i><span slot="title">{{ pure.name }}</span>-->
			</el-menu-item>
		</span>
		<!-- <div class="el-menu-item-group__title" style="padding-top: 4px;"><span>Asset</span></div> -->
		<!-- <el-menu-item index="/dashboard">
			<i class="mdi mdi-gauge"></i><span slot="title">Dashboard</span>
		</el-menu-item> -->
		<!--<el-menu-item index="/calendar">-->
			<!--<i class="mdi mdi-calendar"></i><span slot="title">Calendar</span>-->
		<!--</el-menu-item>-->
		<!--<el-menu-item index="/contacts">-->
			<!--<i class="mdi mdi-account-multiple-outline"></i><span slot="title">Contacts</span>-->
		<!--</el-menu-item>-->
		<!--<el-menu-item index="/gallery">-->
			<!--<i class="mdi mdi-image-multiple"></i><span slot="title">Gallery</span>-->
		<!--</el-menu-item>-->
		<!--<el-menu-item index="/timeline">-->
			<!--<i class="mdi mdi-source-commit-local"></i><span slot="title">Timeline</span>-->
		<!--</el-menu-item>-->

		<!-- <div class="el-menu-item-group__title"><span>User interface</span></div> -->
		<!--<el-submenu index="layout" popper-class="main-navigation-submenu">-->
			<!--<template slot="title">-->
				<!--<i class="mdi mdi-view-quilt"></i><span>Layout</span>-->
			<!--</template>-->
			<!--<el-menu-item index="/layout/flexbox">-->
				<!--<span slot="title">Flexbox</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/layout/element-layout">-->
				<!--<span slot="title">Element</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/layout/blank">-->
				<!--<span slot="title">Blank page</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/layout/page-headers">-->
				<!--<span slot="title">Page headers</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/layout/sidebar-right">-->
				<!--<span slot="title">Sidebar right</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/layout/sidebar-left">-->
				<!--<span slot="title">Sidebar left</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/layout/tabbed">-->
				<!--<span slot="title">Tabbed page</span>-->
			<!--</el-menu-item>-->
		<!--</el-submenu>-->
		<!--<el-menu-item index="/themes">-->
			<!--<i class="mdi mdi-format-color-fill"></i><span slot="title">Themes</span>-->
		<!--</el-menu-item>-->
		<!--<el-submenu index="pure.idmenu" popper-class="main-navigation-submenu" v-for="pure in pureParent" :key="pure.idmenu" popper-append-to-body>-->

			<!--<template slot="title">-->
				<!--<i class="mdi mdi-view-quilt"></i><span>{{ pure.name }} {{ pure.idmenu }}</span>-->
			<!--</template>-->
			<!--<el-menu-item index="/404" v-for="untu in pure.submenu" :key="untu.idmenu">{{ untu.name }}  {{ untu.idmenu }}</el-menu-item>-->
			<!--<el-submenu index="1-4">-->
				<!--<template slot="title">free item</template>-->
				<!--<el-submenu index="1-4-1">-->
					<!--<template slot="title">item one (4.1)</template>-->
					<!--<el-menu-item index="1-4-1-1">item one (4.1.1)</el-menu-item>-->
				<!--</el-submenu>-->
				<!--<el-menu-item index="1-4-3">item three (4-3)</el-menu-item>-->
			<!--</el-submenu>-->
		<!--</el-submenu>-->

		<!--<el-submenu index="icons" popper-class="main-navigation-submenu">-->
		<!--<template slot="title">-->
		<!--<i class="mdi mdi-folder-image"></i><span>Icons</span>-->
		<!--</template>-->
				<!--<el-submenu index="1-4-2">-->
					<!--<template slot="title">item two (4.2)</template>-->
					<!--<el-menu-item index="1-4-2-1">item one (4.2.1)</el-menu-item>-->
				<!--</el-submenu>-->
			<!--<el-menu-item index="/icons/md-icons">-->
				<!--<span slot="title">MD Icons</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/icons/flag-icons">-->
				<!--<span slot="title">Flag Icons</span>-->
			<!--</el-menu-item>-->
		<!--</el-submenu>-->
		<!--<el-menu-item index="/multi-language">-->
			<!--<i class="mdi mdi-translate"></i><span slot="title">Multi language</span>-->
		<!--</el-menu-item>-->
		<!--<el-menu-item index="/typography">-->
			<!--<i class="mdi mdi-format-font"></i><span slot="title">Typography</span>-->
		<!--</el-menu-item>-->
		<!--<el-menu-item index="/helper-classes">-->
			<!--<i class="mdi mdi-help-circle-outline"></i><span slot="title">Helper Classes</span>-->
		<!--</el-menu-item>-->
		<!--<el-submenu index="element" popper-class="main-navigation-submenu limit-height">-->
			<!--<template slot="title">-->
				<!--<i class="mdi mdi-shape"></i><span>Element</span>-->
			<!--</template>-->
			<!--<el-menu-item index="/element/button">-->
				<!--<span slot="title">Button</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/radio">-->
				<!--<span slot="title">Radio</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/checkbox">-->
				<!--<span slot="title">Checkbox</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/input">-->
				<!--<span slot="title">Input</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/input-number">-->
				<!--<span slot="title">Input Number</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/select">-->
				<!--<span slot="title">Select</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/cascader">-->
				<!--<span slot="title">Cascader</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/switch">-->
				<!--<span slot="title">Switch</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/slider">-->
				<!--<span slot="title">Slider</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/time-picker">-->
				<!--<span slot="title">Time Picker</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/date-picker">-->
				<!--<span slot="title">Date Picker</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/datetime-picker">-->
				<!--<span slot="title">Date Time Picker</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/upload">-->
				<!--<span slot="title">Upload</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/rate">-->
				<!--<span slot="title">Rate</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/color-picker">-->
				<!--<span slot="title">Color Picker</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/transfer">-->
				<!--<span slot="title">Transfer</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/form">-->
				<!--<span slot="title">Form</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/table">-->
				<!--<span slot="title">Table</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/tag">-->
				<!--<span slot="title">Tag</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/progress">-->
				<!--<span slot="title">Progress</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/tree">-->
				<!--<span slot="title">Tree</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/pagination">-->
				<!--<span slot="title">Pagination</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/badge">-->
				<!--<span slot="title">Badge</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/alert">-->
				<!--<span slot="title">Alert</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/loading">-->
				<!--<span slot="title">Loading</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/message">-->
				<!--<span slot="title">Message</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/message-box">-->
				<!--<span slot="title">Message Box</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/notification">-->
				<!--<span slot="title">Notification</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/menu">-->
				<!--<span slot="title">NavMenu</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/tabs">-->
				<!--<span slot="title">Tabs</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/breadcrumb">-->
				<!--<span slot="title">Breadcrumb</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/dropdown">-->
				<!--<span slot="title">Dropdown</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/steps">-->
				<!--<span slot="title">Steps</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/dialog">-->
				<!--<span slot="title">Dialog</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/tooltip">-->
				<!--<span slot="title">Tooltip</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/popover">-->
				<!--<span slot="title">Popover</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/card">-->
				<!--<span slot="title">Card</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/carousel">-->
				<!--<span slot="title">Carousel</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/element/collapse">-->
				<!--<span slot="title">Collapse</span>-->
			<!--</el-menu-item>-->
		<!--</el-submenu>-->



		<!--<div class="el-menu-item-group__title"><span>Components</span></div>-->
		<!--<el-submenu index="tables" popper-class="main-navigation-submenu">-->
			<!--<template slot="title">-->
				<!--<i class="mdi mdi-table"></i><span>Tables</span>-->
			<!--</template>-->
			<!--<el-menu-item index="/tables/simple-table">-->
				<!--<span slot="title">Table</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/tables/vgtable">-->
				<!--<span slot="title">Vue Good Table</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/tables/table-element">-->
				<!--<span slot="title">Element UI Table</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/tables/v2table">-->
				<!--<span slot="title">V2 Table</span>-->
			<!--</el-menu-item>-->
		<!--</el-submenu>-->
		<!--<el-submenu index="maps" popper-class="main-navigation-submenu">-->
			<!--<template slot="title">-->
				<!--<i class="mdi mdi-map-marker-radius"></i><span>Maps</span>-->
			<!--</template>-->
			<!--<el-menu-item index="/maps/gmaps">-->
				<!--<span slot="title">G Maps</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/maps/leaflet">-->
				<!--<span slot="title">Leaflet</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/maps/mapbox">-->
				<!--<span slot="title">Mapbox</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/maps/datamaps">-->
				<!--<span slot="title">Datamaps</span>-->
			<!--</el-menu-item>-->
		<!--</el-submenu>-->
		<!--<el-submenu index="editors" popper-class="main-navigation-submenu">-->
			<!--<template slot="title">-->
				<!--<i class="mdi mdi-pencil-box"></i><span>Editors</span>-->
			<!--</template>-->
			<!--<el-menu-item index="/editors/quill">-->
				<!--<span slot="title">Quill</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/editors/pell">-->
				<!--<span slot="title">Pell</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/editors/markdown">-->
				<!--<span slot="title">Markdown</span>-->
			<!--</el-menu-item>-->
		<!--</el-submenu>-->
		<!--<el-submenu index="charts" popper-class="main-navigation-submenu">-->
			<!--<template slot="title">-->
				<!--<i class="mdi mdi-chart-areaspline"></i><span>Charts</span>-->
			<!--</template>-->
			<!--<el-menu-item index="/charts/vuebars">-->
				<!--<span slot="title">Vue Bars</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/charts/vuetrend">-->
				<!--<span slot="title">Vue Trend</span>-->
			<!--</el-menu-item>-->
			<!--&lt;!&ndash;<el-menu-item index="/charts/vued3network">-->
				<!--<span slot="title">Vue D3 Network</span>-->
			<!--</el-menu-item>&ndash;&gt;-->
			<!--<el-menu-item index="/charts/vuevis">-->
				<!--<span slot="title">Vue Vis</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/charts/vuechartist">-->
				<!--<span slot="title">Vue Chartist</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/charts/vuechartkick">-->
				<!--<span slot="title">Vue Chartkick</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/charts/bulmachartjs">-->
				<!--<span slot="title">Bulma Chartjs</span>-->
			<!--</el-menu-item>-->
			<!--<el-menu-item index="/charts/peity">-->
				<!--<span slot="title">Peity</span>-->
			<!--</el-menu-item>-->
			<!--&lt;!&ndash;<el-menu-item index="/charts/plotly">-->
				<!--<span slot="title">Plotly</span>-->
			<!--</el-menu-item>&ndash;&gt;-->
			<!--<el-menu-item index="/charts/echarts">-->
				<!--<span slot="title">Echarts</span>-->
			<!--</el-menu-item>-->
		<!--</el-submenu>-->
		

		<!-- <div class="el-menu-item-group__title"><span>Pages</span></div>
			<el-submenu index="/vendor" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-nintendo-switch"></i><span>Vendor</span>
			</template>
			<el-menu-item index="/vendor">
				<span slot="title">List</span>
			</el-menu-item>
			<el-menu-item index="/vendor/create">
				<span slot="title">Create</span>
			</el-menu-item>
			</el-submenu>
		<el-menu-item index="/testapi">
			<i class="mdi mdi-skull"></i><span slot="title">Test Api</span>
		</el-menu-item>
		<el-menu-item index="/profile">
			<i class="mdi mdi-account-card-details"></i><span slot="title">Profile</span>
		</el-menu-item>
		<el-submenu index="authentication" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-lock"></i><span>Setting</span>
			</template>
			<el-menu-item index="/logout">
				<span slot="title">Login</span>
			</el-menu-item>
			<el-menu-item index="/register">
				<span slot="title">Register</span>
			</el-menu-item>
			<el-menu-item index="/forgot-password-page">
				<span slot="title">Forgot Password</span>
			</el-menu-item>
		</el-submenu> -->
		<!--<el-menu-item index="/invoice">-->
			<!--<i class="mdi mdi-file-document"></i><span slot="title">Invoice</span>-->
		<!--</el-menu-item>-->
		<!--<el-menu-item index="/404">-->
			<!--<i class="mdi mdi-alert-octagon"></i><span slot="title">404</span>-->
		<!--</el-menu-item>-->

	</el-menu>	
</template>


<script>
import { detect } from 'detect-browser'
import { navMixin } from "../mixins/core/navMixin";
import * as action from "../store/action-types";

const browser = detect()

export default {
	name: 'Nav',
	props: ['mode', 'isCollapse'],
	mixins: [navMixin],
	data() {
		return {
			payload: {
				identerprise: null,
				page: 1,
				reason_suspend: null,
            },
			isIe: true,
			isEdge: true,
			activeLink: null
		}
	},
	methods: {
		goto(index, indexPath) {
			if(index.charAt(0) === '/') {
				if(index.includes('/location-enterprise/')){
					this.payload.identerprise = JSON.parse(localStorage.getItem('user')).enterprise.identerprise;
					this.$store.dispatch(action.DATA_ID_CORP, this.payload.identerprise);
					this.$store.dispatch(action.LIST_LOCATION, this.payload);
				}
				this.$router.push(index)
				this.$emit('push-page', {page:index})
			}

		},
		setLink(path) {
			this.activeLink = path
		},
	},
	created() {
		if(browser.name !== 'ie') this.isIe = false
		if(browser.name !== 'edge') this.isEdge = false

		this.setLink(this.$router.currentRoute.path)
		this.$router.afterEach((to, from) => {
			this.setLink(this.$router.currentRoute.path)
			//console.log('afterEach', to, from)
		})
		//console.log('this.$router.currentRoute.path', this.$router.currentRoute.path)
	},
	mounted() {
		//console.log('nav component mounted')				
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables';

.el-menu {
	border: none;
}
.el-menu::before, .el-menu::after {
	display: none;
}
.el-submenu, .el-menu-item {
	.mdi {
		vertical-align: middle;
		margin-right: 5px;
		display: inline-block;
		width: 24px;
		text-align: center;
		color: red;
		font-size: 18px;
	}
.icon-home {
	height: 20px;
	margin-right: 10px;
	margin-bottom: 5px;
}
}

</style>

<style lang="scss">
@import '../assets/scss/_variables';

.main-navigation-menu {
	transition: width .5s;

	&:not(.el-menu--collapse) {
		.el-submenu__title, .el-menu-item {
			height: 50px;
			line-height: 40px;
			background-color: transparent !important;
		}

		&:not(.el-menu--horizontal) {
			.el-menu-item, .el-submenu {
				position: relative;
				
				&::before {
					content: '';
					display: block;
					width: 0px;
					height: 1px;
					position: absolute;
					bottom: 10px;
					left: 30px;
					background: $text-color;
					z-index: 1;
					opacity: 0;
					transition: all .7s cubic-bezier(.55,0,.1,1);
				}
				&:hover {
					&::before {
						width: 100px;
						opacity: 1;
						//left: 50px;
						transform: translate(20px, 0);
					}
				}

				&.is-active {
					&::before {
						background: $text-color-accent;
					}
				}
			}
		}

		.el-submenu.is-opened {
			//background: #edf1f6 !important;
			//background: rgba(223, 228, 234, 0.38) !important;
			position: relative;

			&::after {
				content: '';
				display: block;
				width: 2px;
				position: absolute;
				top: 40px;
				bottom: 10px;
				left: 31px;
				background: $text-color;
				z-index: 1;
			}

			&::before {
				display: none;
			}

			.el-menu-item, .el-submenu {
				&::before, &::after {
					display: none;
				}
			}
		}

		.el-menu-item-group__title {
			padding: 15px 0 0px 20px;
			color: transparentize($text-color, 0.65);
		}
	}

	.el-submenu__title, .el-menu-item:not(.is-active) {
		color: $text-color;
		
		i {		
			color: $text-color;
		}
	}

	&.el-menu--collapse {
		.el-menu-item-group__title {
			padding: 15px 0 0px 0px;
			width: 100%;
			text-align: center;
		}

		.el-submenu__title:hover, .el-menu-item:hover {
			background-color: rgba(0, 0, 0, 0.05) !important;
		}
	}

	&.el-menu--horizontal {
		white-space: nowrap;
		/*width: fit-content;
		width: max-content;*/
		overflow: hidden;
		display: table;

		& > * {
			float: inherit !important;
			display: inline-block;
		}
	}

	&.nav-collapsed {
		.el-menu-item,.el-submenu__title {
			& > span {
				display: none;
			}
		}
	}
}

.main-navigation-submenu { 
	.el-menu {
		background: #fff !important;

		.el-menu-item:not(.is-active) {
			color: $text-color;
		}
		.el-menu-item:hover {
			background-color: transparentize($background-color, 0.3) !important;
		}
	}
}
</style>
