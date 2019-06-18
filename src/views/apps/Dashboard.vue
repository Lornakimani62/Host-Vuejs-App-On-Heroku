<template>
	<vue-scroll class="page-dashboard">
		<resize-observer @notify="__resizeHanlder" />

		<el-row class="mt-0" :gutter="30">
			<!--Quotas vs Production graph-->
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
					<div class="p-20 flex justify-space-between">
						<h5 class="mv-0 animated fadeInDown">Quotas vs Production</h5>
					</div>
					<vue-chartist :data="quotas" :options="quotasOptions" type="Bar"></vue-chartist>
				</div>
			</el-col>

			<!--Sales growth graph-->
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
				<div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
					<div class="p-20 flex justify-space-between">
						<h5 class="mv-0 animated fadeInDown">Sales Growth</h5>
					</div>
					<vue-chartist :data="sales" :options="salesOptions" type="Line"></vue-chartist>
				</div>
			</el-col>

			<!--Sales channel-->
			<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
				<div class="card-base scrollable card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
					<vue-scroll class="card-base  card-shadow--medium mb-30" style="height:410px">
						<div class="p-20 flex justify-space-between">
							<div>
								<h4 class="mv-0 animated fadeInDown">Sales Channel</h4>
							</div>
						</div>

						<table class="styled striped">
							<thead>
							<tr>
								<th style="min-width:85px;">Channel</th>
								<th style="min-width:80px;">Volume</th>
							</tr>
							</thead>
							<tbody>
							<tr v-for="item in list" :key="item.id">
								<td style="min-width:100px;">{{item.channel}}</td>
								<td style="min-width:195px;">
									<el-progress
											:percentage="item.volume"
											:status="item.status === 'positive' ? 'success':''"
											:color="item.status === 'negative' ? '#ff4d4d' : item.status === 'intermediary' ? '#ffaa00' : ''"
									></el-progress>
								</td>
							</tr>
							</tbody>
						</table>
					</vue-scroll>
				</div>
			</el-col>

		</el-row>
		<el-row class="mt-30" :gutter="30">
			<!--Top agents and brokers table-->
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<vue-scroll class="card-base card-shadow--medium mb-30" style="height:410px">
					<div class="p-20 flex justify-space-between">
						<div>
							<h2 class="mv-0 animated fadeInDown">Top Agents/Brokers</h2>
							<h4 class="mt-5 mb-0 o-050 animated slideInUp">This month</h4>
						</div>
						<div class="radio-switcher">
							<el-radio-group v-model="radio1">
								<el-radio-button label="1 Month"></el-radio-button>
								<el-radio-button label="3 Months"></el-radio-button>
								<el-radio-button label="6 Months"></el-radio-button>
								<el-radio-button label="1 Year"></el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<table class="styled striped">
						<thead>
						<tr>
							<th></th>
							<th style="min-width:85px;">Name</th>
							<th style="min-width:80px;">Sales</th>
							<th style="min-width:130px;">Location</th>
							<th style="min-width:195px;">Email</th>
							<th style="min-width:195px;">Phone</th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="item in list" :key="item.id">
							<td class="text-right">
								<status-indicator class="ml-10"
								                  :active="item.status === 'Excellent'"
								                  :positive="item.status === 'Very Good'"
								                  :intermediary="item.status === 'Good'"
								                  :negative="item.status === 'Acceptable'"
								                  pulse
								/>
							</td>
							<td style="min-width:100px;">{{item.first_name}}</td>
							<td style="min-width:195px;">
								<el-progress
										:percentage="item.progress"
										:status="item.status === 'positive' ? 'success':''"
										:color="item.status === 'negative' ? '#ff4d4d' : item.status === 'intermediary' ? '#ffaa00' : ''"
								></el-progress>
							</td>							<td style="min-width:130px;">{{item.location}}</td>
							<td style="min-width:130px;">{{item.email}}</td>
							<td style="min-width:140px;">{{item.phone}}</td>

						</tr>
						</tbody>
					</table>
				</vue-scroll>
			</el-col>
		</el-row>
		<el-row class="mt-30" :gutter="30">
			<!--GDPI Pie chart-->
			<el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
				<div class="card-base card-shadow--medium p-20 mb-30" style="height:auto">
					<div class="p-20 flex justify-space-between">
						<h3 class="mv-0 animated fadeInDown">GDPI</h3>
					</div>
					<vue-chartist :data="gdpiData" :options="gdpiOptions" type="Pie"></vue-chartist>
				</div>
			</el-col>

			<!--Claims ratio-->
			<el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="18">
				<div class="card-base card-shadow--medium p-20 mb-30" style="height:auto">
					<div class="p-20 flex justify-space-between">
						<h3 class="mv-0 animated fadeInDown">Claims ratio</h3>
					</div>
					<vue-chartist :data="claimsRatioData" :options="claimsRatioOptions" type="Line"></vue-chartist>
				</div>


			</el-col>

		</el-row>
		<el-row class="mt-30" :gutter="30">
			<!--Claims per policy pie chart-->
			<el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
				<div class="p-10 flex justify-space-between">
					<h3 class="mv-0 animated fadeInDown">Claims per Policy</h3>
				</div>
				<div class="card-base card-shadow--medium p-20 mb-30" style="height:auto">
					<GChart
							type="PieChart"
							:data="donutChartData"
							:options="donutChartOptions"
					/>
				</div>
			</el-col>

			<el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="18">
				<div class="p-10 flex justify-space-between">
					<h3 class="mv-0 animated fadeInDown">Average cost per claim</h3>
				</div>
				<vue-scroll class="card-base  card-shadow--medium mb-30" style="height:auto">
					<div class="radio-switcher">

					</div>
					<table class="styled striped">
						<thead>
						<tr>
							<th></th>
							<th style="min-width: 60px;">Policies</th>
							<th style="min-width:80px;">Cost(KES)</th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="item in list2" :key="item.id">
							<td class="text-right">
								<status-indicator class="ml-10"
								                  :active="item.status === 'Excellent'"
								                  :positive="item.status === 'Very Good'"
								                  :intermediary="item.status === 'Good'"
								                  :negative="item.status === 'Acceptable'"
								                  pulse
								/>
							</td>
							<td style="min-width:100px;">{{item.policies}}</td>
							<td style="min-width:100px;">{{item.cost}}</td>

							<!--<td style="min-width:195px;">-->
							<!--<el-progress-->
							<!--:percentage="item.cost"-->
							<!--:status="item.status === 'positive' ? 'success':''"-->
							<!--:color="item.status === 'negative' ? '#ff4d4d' : item.status === 'intermediary' ? '#ffaa00' : ''"-->
							<!--&gt;</el-progress>-->
							<!--</td>-->
						</tr>
						</tbody>
					</table>
				</vue-scroll>
			</el-col>
		</el-row>
		<el-row class="mt-30" :gutter="30">
			<!--Average time to settle a claim-->
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<div class="p-10 flex justify-space-between">
					<h3 class="mv-0 animated fadeInDown">Average time to settle claim</h3></div>
				<div class="card-base card-shadow--medium p-20 mb-30" style="height:auto">
					<GChart
							type="BarChart"
							:data="barChartData"
							:options="barChartOptions"
					/>
				</div>
			</el-col>
		</el-row>

	</vue-scroll>
</template>

<script>
	import echarts from 'echarts'
	import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
	export default {
		name: 'Dashboard',
		data () {
			return {

				//Beginning of quotas graph
				quotas: {
					labels: ['1Q', '2Q', '3Q', '4Q'],
					series: [
						[8000, 3000, 10000, 6000]
					]
				},
				quotasOptions: {
					seriesBarDistance: 10,
					axisX: {
						offset: 60
					},
					axisY: {
						offset: 50,
						labelInterpolationFnc: function(value) {
							return value
						},
						scaleMinSpace: 15
					}
				},
				//End of quotas graph

				//Beginning of sales graph
				sales: {
					labels: ['M', 'T', 'W', 'T', 'F'],
					series: [
						[48, 54, 43, 58, 45]

						,					]
				},
				salesOptions: {
					fullWidth: true,
					chartPadding: {
						right: 40
					},
					showArea: true
				},
				//End of sales graph

				//Begin of GDPI data
				gdpiData: {
					series: [20, 10, 30, 40]
				},
				gdpiOptions: {
					donut: true,
					donutWidth: 60,
					donutSolid: true,
					startAngle: 270,
					showLabel: true
				},
				//End of GDPI data

				//Beginning of claims ratio data
				claimsRatioData: {
					labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
					series: [
						[0.3,0.4,0.5,0.6,0.7,0.5,0.6,0.7,0.3,0.2,0.1,0.4],
						// [16, 43, 27, 38, 80],
						// [56, 23, 57, 78, 105]
					]
				},
				claimsRatioOptions: {
					fullWidth: true,
					chartPadding: {
						right: 40
					},
					showArea: true
				},
				//End of claims ratio data
				//Google charts
				//Donut Chart
				donutChartData: [
					['Policies', 'Days',{ role: 'style' }],
					['Life', 90, 'color: #E9211B'],
					['Motor', 60,'color: #E97A93'],
					['PA', 90,'color: #E98036'],
					['Travel', 20,'color: brown'],
				],

				donutChartOptions: {
					chart: {
						title: 'Average time to settle claims',
						pieHole: 2,
					}
				},
				//Bar Chart
				barChartData: [
					['Policies', 'Days',{ role: 'style' }],
					['PA', 90, 'color: #E9211B'],
					['Motor', 60,'color: #E97A93'],
					['Life', 90,'color: #E98036'],
					['Travel', 5,'color: brown'],
				],

				barChartOptions: {
					chart: {
						title: 'Average time to settle claims',
						chartArea: {width: '50%'},
						hAxis: {
							title: 'Days',
							minValue: 0
						},
						vAxis: {
							title: 'Policies'
						}
					}
				},

				//Line chart data


				options_3: {
					tooltips: {
						mode: 'label'
					}
				},
				//End of line graph data
				asyncComponent: 'peity',
				//Beginning of pie data

				options: {
					segmentShowStroke: false,
				},
				labels: ['PA', 'Motor', 'Travel', 'Life'],
				data: [20, 40, 5, 35],
				backgroundColor: [
					'#1fc8db',
					'#fce473',
					'#42afe3',
					'#ed6c63',
					'#97cd76'
				],
				//end of pie

				asyncChart1: true,
				asyncChart2: true,
				chart1: null,
				chart2: null,
				resized: false,
				list: [
					{"activity":111, "progress": 70,"volume": 30 , "channel": "Aggregator" ,"cost": 300000,"policies": "Life","status":"Excellent", "id":1,"first_name":"Kevin Mutiso","location":"Kisumu","email":"mutiso.kevin@wazinsure.com","gender":"Female","phone":"0745678987"},
					{"activity":111, "progress": 55,"volume": 30 , "channel": "Self" ,"cost": 10000000,"policies": "Motor","status":"Very Good", "id":2,"first_name":"Grace Kigo","location":"Eldoret","email":"kigo.grace@wazinsure.com","gender":"Male","phone":"0789678567"},
					{"activity":111, "progress": 100,"volume": 25 , "channel": "Brokers" ,"cost": 3000000,"policies": "PA","status":"Good", "id":3,"first_name":"Martin Kiptoo","location":"Embu","email":"kiptoo.martin@wazisnure.com","gender":"Male","phone":"0723123123"},
					{"activity":111, "progress": 12,"volume": 15 ,"channel": "Agents" ,"cost": 400000,"policies": "Travel", "status":"Acceptable", "id":6,"first_name":"Agnes Atemi","location":"Mombasa","email":"atemi.agnes@wazinsure.com","gender":"Female","phone":"0789654321"},
					{"activity":111, "progress": 0,"channel": "Others", "status":"Poor", "id":8,"first_name":"Rita Kandie","location":"Kiambu","email":"kandie.Rita@wazinsure.com","gender":"Male","phone":"0789654456"},
				],
				list2: [
					{"cost": 300000,"policies": "Life","status":"Excellent", "id":1},
					{"cost": 10000000,"policies": "Motor","status":"Very Good", "id":2},
					{"cost": 3000000,"policies": "PA","status":"Good", "id":3},
					{"cost": 400000,"policies": "Travel", "status":"Acceptable", "id":4},
				],
				radio1: 'Month',
				radio2: 'Week',
				data3: {
					labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
					datasets: [{
						label: 'Visitors',
						backgroundColor: '#fff',
						stack: 'Stack 0',
						data: [
							23,
							41,
							34,
							62,
							46,
							57,
							68
						]
					}]
				},
				options3: {
					maintainAspectRatio: false,
					title: {
						display: false,
						text: 'Chart.js Bar Chart - Stacked'
					},
					legend: {
						display: false
					},
					tooltips: {
						mode: 'index',
						intersect: false
					},
					responsive: true,
					scales: {
						xAxes: [{
							stacked: true,
							gridLines: {
								display:false,
								drawBorder: false,
							},
							ticks: {
								fontColor: "#fff",
							}
						}],
						yAxes: [{
							stacked: true,
							gridLines: {
								display:false,
								drawBorder: false,
							},
							ticks: {
								display: false
							}
						}]
					}
				},
			}
		},
		computed: {
			pieData () {
				return {
					labels: this.labels,
					datasets: [{
						data: this.data,
						backgroundColor: this.backgroundColor
					}]
				}
			},
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
			},
			smallWidget() {
				return this.dashboardWidth >= 970 && this.dashboardWidth <= 1412 && this.windowWidth >= 1200
			}
		},
		methods: {
			__resizeHanlder: _.throttle(function (e) {
				if(this.resized) {

					this.asyncComponent = null
					this.removePeity()
					setTimeout(()=>{this.asyncComponent = 'peity'}, 1000)

					this.asyncChart1 = false
					this.asyncChart2 = false
					setTimeout(()=>{this.asyncChart1 = true; this.resizeChart1()}, 1000)
					setTimeout(()=>{this.asyncChart2 = true; this.resizeChart2()}, 2500)
				}
				this.resized = true
			}, 700),
			removePeity() {
				const peityEl = document.querySelectorAll('.widget .peity')//.forEach((el)=>{el.remove()})
				//ie fix
				for(let i=0; i<peityEl.length; i++) {peityEl[i].parentNode.removeChild(peityEl[i])}
			},
			initChart1() {
				this.chart1 = echarts.init(document.getElementById('chart1'))

				// Generate data
				let category = [];
				let dottedBase = +new Date();
				let lineData = [];
				let barData = [];

				for (let i = 0; i < 6; i++) {
					let date = new Date(dottedBase += 3600 * 24 * 1000);
					category.push([
						date.getFullYear(),
						date.getMonth() + 1,
						date.getDate()
					].join('-'));
					let b = Math.random() * 200;
					let d = Math.random() * 200;
					barData.push(parseInt(b))
					lineData.push(parseInt(d + b));
				}


				this.chart1.setOption({
					//backgroundColor: '#0f375f',
					grid: {
						show: false,
						left: '20px',
						right: '50px',
						bottom: '20px',
						top: '20px',
						containLabel: true
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						}
					},
					legend: {
						show: false,
						data: ['line', 'bar'],
						textStyle: {
							color: '#ccc'
						}
					},
					xAxis: {
						data: category,
						boundaryGap : false,
						axisLine: {
							lineStyle: {
								color: 'rgba(255,255,255,0.5)'
							}
						}
					},
					yAxis: {
						splitLine: {show: false},
						axisLine: {
							lineStyle: {
								color: 'rgba(255,255,255,0.5)'
							}
						}
					},
					series: [
						{
							name: 'Data A',
							type: 'line',
							smooth: true,
							showAllSymbol: true,
							symbol: 'emptyCircle',
							symbolSize: 10,
							lineStyle: {
								color: '#fff'
							},
							itemStyle: {
								color: '#fff',
								borderColor: '#5f8fdf',
								borderWidth: 3
							},
							areaStyle: {
								color: 'rgba(255,255,255,0.2)'
							},
							animationDuration: 2800,
							animationEasing: 'cubicInOut',
							data: lineData
						},
						{
							name: 'Data B',
							type: 'bar',
							barWidth: 10,
							itemStyle: {
								normal: {
									barBorderRadius: 5,
									color: new echarts.graphic.LinearGradient(
										0, 0, 0, 1,
										[
											{offset: 0, color: '#fff'},
											{offset: 1, color: 'rgba(255,255,255,0)'}
										]
									)
								}
							},
							data: barData
						},
						/* {
							name: 'line',
							type: 'bar',
							barGap: '-100%',
							barWidth: 10,
							itemStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(
										0, 0, 0, 1,
										[
											{offset: 0, color: 'rgba(20,200,212,0.5)'},
											{offset: 0.2, color: 'rgba(20,200,212,0.2)'},
											{offset: 1, color: 'rgba(20,200,212,0)'}
										]
									)
								}
							},
							z: -12,
							data: lineData
						},*/
						{
							name: 'Data C',
							type: 'pictorialBar',
							symbol: 'rect',
							itemStyle: {
								normal: {
									color: 'rgba(255,255,255,0.1)'
								}
							},
							symbolRepeat: true,
							symbolSize: [12, 4],
							symbolMargin: 1,
							z: -10,
							data: lineData
						}
					]
				})
			},
			initChart2() {
				this.chart2 = echarts.init(document.getElementById('chart2'))

				var dataBJ = [
					[55,9,56,0.46,18,6,1],
					[25,11,21,0.65,34,9,2],
					[56,7,63,0.3,14,5,3],
					[33,7,29,0.33,16,6,4],
					[42,24,44,0.76,40,16,5],
					[82,58,90,1.77,68,33,6],
					[74,49,77,1.46,48,27,7],
					[78,55,80,1.29,59,29,8],
					[267,216,280,4.8,108,64,9],
					[185,127,216,2.52,61,27,10],
					[39,19,38,0.57,31,15,11],
					[41,11,40,0.43,21,7,12],
					[64,38,74,1.04,46,22,13],
					[108,79,120,1.7,75,41,14],
					[108,63,116,1.48,44,26,15],
					[33,6,29,0.34,13,5,16],
					[94,66,110,1.54,62,31,17],
					[186,142,192,3.88,93,79,18],
					[57,31,54,0.96,32,14,19],
					[22,8,17,0.48,23,10,20],
					[39,15,36,0.61,29,13,21],
					[94,69,114,2.08,73,39,22],
					[99,73,110,2.43,76,48,23],
					[31,12,30,0.5,32,16,24],
					[42,27,43,1,53,22,25],
					[154,117,157,3.05,92,58,26],
					[234,185,230,4.09,123,69,27],
					[160,120,186,2.77,91,50,28],
					[134,96,165,2.76,83,41,29],
					[52,24,60,1.03,50,21,30],
					[46,5,49,0.28,10,6,31]
				];

				var dataGZ = [
					[26,37,27,1.163,27,13,1],
					[85,62,71,1.195,60,8,2],
					[78,38,74,1.363,37,7,3],
					[21,21,36,0.634,40,9,4],
					[41,42,46,0.915,81,13,5],
					[56,52,69,1.067,92,16,6],
					[64,30,28,0.924,51,2,7],
					[55,48,74,1.236,75,26,8],
					[76,85,113,1.237,114,27,9],
					[91,81,104,1.041,56,40,10],
					[84,39,60,0.964,25,11,11],
					[64,51,101,0.862,58,23,12],
					[70,69,120,1.198,65,36,13],
					[77,105,178,2.549,64,16,14],
					[109,68,87,0.996,74,29,15],
					[73,68,97,0.905,51,34,16],
					[54,27,47,0.592,53,12,17],
					[51,61,97,0.811,65,19,18],
					[91,71,121,1.374,43,18,19],
					[73,102,182,2.787,44,19,20],
					[73,50,76,0.717,31,20,21],
					[84,94,140,2.238,68,18,22],
					[93,77,104,1.165,53,7,23],
					[99,130,227,3.97,55,15,24],
					[146,84,139,1.094,40,17,25],
					[113,108,137,1.481,48,15,26],
					[81,48,62,1.619,26,3,27],
					[56,48,68,1.336,37,9,28],
					[82,92,174,3.29,0,13,29],
					[106,116,188,3.628,101,16,30],
					[118,50,0,1.383,76,11,31]
				];

				var dataSH = [
					[91,45,125,0.82,34,23,1],
					[65,27,78,0.86,45,29,2],
					[83,60,84,1.09,73,27,3],
					[109,81,121,1.28,68,51,4],
					[106,77,114,1.07,55,51,5],
					[109,81,121,1.28,68,51,6],
					[106,77,114,1.07,55,51,7],
					[89,65,78,0.86,51,26,8],
					[53,33,47,0.64,50,17,9],
					[80,55,80,1.01,75,24,10],
					[117,81,124,1.03,45,24,11],
					[99,71,142,1.1,62,42,12],
					[95,69,130,1.28,74,50,13],
					[116,87,131,1.47,84,40,14],
					[108,80,121,1.3,85,37,15],
					[134,83,167,1.16,57,43,16],
					[79,43,107,1.05,59,37,17],
					[71,46,89,0.86,64,25,18],
					[97,71,113,1.17,88,31,19],
					[84,57,91,0.85,55,31,20],
					[87,63,101,0.9,56,41,21],
					[104,77,119,1.09,73,48,22],
					[87,62,100,1,72,28,23],
					[168,128,172,1.49,97,56,24],
					[65,45,51,0.74,39,17,25],
					[39,24,38,0.61,47,17,26],
					[39,24,39,0.59,50,19,27],
					[93,68,96,1.05,79,29,28],
					[188,143,197,1.66,99,51,29],
					[174,131,174,1.55,108,50,30],
					[187,143,201,1.39,89,53,31]
				];

				var lineStyle = {
					normal: {
						width: 1,
						opacity: 0.5
					}
				};

				this.chart2.setOption({
					legend: {
						bottom: 0,
						data: ['Data 1', 'Data 2', 'Data 3'],
						itemGap: 20,
						textStyle: {
							color: '#fff',
							fontSize: 14
						},
						selectedMode: 'single'
					},
					grid: {
						height: '350px'
					},
					/*visualMap: {
						show: true,
						min: 0,
						max: 20,
						dimension: 6,
						inRange: {
							colorLightness: [0.5, 0.8]
						}
					},*/
					radar: {
						indicator: [
							{name: 'AQI', max: 300},
							{name: 'PM2.5', max: 250},
							{name: 'PM10', max: 300},
							{name: 'CO', max: 5},
							{name: 'NO2', max: 200},
							{name: 'SO2', max: 100}
						],
						shape: 'circle',
						radius : '60%',
						splitNumber: 5,
						name: {
							textStyle: {
								color: 'rgb(238, 197, 102)'
							}
						},
						splitLine: {
							lineStyle: {
								color: [
									'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
									'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
									'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
								].reverse()
							}
						},
						splitArea: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: 'rgba(238, 197, 102, 0.5)'
							}
						}
					},
					series: [
						{
							name: 'Data 1',
							type: 'radar',
							lineStyle: lineStyle,
							data: dataBJ,
							symbol: 'none',
							itemStyle: {
								normal: {
									color: '#F9713C'
								}
							},
							areaStyle: {
								normal: {
									opacity: 0.1
								}
							}
						},
						{
							name: 'Data 2',
							type: 'radar',
							lineStyle: lineStyle,
							data: dataSH,
							symbol: 'none',
							itemStyle: {
								normal: {
									color: '#B3E4A1'
								}
							},
							areaStyle: {
								normal: {
									opacity: 0.05
								}
							}
						},
						/*{
							name: 'Data 3',
							type: 'radar',
							lineStyle: lineStyle,
							data: dataGZ,
							symbol: 'none',
							itemStyle: {
								normal: {
									color: 'rgb(238, 197, 102)'
								}
							},
							areaStyle: {
								normal: {
									opacity: 0.05
								}
							}
						}*/
					]
				})
			},
			destroyChart1() {
				if(this.chart1) {
					this.chart1.dispose()
					this.chart1 = null
				}
			},
			destroyChart2() {
				if(this.chart2) {
					this.chart2.dispose()
					this.chart2 = null
				}
			},
			resizeChart1() {
				if (this.chart1) {
					this.chart1.resize()
				}
			},
			resizeChart2() {
				if (this.chart2) {
					this.chart2.resize()
				}
			}
		},
		mounted() {
			this.initChart1()
			this.initChart2()
		},
		beforeDestroy() {
			this.destroyChart1()
			this.destroyChart2()
		},
		components: {
			Timeline,
			TimelineItem,
			TimelineTitle
		}
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

