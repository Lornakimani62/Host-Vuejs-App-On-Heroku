<template>
	<div>
	<el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
			<div class="card-base card-shadow--medium mb-30 widget small-widget">
				<div class="chart-box" style="height: 250px;">
				<bulma-chart :type="'line'" :data="seriesData" :options="options_3"></bulma-chart>
				</div>
			</div>
	</el-col>
	</div>
</template>

<script>
	export default {
		name: "airtime"
		,
		data () {
			return {

				backgroundColor: [
					'#1fc8db',
					'#fce473',
					'#42afe3',
					'#ed6c63',
					'#97cd76'
				],
				labels_3: ['May', 'June', 'Jule', 'August', 'September', 'October', 'November'],
				data_3: [
					[65, 59, 0, 81, 56, 55, 40],
					[28, 48, 40, 19, 88, 27, 45]
				],
				options_3: {
					tooltips: {
						mode: 'label'
					}
				},
				backgroundColor_3: [
					'rgba(31, 200, 219, 1)',
					'rgba(151, 205, 118, 1)'
				],
				series: ['Data A', 'Data B']
			}
		},
		computed: {

			seriesData () {
				let data = {
					labels: this.labels_3
				}
				data.datasets = this.series.map((e, i) => {
					return {
						data: this.data_3[i],
						label: this.series[i],
						borderColor: this.backgroundColor_3[i].replace(/1\)$/, '.5)'),
						pointBackgroundColor: this.backgroundColor_3[i],
						backgroundColor: this.backgroundColor_3[i].replace(/1\)$/, '.5)')
					}
				})
				return data
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/_variables';

	.widget {
		height: 200px;
		position: relative;

		.widget-header {

			.widget-icon-box {
				background: rgba(0, 0, 0, .02);
				border: 1px solid rgba(0, 0, 0, .02);
				border-radius: 4px;
				text-align: center;
				width: 60px;
				padding: 5px;
			}

			.widget-title {
				font-weight: bold;
			}
		}



		.badge-box {
			.badge {
				//background: rgba(0, 0, 0, .02);
				display: inline-block;
				//padding: 2px 5px;
				//border: 1px solid rgba(0, 0, 0, .02);
				border-radius: 4px;
				font-size: 80%;
			}
		}
	}


	/*@media (max-width: 768px) {
		.el-row {
			//margin-left: 0 !important;
			//margin-right: 0 !important;

			.el-col-24 {
				//padding-left: 0 !important;
				//padding-right: 0 !important;
			}
		}
	}*/

	.timeline {
		max-width: 1200px;
		margin: 6px;
	}
	.timeline, .timeline-title {
		color: $text-color;
		line-height: 1.4;
		cursor: default;
		font-family: inherit;
	}


	/*@media (min-width: 1200px) and (max-width: 1850px) {
		.widget {
			.widget-header {
				.widget-icon-box {
					display: none;
				}
			}
		}
	}*/
	@media (min-width: 768px) and (max-width: 1040px) {
		.radio-switcher {
			display: none;
		}

		.widget {
			.widget-header {
				.widget-icon-box {
					display: none;
				}
			}
		}
	}
	@media (max-width: 420px) {
		.radio-switcher {
			display: none;
		}
	}
</style>

<style lang="scss">
	.page-dashboard {

		.widget {
			.peity {
				position: absolute;
				bottom: -1px;
				left: 0;
				border-bottom-left-radius: 5px;
				border-bottom-right-radius: 5px;
			}
		}
		table.styled {
			.peity {
				margin-right: 10px;
			}
		}

		.vb-content {
			padding: 0 20px;
			box-sizing: border-box !important;
			margin-top: -5px;
			margin-left: -20px;
			margin-right: -20px;
			height: calc(100% + 15px) !important;
			width: calc(100% + 40px) !important;
		}
	}

	@media (max-width: 768px) {
		.page-dashboard {
			.vb-content {
				padding: 0 5px !important;
				margin: -5px;
				width: calc(100% + 10px) !important;
			}
		}
	}
</style>



