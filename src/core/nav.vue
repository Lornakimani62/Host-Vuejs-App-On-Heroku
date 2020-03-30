<template>
	<div>
		<!--<div v-if="userRole == 'Admin' ">-->
		<!--<div v-if="userRole == 'Admin' ">-->
			<el-menu
					:default-active.sync="activeLink"
					:mode="mode"
					@select="goto"
					:collapse="isCollapse"
					:unique-opened="true"
					background-color="transparent"
					class="main-navigation-menu"
					:class="{'nav-collapsed':isCollapse}"
			>

				<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>MENU</span></div>

				<el-menu-item index="/dashboard">
					<i class="mdi mdi-gauge"></i><span slot="title">Dashboard</span>
				</el-menu-item>

				<el-menu-item index="/customers">
					<i class="mdi mdi-account"></i><span slot="title">Customers</span>
				</el-menu-item>

				<el-menu-item index="/leads">
					<i class="mdi mdi-account"></i><span slot="title">Leads</span>
				</el-menu-item>

				<el-submenu index="sales" popper-class="main-navigation-submenu">

					<template slot="title">
						<i class="mdi mdi-cash-multiple"></i><span>Payments</span>
					</template>


					<el-submenu index="mpesa" popper-class="main-navigation-submenu">
						<template slot="title">
							<i class="mdi mdi-cellphone"></i><span>M-Pesa</span>
						</template>

						<el-menu-item index="/mpesaresponses">
							<i class="mdi mdi-cellphone"></i><span slot="title">M-Pesa Responses</span>
						</el-menu-item>

						<el-menu-item index="/failedmpesaresponses">
							<i class="mdi mdi-window-close"></i><span slot="title">Failed M-Pesa Responses</span>
						</el-menu-item>
					</el-submenu>

					<!-- <el-menu-item index="/payments">
						<i class="mdi mdi-cash-multiple"></i><span slot="title">Other Payments</span>
					</el-menu-item> -->

				</el-submenu>

				<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>PRODUCTS</span></div>
				<el-submenu index="policies-main" popper-class="main-navigation-submenu">
					<template slot="title">
						<i class="mdi mdi-cards"></i><span>Policies</span>
					</template>
					<el-submenu index="lifePolicies" popper-class="main-navigation-submenu">
						<template slot="title">
							<i class="mdi mdi-flower"></i><span>Life</span>
						</template>
							<!-- <el-menu-item index="/lifecalculator">
								<i class="mdi mdi-calculator"></i><span slot="title">Life Calculator</span>
							</el-menu-item> -->

						<el-menu-item index="/lifepolicies/pending">
							<i class="mdi mdi-flower"></i><span slot="title">Pending</span>
						</el-menu-item>

						<el-menu-item index="/lifepolicies/approved">
							<i class="mdi mdi-flower"></i><span slot="title">Approved</span>
						</el-menu-item>

					</el-submenu>
					<!-- <el-menu-item index="/travelpolicies">
						<i class="mdi mdi-airplane"></i><span slot="title">Travel</span>
					</el-menu-item> -->

				</el-submenu>


				<el-submenu index="claims-main" popper-class="main-navigation-submenu">
					<template slot="title">
						<i class="mdi mdi-car"></i><span>Claims</span>
					</template>
					<el-submenu index="groupLifeClaims" popper-class="main-navigation-submenu">
						<template slot="title">
							<i class="mdi mdi-flower"></i><span>Life Claims</span>
						</template>

						<el-menu-item index="/lifeclaims/new">
							<i class="mdi mdi-account-alert"></i><span slot="title">Newly Submitted</span>
						</el-menu-item>

						<el-menu-item index="/lifeclaims/awaiting">
							<i class="mdi  mdi-timer"></i><span slot="title">Awaiting Information</span>
						</el-menu-item>

						<el-menu-item index="/lifeclaims/approved">
							<i class="mdi  mdi-account-plus"></i><span slot="title">Approved</span>
						</el-menu-item>

						<el-menu-item index="/lifeclaims/paid">
							<i class="mdi mdi-cash-multiple"></i><span slot="title">Paid</span>
						</el-menu-item>

						<el-menu-item index="/lifeclaims/rejected">
							<i class="mdi  mdi-account-remove"></i><span slot="title">Rejected</span>
						</el-menu-item>

						<el-menu-item index="/lifeclaims/reopened">
							<i class="mdi mdi-email-open"></i><span slot="title">Reopened</span>
						</el-menu-item>

						<el-menu-item index="/lifeclaims/add">
							<i class="mdi mdi-plus"></i><span slot="title">Add a new claim</span>
						</el-menu-item>
					</el-submenu>
				</el-submenu>

				<!-- <el-submenu index="quotations" popper-class="main-navigation-submenu">
					<template slot="title">
						<i class="mdi mdi-animation"></i><span>Quotations</span>
					</template>




				</el-submenu> -->


				<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>REPORTS</span></div>
				<el-submenu index="reports-main" popper-class="main-navigation-submenu">
					<template slot="title">
						<i class="mdi mdi-chart-bar-stacked"></i><span>Reports</span>
					</template>
					<el-menu-item index="/customerreports">
						<i class="mdi mdi-chart-line"></i><span slot="title">Customers</span>
					</el-menu-item>
					<el-submenu index="policy-reports" popper-class="main-navigation-submenu">
						<template slot="title">
							<i class="mdi mdi-finance"></i><span>Policy Reports</span>
						</template>
						<el-menu-item index="/lifepolicyreports">
							<i class="mdi mdi-flower"></i><span slot="title">Life Policy Reports</span>
						</el-menu-item>
					</el-submenu>
					<el-submenu index="claims-reports" popper-class="main-navigation-submenu">
						<template slot="title">
							<i class="mdi mdi-poll-box"></i><span>Claims Reports</span>
						</template>
						<el-menu-item index="/lifeclaimreports">
							<i class="mdi mdi-flower"></i><span slot="title">Life Claim Reports</span>
						</el-menu-item>

					</el-submenu>
				</el-submenu>
				<el-submenu index="messages-main" popper-class="main-navigation-submenu">
					<template slot="title">
						<i class="mdi  mdi-message"></i><span>Messages</span>
					</template>
					<el-menu-item index="/sendmessage">
						<i class="mdi mdi-message-draw"></i><span slot="title">Message</span>
					</el-menu-item>
					<el-menu-item index="/sendemail">
						<i class="mdi mdi-email-variant"></i><span slot="title">Email</span>
					</el-menu-item>
				</el-submenu>

				<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>SETTINGS</span></div>

				<el-menu-item index="/countries">
					<i class="mdi mdi-flag"></i><span slot="title">Countries</span>
				</el-menu-item>

				<el-menu-item index="/currency">
					<i class="mdi mdi-currency-usd"></i><span slot="title">Currency</span>
				</el-menu-item>

				<el-menu-item index="/underwritters">
					<i class="mdi mdi-library-books"></i><span slot="title">Underwriters</span>
				</el-menu-item>

				<el-submenu index="products" popper-class="main-navigation-submenu">
					<template slot="title">
						<i class="mdi mdi-briefcase"></i><span>Products</span>
					</template>
					<el-menu-item index="/products">
						<i class="mdi mdi-briefcase"></i><span slot="title">Products</span>
					</el-menu-item>


					<el-menu-item index="/life-covers">
						<i class="mdi mdi-flower"></i><span slot="title">Life Covers</span>
					</el-menu-item>
				</el-submenu>


				<el-submenu index="usermgt-main" popper-class="main-navigation-submenu">
					<template slot="title">
						<i class="mdi  mdi-settings"></i><span>User Management</span>
					</template>

					<el-menu-item index="/user">
						<i class="mdi mdi-account-star"></i><span slot="title">Users</span>
					</el-menu-item>


					<el-menu-item index="/userroles">
						<i class="mdi mdi-account-star"></i><span slot="title">User roles</span>
					</el-menu-item>



					<el-menu-item index="/userroletype">
						<i class="mdi  mdi-account-key"></i><span slot="title">User role types</span>
					</el-menu-item>

				</el-submenu>
			</el-menu>
		<!--</div>-->
		<!--<div v-if="userRole == 'Accounts'">-->
			<!--<el-menu-->
					<!--:default-active.sync="activeLink"-->
					<!--:mode="mode"-->
					<!--@select="goto"-->
					<!--:collapse="isCollapse"-->
					<!--:unique-opened="true"-->
					<!--background-color="transparent"-->
					<!--class="main-navigation-menu"-->
					<!--:class="{'nav-collapsed':isCollapse}"-->
			<!--&gt;-->

				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>menu</span></div>-->




				<!--<el-submenu index="sales" popper-class="main-navigation-submenu">-->

					<!--<template slot="title">-->
						<!--<i class="mdi mdi-cash-multiple"></i><span>Payments</span>-->
					<!--</template>-->


					<!--<el-submenu index="mpesa" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-cellphone"></i><span>M-Pesa</span>-->
						<!--</template>-->

						<!--<el-menu-item index="/mpesaresponses">-->
							<!--<i class="mdi mdi-cellphone"></i><span slot="title">M-Pesa Responses</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/failedmpesaresponses">-->
							<!--<i class="mdi mdi-window-close"></i><span slot="title">Failed M-Pesa Responses</span>-->
						<!--</el-menu-item>-->
					<!--</el-submenu>-->

					<!--<el-menu-item index="/payments">-->
						<!--<i class="mdi mdi-cash-multiple"></i><span slot="title">Other Payments</span>-->
					<!--</el-menu-item>-->

				<!--</el-submenu>-->

				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>PRODUCTS</span></div>-->
				<!--<el-submenu index="policies-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-cards"></i><span>Policies</span>-->
					<!--</template>-->
					<!--<el-submenu index="lifePolicies" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-flower"></i><span>Life</span>-->
						<!--</template>-->
						<!--<el-menu-item index="/lifepolicies/pending">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Pending</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifepolicies/approved">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Approved</span>-->
						<!--</el-menu-item>-->

					<!--</el-submenu>-->

					<!--<el-menu-item index="/travelpolicies">-->
						<!--<i class="mdi mdi-airplane"></i><span slot="title">Travel</span>-->
					<!--</el-menu-item>-->

				<!--</el-submenu>-->


				<!--<el-submenu index="claims-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-car"></i><span>Claims</span>-->
					<!--</template>-->
					<!--<el-submenu index="groupLifeClaims" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-flower"></i><span>Life Claims</span>-->
						<!--</template>-->

						<!--<el-menu-item index="/lifeclaims/new">-->
							<!--<i class="mdi mdi-account-alert"></i><span slot="title">Newly Submitted</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/awaiting">-->
							<!--<i class="mdi  mdi-timer"></i><span slot="title">Awaiting Information</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/approved">-->
							<!--<i class="mdi  mdi-account-plus"></i><span slot="title">Approved</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/paid">-->
							<!--<i class="mdi mdi-cash-multiple"></i><span slot="title">Paid</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/rejected">-->
							<!--<i class="mdi  mdi-account-remove"></i><span slot="title">Rejected</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/reopened">-->
							<!--<i class="mdi mdi-email-open"></i><span slot="title">Reopened</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/add">-->
							<!--<i class="mdi mdi-plus"></i><span slot="title">Add a new claim</span>-->
						<!--</el-menu-item>-->
					<!--</el-submenu>-->

				<!--</el-submenu>-->


				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>REPORTS</span></div>-->
				<!--<el-submenu index="reports-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-chart-bar-stacked"></i><span>Reports</span>-->
					<!--</template>-->
					<!--<el-menu-item index="/customerreports">-->
						<!--<i class="mdi mdi-chart-line"></i><span slot="title">Customers</span>-->
					<!--</el-menu-item>-->
					<!--<el-submenu index="policy-reports" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-finance"></i><span>Policy Reports</span>-->
						<!--</template>-->
						<!--<el-menu-item index="/lifepolicyreports">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Life Policy Reports</span>-->
						<!--</el-menu-item>-->

					<!--</el-submenu>-->
					<!--<el-submenu index="claims-reports" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-poll-box"></i><span>Claims Reports</span>-->
						<!--</template>-->
						<!--<el-menu-item index="/lifeclaimreports">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Life Claim Reports</span>-->
						<!--</el-menu-item>-->

					<!--</el-submenu>-->
				<!--</el-submenu>-->
				<!--<el-submenu index="messages-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi  mdi-message"></i><span>Messages</span>-->
					<!--</template>-->
					<!--<el-menu-item index="/sendmessage">-->
						<!--<i class="mdi mdi-message-draw"></i><span slot="title">Message</span>-->
					<!--</el-menu-item>-->
					<!--<el-menu-item index="/sendemail">-->
						<!--<i class="mdi mdi-email-variant"></i><span slot="title">Email</span>-->
					<!--</el-menu-item>-->
				<!--</el-submenu>-->

			<!--</el-menu>-->

		<!--&lt;!&ndash;</div>&ndash;&gt;-->
		<!--<div v-if="userRole == 'Claims Manager'">-->
			<!--<el-menu-->
					<!--:default-active.sync="activeLink"-->
					<!--:mode="mode"-->
					<!--@select="goto"-->
					<!--:collapse="isCollapse"-->
					<!--:unique-opened="true"-->
					<!--background-color="transparent"-->
					<!--class="main-navigation-menu"-->
					<!--:class="{'nav-collapsed':isCollapse}"-->
			<!--&gt;-->

				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>MENU</span></div>-->




				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>PRODUCTS</span></div>-->

				<!--<el-submenu index="claims-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-car"></i><span>Claims</span>-->
					<!--</template>-->
					<!--<el-submenu index="groupLifeClaims" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-flower"></i><span>Life Claims</span>-->
						<!--</template>-->

						<!--<el-menu-item index="/lifeclaims/new">-->
							<!--<i class="mdi mdi-account-alert"></i><span slot="title">Newly Submitted</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/awaiting">-->
							<!--<i class="mdi  mdi-timer"></i><span slot="title">Awaiting Information</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/approved">-->
							<!--<i class="mdi  mdi-account-plus"></i><span slot="title">Approved</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/paid">-->
							<!--<i class="mdi mdi-cash-multiple"></i><span slot="title">Paid</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/rejected">-->
							<!--<i class="mdi  mdi-account-remove"></i><span slot="title">Rejected</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/reopened">-->
							<!--<i class="mdi mdi-email-open"></i><span slot="title">Reopened</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/add">-->
							<!--<i class="mdi mdi-plus"></i><span slot="title">Add a new claim</span>-->
						<!--</el-menu-item>-->
					<!--</el-submenu>-->

				<!--</el-submenu>-->


				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>REPORTS</span></div>-->

				<!--<el-submenu index="claims-reports" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-poll-box"></i><span>Claims Reports</span>-->
					<!--</template>-->
					<!--<el-menu-item index="/lifeclaimreports">-->
						<!--<i class="mdi mdi-flower"></i><span slot="title">Life Claim Reports</span>-->
					<!--</el-menu-item>-->
				<!--</el-submenu>-->
				<!--<el-submenu index="messages-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi  mdi-message"></i><span>Messages</span>-->
					<!--</template>-->
					<!--<el-menu-item index="/sendmessage">-->
						<!--<i class="mdi mdi-message-draw"></i><span slot="title">Message</span>-->
					<!--</el-menu-item>-->
					<!--<el-menu-item index="/sendemail">-->
						<!--<i class="mdi mdi-email-variant"></i><span slot="title">Email</span>-->
					<!--</el-menu-item>-->
				<!--</el-submenu>-->
			<!--</el-menu>-->

		<!--</div>-->
		<!--<div v-if="userRole == 'Manager'">-->
			<!--<el-menu-->
					<!--:default-active.sync="activeLink"-->
					<!--:mode="mode"-->
					<!--@select="goto"-->
					<!--:collapse="isCollapse"-->
					<!--:unique-opened="true"-->
					<!--background-color="transparent"-->
					<!--class="main-navigation-menu"-->
					<!--:class="{'nav-collapsed':isCollapse}"-->
			<!--&gt;-->

				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>MENU</span></div>-->

				<!--<el-menu-item index="/dashboard">-->
					<!--<i class="mdi mdi-gauge"></i><span slot="title">Dashboard</span>-->
				<!--</el-menu-item>-->



				<!--<el-menu-item index="/customers">-->
					<!--<i class="mdi mdi-account"></i><span slot="title">Customers</span>-->
				<!--</el-menu-item>-->


				<!--<el-submenu index="sales" popper-class="main-navigation-submenu">-->

					<!--<template slot="title">-->
						<!--<i class="mdi mdi-cash-multiple"></i><span>Payments</span>-->
					<!--</template>-->


					<!--<el-submenu index="mpesa" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-cellphone"></i><span>M-Pesa</span>-->
						<!--</template>-->

						<!--<el-menu-item index="/mpesaresponses">-->
							<!--<i class="mdi mdi-cellphone"></i><span slot="title">M-Pesa Responses</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/failedmpesaresponses">-->
							<!--<i class="mdi mdi-window-close"></i><span slot="title">Failed M-Pesa Responses</span>-->
						<!--</el-menu-item>-->
					<!--</el-submenu>-->

					<!--<el-menu-item index="/payments">-->
						<!--<i class="mdi mdi-cash-multiple"></i><span slot="title">Other Payments</span>-->
					<!--</el-menu-item>-->

				<!--</el-submenu>-->

				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>PRODUCTS</span></div>-->
				<!--<el-submenu index="policies-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-cards"></i><span>Policies</span>-->
					<!--</template>-->
					<!--<el-submenu index="lifePolicies" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-flower"></i><span>Life</span>-->
						<!--</template>-->
						<!--<el-menu-item index="/lifepolicies/pending">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Pending</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifepolicies/approved">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Approved</span>-->
						<!--</el-menu-item>-->

					<!--</el-submenu>-->
					<!--<el-menu-item index="/travelpolicies">-->
						<!--<i class="mdi mdi-airplane"></i><span slot="title">Travel</span>-->
					<!--</el-menu-item>-->

				<!--</el-submenu>-->


				<!--<el-submenu index="claims-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-car"></i><span>Claims</span>-->
					<!--</template>-->
					<!--<el-submenu index="groupLifeClaims" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-flower"></i><span>Life Claims</span>-->
						<!--</template>-->

						<!--<el-menu-item index="/lifeclaims/new">-->
							<!--<i class="mdi mdi-account-alert"></i><span slot="title">Newly Submitted</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/awaiting">-->
							<!--<i class="mdi  mdi-timer"></i><span slot="title">Awaiting Information</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/approved">-->
							<!--<i class="mdi  mdi-account-plus"></i><span slot="title">Approved</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/paid">-->
							<!--<i class="mdi mdi-cash-multiple"></i><span slot="title">Paid</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/rejected">-->
							<!--<i class="mdi  mdi-account-remove"></i><span slot="title">Rejected</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/reopened">-->
							<!--<i class="mdi mdi-email-open"></i><span slot="title">Reopened</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/add">-->
							<!--<i class="mdi mdi-plus"></i><span slot="title">Add a new claim</span>-->
						<!--</el-menu-item>-->
					<!--</el-submenu>-->

				<!--</el-submenu>-->



				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>REPORTS</span></div>-->
				<!--<el-submenu index="reports-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-chart-bar-stacked"></i><span>Reports</span>-->
					<!--</template>-->
					<!--<el-menu-item index="/customerreports">-->
						<!--<i class="mdi mdi-chart-line"></i><span slot="title">Customers</span>-->
					<!--</el-menu-item>-->
					<!--<el-submenu index="policy-reports" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-finance"></i><span>Policy Reports</span>-->
						<!--</template>-->
						<!--<el-menu-item index="/lifepolicyreports">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Life Policy Reports</span>-->
						<!--</el-menu-item>-->

					<!--</el-submenu>-->
					<!--<el-submenu index="claims-reports" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-poll-box"></i><span>Claims Reports</span>-->
						<!--</template>-->
						<!--<el-menu-item index="/lifeclaimreports">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Life Claim Reports</span>-->
						<!--</el-menu-item>-->

					<!--</el-submenu>-->
				<!--</el-submenu>-->
				<!--<el-submenu index="messages-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi  mdi-message"></i><span>Messages</span>-->
					<!--</template>-->
					<!--<el-menu-item index="/sendmessage">-->
						<!--<i class="mdi mdi-message-draw"></i><span slot="title">Message</span>-->
					<!--</el-menu-item>-->
					<!--<el-menu-item index="/sendemail">-->
						<!--<i class="mdi mdi-email-variant"></i><span slot="title">Email</span>-->
					<!--</el-menu-item>-->
				<!--</el-submenu>-->


				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>SETTINGS</span></div>-->

				<!--<el-menu-item index="/countries">-->
					<!--<i class="mdi mdi-flag"></i><span slot="title">Countries</span>-->
				<!--</el-menu-item>-->

				<!--<el-menu-item index="/currency">-->
					<!--<i class="mdi mdi-currency-usd"></i><span slot="title">Currency</span>-->
				<!--</el-menu-item>-->


				<!--<el-menu-item index="/underwritters">-->
					<!--<i class="mdi mdi-library-books"></i><span slot="title">Underwriters</span>-->
				<!--</el-menu-item>-->


				<!--<el-submenu index="products" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-briefcase"></i><span>Products</span>-->
					<!--</template>-->
					<!--<el-menu-item index="/products">-->
						<!--<i class="mdi mdi-briefcase"></i><span slot="title">Products</span>-->
					<!--</el-menu-item>-->
					<!--<el-menu-item index="/life-covers">-->
						<!--<i class="mdi mdi-flower"></i><span slot="title">Life Covers</span>-->
					<!--</el-menu-item>-->
				<!--</el-submenu>-->





				<!--<el-submenu index="usermgt-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi  mdi-settings"></i><span>User Management</span>-->
					<!--</template>-->


					<!--<el-menu-item index="/user">-->
						<!--<i class="mdi mdi-account-star"></i><span slot="title">Users</span>-->
					<!--</el-menu-item>-->


					<!--<el-menu-item index="/userroles">-->
						<!--<i class="mdi mdi-account-star"></i><span slot="title">User roles</span>-->
					<!--</el-menu-item>-->



					<!--<el-menu-item index="/userroletype">-->
						<!--<i class="mdi  mdi-account-key"></i><span slot="title">User role types</span>-->
					<!--</el-menu-item>-->

				<!--</el-submenu>-->
			<!--</el-menu>-->
		<!--</div>-->
		<!--<div v-if="userRole == 'Product Development'">-->
			<!--<el-menu-->
					<!--:default-active.sync="activeLink"-->
					<!--:mode="mode"-->
					<!--@select="goto"-->
					<!--:collapse="isCollapse"-->
					<!--:unique-opened="true"-->
					<!--background-color="transparent"-->
					<!--class="main-navigation-menu"-->
					<!--:class="{'nav-collapsed':isCollapse}"-->
			<!--&gt;-->

				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>User</span></div>-->

				<!--<el-menu-item index="/dashboard">-->
					<!--<i class="mdi mdi-gauge"></i><span slot="title">Dashboard</span>-->
				<!--</el-menu-item>-->



				<!--<el-menu-item index="/customers">-->
					<!--<i class="mdi mdi-account"></i><span slot="title">Customers</span>-->
				<!--</el-menu-item>-->



				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>PRODUCTS</span></div>-->
				<!--<el-submenu index="policies-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-cards"></i><span>Policies</span>-->
					<!--</template>-->
					<!--<el-submenu index="lifePolicies" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-flower"></i><span>Life</span>-->
						<!--</template>-->
						<!--<el-menu-item index="/lifepolicies/pending">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Pending</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifepolicies/approved">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Approved</span>-->
						<!--</el-menu-item>-->

					<!--</el-submenu>-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-car"></i><span>Motor</span>-->
						<!--</template>-->

					<!--<el-menu-item index="/travelpolicies">-->
						<!--<i class="mdi mdi-airplane"></i><span slot="title">Travel</span>-->
					<!--</el-menu-item>-->

				<!--</el-submenu>-->


				<!--<el-submenu index="claims-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-car"></i><span>Claims</span>-->
					<!--</template>-->
					<!--<el-submenu index="groupLifeClaims" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-flower"></i><span>Life Claims</span>-->
						<!--</template>-->

						<!--<el-menu-item index="/lifeclaims/new">-->
							<!--<i class="mdi mdi-account-alert"></i><span slot="title">Newly Submitted</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/awaiting">-->
							<!--<i class="mdi  mdi-timer"></i><span slot="title">Awaiting Information</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/approved">-->
							<!--<i class="mdi  mdi-account-plus"></i><span slot="title">Approved</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/paid">-->
							<!--<i class="mdi mdi-cash-multiple"></i><span slot="title">Paid</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/rejected">-->
							<!--<i class="mdi  mdi-account-remove"></i><span slot="title">Rejected</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/reopened">-->
							<!--<i class="mdi mdi-email-open"></i><span slot="title">Reopened</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/add">-->
							<!--<i class="mdi mdi-plus"></i><span slot="title">Add a new claim</span>-->
						<!--</el-menu-item>-->
					<!--</el-submenu>-->

				<!--</el-submenu>-->


				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>REPORTS</span></div>-->
				<!--<el-submenu index="reports-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-chart-bar-stacked"></i><span>Reports</span>-->
					<!--</template>-->
					<!--<el-menu-item index="/customerreports">-->
						<!--<i class="mdi mdi-chart-line"></i><span slot="title">Customers</span>-->
					<!--</el-menu-item>-->
					<!--<el-submenu index="policy-reports" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-finance"></i><span>Policy Reports</span>-->
						<!--</template>-->
						<!--<el-menu-item index="/lifepolicyreports">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Life Policy Reports</span>-->
						<!--</el-menu-item>-->

					<!--</el-submenu>-->
					<!--<el-submenu index="claims-reports" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-poll-box"></i><span>Claims Reports</span>-->
						<!--</template>-->
						<!--<el-menu-item index="/lifeclaimreports">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Life Claim Reports</span>-->
						<!--</el-menu-item>-->

					<!--</el-submenu>-->
				<!--</el-submenu>-->
				<!--<el-submenu index="messages-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi  mdi-message"></i><span>Messages</span>-->
					<!--</template>-->
					<!--<el-menu-item index="/sendmessage">-->
						<!--<i class="mdi mdi-message-draw"></i><span slot="title">Message</span>-->
					<!--</el-menu-item>-->
					<!--<el-menu-item index="/sendemail">-->
						<!--<i class="mdi mdi-email-variant"></i><span slot="title">Email</span>-->
					<!--</el-menu-item>-->
				<!--</el-submenu>-->


				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>SETTINGS</span></div>-->

				<!--<el-menu-item index="/countries">-->
					<!--<i class="mdi mdi-flag"></i><span slot="title">Countries</span>-->
				<!--</el-menu-item>-->

				<!--<el-menu-item index="/currency">-->
					<!--<i class="mdi mdi-currency-usd"></i><span slot="title">Currency</span>-->
				<!--</el-menu-item>-->


				<!--<el-menu-item index="/underwritters">-->
					<!--<i class="mdi mdi-library-books"></i><span slot="title">Underwriters</span>-->
				<!--</el-menu-item>-->


				<!--<el-submenu index="products" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-briefcase"></i><span>Products</span>-->
					<!--</template>-->
					<!--<el-menu-item index="/products">-->
						<!--<i class="mdi mdi-briefcase"></i><span slot="title">Products</span>-->
					<!--</el-menu-item>-->

					<!--<el-menu-item index="/life-covers">-->
						<!--<i class="mdi mdi-flower"></i><span slot="title">Life Covers</span>-->
					<!--</el-menu-item>-->

				<!--</el-submenu>-->



			<!--</el-menu>-->

		<!--</div>-->
		<!--<div v-if="userRole == 'Sales'">-->
			<!--<el-menu-->
					<!--:default-active.sync="activeLink"-->
					<!--:mode="mode"-->
					<!--@select="goto"-->
					<!--:collapse="isCollapse"-->
					<!--:unique-opened="true"-->
					<!--background-color="transparent"-->
					<!--class="main-navigation-menu"-->
					<!--:class="{'nav-collapsed':isCollapse}"-->
			<!--&gt;-->

				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>MENU</span></div>-->

				<!--<el-menu-item index="/dashboard">-->
					<!--<i class="mdi mdi-gauge"></i><span slot="title">Dashboard</span>-->
				<!--</el-menu-item>-->

				<!--<el-menu-item index="/customers">-->
					<!--<i class="mdi mdi-account"></i><span slot="title">Customers</span>-->
				<!--</el-menu-item>-->

				<!--<el-submenu index="sales" popper-class="main-navigation-submenu">-->

					<!--<template slot="title">-->
						<!--<i class="mdi mdi-cash-multiple"></i><span>Payments</span>-->
					<!--</template>-->

					<!--<el-submenu index="mpesa" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-cellphone"></i><span>M-Pesa</span>-->
						<!--</template>-->

						<!--<el-menu-item index="/mpesaresponses">-->
							<!--<i class="mdi mdi-cellphone"></i><span slot="title">M-Pesa Responses</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/failedmpesaresponses">-->
							<!--<i class="mdi mdi-window-close"></i><span slot="title">Failed M-Pesa Responses</span>-->
						<!--</el-menu-item>-->
					<!--</el-submenu>-->

					<!--<el-menu-item index="/payments">-->
						<!--<i class="mdi mdi-cash-multiple"></i><span slot="title">Other Payments</span>-->
					<!--</el-menu-item>-->
				<!--</el-submenu>-->

				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>PRODUCTS</span></div>-->
				<!--<el-submenu index="policies-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-cards"></i><span>Policies</span>-->
					<!--</template>-->
					<!--<el-submenu index="lifePolicies" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-flower"></i><span>Life</span>-->
						<!--</template>-->
						<!--<el-menu-item index="/lifepolicies/pending">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Pending</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifepolicies/approved">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Approved</span>-->
						<!--</el-menu-item>-->

					<!--</el-submenu>-->

					<!--<el-menu-item index="/travelpolicies">-->
						<!--<i class="mdi mdi-airplane"></i><span slot="title">Travel</span>-->
					<!--</el-menu-item>-->

				<!--</el-submenu>-->


				<!--<el-submenu index="claims-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-car"></i><span>Claims</span>-->
					<!--</template>-->
					<!--<el-submenu index="groupLifeClaims" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-flower"></i><span>Life Claims</span>-->
						<!--</template>-->

						<!--<el-menu-item index="/lifeclaims/new">-->
							<!--<i class="mdi mdi-account-alert"></i><span slot="title">Newly Submitted</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/awaiting">-->
							<!--<i class="mdi  mdi-timer"></i><span slot="title">Awaiting Information</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/approved">-->
							<!--<i class="mdi  mdi-account-plus"></i><span slot="title">Approved</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/paid">-->
							<!--<i class="mdi mdi-cash-multiple"></i><span slot="title">Paid</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/rejected">-->
							<!--<i class="mdi  mdi-account-remove"></i><span slot="title">Rejected</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/reopened">-->
							<!--<i class="mdi mdi-email-open"></i><span slot="title">Reopened</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifeclaims/add">-->
							<!--<i class="mdi mdi-plus"></i><span slot="title">Add a new claim</span>-->
						<!--</el-menu-item>-->
					<!--</el-submenu>-->

				<!--</el-submenu>-->




				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>REPORTS</span></div>-->
				<!--<el-submenu index="reports-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-chart-bar-stacked"></i><span>Reports</span>-->
					<!--</template>-->
					<!--<el-menu-item index="/customerreports">-->
						<!--<i class="mdi mdi-chart-line"></i><span slot="title">Customers</span>-->
					<!--</el-menu-item>-->
					<!--<el-submenu index="policy-reports" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-finance"></i><span>Policy Reports</span>-->
						<!--</template>-->
						<!--<el-menu-item index="/lifepolicyreports">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Life Policy Reports</span>-->
						<!--</el-menu-item>-->

					<!--</el-submenu>-->
					<!--<el-submenu index="claims-reports" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-poll-box"></i><span>Claims Reports</span>-->
						<!--</template>-->
						<!--<el-menu-item index="/lifeclaimreports">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Life Claim Reports</span>-->
						<!--</el-menu-item>-->

					<!--</el-submenu>-->
				<!--</el-submenu>-->
				<!--<el-submenu index="messages-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi  mdi-message"></i><span>Messages</span>-->
					<!--</template>-->
					<!--<el-menu-item index="/sendmessage">-->
						<!--<i class="mdi mdi-message-draw"></i><span slot="title">Message</span>-->
					<!--</el-menu-item>-->
					<!--<el-menu-item index="/sendemail">-->
						<!--<i class="mdi mdi-email-variant"></i><span slot="title">Email</span>-->
					<!--</el-menu-item>-->
				<!--</el-submenu>-->


				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>SETTINGS</span></div>-->

				<!--<el-menu-item index="/countries">-->
					<!--<i class="mdi mdi-flag"></i><span slot="title">Countries</span>-->
				<!--</el-menu-item>-->

				<!--<el-menu-item index="/currency">-->
					<!--<i class="mdi mdi-currency-usd"></i><span slot="title">Currency</span>-->
				<!--</el-menu-item>-->


				<!--<el-menu-item index="/underwritters">-->
					<!--<i class="mdi mdi-library-books"></i><span slot="title">Underwriters</span>-->
				<!--</el-menu-item>-->


				<!--<el-submenu index="products" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-briefcase"></i><span>Products</span>-->
					<!--</template>-->
					<!--<el-menu-item index="/products">-->
						<!--<i class="mdi mdi-briefcase"></i><span slot="title">Products</span>-->
					<!--</el-menu-item>-->
					<!--\-->

					<!--<el-menu-item index="/life-covers">-->
						<!--<i class="mdi mdi-flower"></i><span slot="title">Life Covers</span>-->
					<!--</el-menu-item>-->


				<!--</el-submenu>-->

			<!--</el-menu>-->

		<!--</div>-->
		<!--<div v-if="userRole == 'Underwriting Manager'">-->
			<!--<el-menu-->
					<!--:default-active.sync="activeLink"-->
					<!--:mode="mode"-->
					<!--@select="goto"-->
					<!--:collapse="isCollapse"-->
					<!--:unique-opened="true"-->
					<!--background-color="transparent"-->
					<!--class="main-navigation-menu"-->
					<!--:class="{'nav-collapsed':isCollapse}"-->
			<!--&gt;-->

				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>User</span></div>-->

				<!--<el-menu-item index="/dashboard">-->
					<!--<i class="mdi mdi-gauge"></i><span slot="title">Dashboard</span>-->
				<!--</el-menu-item>-->



				<!--<el-menu-item index="/customers">-->
					<!--<i class="mdi mdi-account"></i><span slot="title">Customers</span>-->
				<!--</el-menu-item>-->


				<!--<el-submenu index="sales" popper-class="main-navigation-submenu">-->

					<!--<template slot="title">-->
						<!--<i class="mdi mdi-cash-multiple"></i><span>Payments</span>-->
					<!--</template>-->


					<!--<el-submenu index="mpesa" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-cellphone"></i><span>M-Pesa</span>-->
						<!--</template>-->

						<!--<el-menu-item index="/mpesaresponses">-->
							<!--<i class="mdi mdi-cellphone"></i><span slot="title">M-Pesa Responses</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/failedmpesaresponses">-->
							<!--<i class="mdi mdi-window-close"></i><span slot="title">Failed M-Pesa Responses</span>-->
						<!--</el-menu-item>-->
					<!--</el-submenu>-->

					<!--<el-menu-item index="/payments">-->
						<!--<i class="mdi mdi-cash-multiple"></i><span slot="title">Other Payments</span>-->
					<!--</el-menu-item>-->

				<!--</el-submenu>-->

				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>PRODUCTS</span></div>-->
				<!--<el-submenu index="policies-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-cards"></i><span>Policies</span>-->
					<!--</template>-->
					<!--<el-submenu index="lifePolicies" popper-class="main-navigation-submenu">-->
						<!--<template slot="title">-->
							<!--<i class="mdi mdi-flower"></i><span>Life</span>-->
						<!--</template>-->
						<!--<el-menu-item index="/lifepolicies/pending">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Pending</span>-->
						<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifepolicies/approved">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Approved</span>-->
						<!--</el-menu-item>-->

					<!--</el-submenu>-->
					<!--<el-menu-item index="/travelpolicies">-->
						<!--<i class="mdi mdi-airplane"></i><span slot="title">Travel</span>-->
					<!--</el-menu-item>-->
				<!--</el-submenu>-->


				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>REPORTS</span></div>-->
				<!--<el-submenu index="reports-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-chart-bar-stacked"></i><span>Reports</span>-->
					<!--</template>-->
					<!--<el-menu-item index="/customerreports">-->
						<!--<i class="mdi mdi-chart-line"></i><span slot="title">Customers</span>-->
					<!--</el-menu-item>-->

						<!--<el-menu-item index="/lifepolicyreports">-->
							<!--<i class="mdi mdi-flower"></i><span slot="title">Life Policy Reports</span>-->
						<!--</el-menu-item>-->

				<!--</el-submenu>-->
				<!--<el-submenu index="messages-main" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi  mdi-message"></i><span>Messages</span>-->
					<!--</template>-->
					<!--<el-menu-item index="/sendmessage">-->
						<!--<i class="mdi mdi-message-draw"></i><span slot="title">Message</span>-->
					<!--</el-menu-item>-->
					<!--<el-menu-item index="/sendemail">-->
						<!--<i class="mdi mdi-email-variant"></i><span slot="title">Email</span>-->
					<!--</el-menu-item>-->
				<!--</el-submenu>-->


				<!--<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>SETTINGS</span></div>-->

				<!--<el-menu-item index="/countries">-->
					<!--<i class="mdi mdi-flag"></i><span slot="title">Countries</span>-->
				<!--</el-menu-item>-->

				<!--<el-menu-item index="/currency">-->
					<!--<i class="mdi mdi-currency-usd"></i><span slot="title">Currency</span>-->
				<!--</el-menu-item>-->


				<!--<el-menu-item index="/underwritters">-->
					<!--<i class="mdi mdi-library-books"></i><span slot="title">Underwriters</span>-->
				<!--</el-menu-item>-->


				<!--<el-submenu index="products" popper-class="main-navigation-submenu">-->
					<!--<template slot="title">-->
						<!--<i class="mdi mdi-briefcase"></i><span>Products</span>-->
					<!--</template>-->
					<!--<el-menu-item index="/products">-->
						<!--<i class="mdi mdi-briefcase"></i><span slot="title">Products</span>-->
					<!--</el-menu-item>-->
					<!--<el-menu-item index="/life-covers">-->
						<!--<i class="mdi mdi-flower"></i><span slot="title">Life Covers</span>-->
					<!--</el-menu-item>-->

				<!--</el-submenu>-->
			<!--</el-menu>-->
		<!--</div>-->
	</div>

</template>


<script>
import { detect } from 'detect-browser'
const browser = detect()

export default {
	name: 'Nav',
	props: ['mode', 'isCollapse'],
	data() {
		return {
			isIe: true,
			isEdge: true,
			userRole: '',
			activeLink: null
		}
	},
	methods: {
		goto(index, indexPath) {
			if(index.charAt(0) === '/') {
				this.$router.push(index);
				this.$emit('push-page', {page:index})
			}

		},
		setLink(path) {
			this.activeLink = path
		}
	},
	created() {
		this.userRole=this.$store.getters.userRoles;
		if(browser.name !== 'ie') this.isIe = false;
		if(browser.name !== 'edge') this.isEdge = false;
			this.setLink(this.$router.currentRoute.path);
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
		font-size: 18px;
	}
}
</style>

<style lang="scss">
@import '../assets/scss/_variables';

.main-navigation-menu {
	transition: width .5s;

	&:not(.el-menu--collapse) {
		.el-submenu__title, .el-menu-item {
			height: 40px;
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
