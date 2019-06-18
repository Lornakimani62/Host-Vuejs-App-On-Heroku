<template>
	<div class="page-invoice scrollable">
		<div class="toolbar">
			<el-button class="animated fadeInRight" plain size="small" @click="print"><i class="mdi mdi-printer"></i> Print</el-button>
		</div>

		<div class="invoice bg-white black-text">
			<div class="invoice-top">
				<div class="logo">
					<img src="@/assets/images/logo.svg" alt="logo">
				</div>
				<div class="info">
					<h2>Wazinsure Insurance Policy</h2>
					<p>wazinsure@wazinsure.com<br>020-978-8782</p>
				</div><!--End Info-->

				<div class="title">
					<h6>Policy no: {{policy.policy_no}}</h6>
					<h6>Activated on: {{policy.activated_on | formatDate}}</h6>
				</div><!--End Title-->
			</div><!--End InvoiceTop-->

			<hr>

			<div class="invoice-middle">
				<!--<div class="clientlogo">-->
				<!--<img src="@/assets/images/avatar.jpg" alt="client logo">-->
				<!--</div>-->
				<div class="info">
					<h6>Policy holder: <strong>{{policy.applicant_name}}</strong></h6>
					<h6>ID No: <strong>{{policy.applicant_idno}}</strong></h6>
				</div>
				<div class="project">
					<h6>Product name: {{policy.product_name}}</h6>
					<h6>Cover name: {{result.cover_name}} 	</h6>
				</div>
			</div><!--End Invoice Mid-->

			<div class="invoice-bottom">
				<h2>Product description</h2>
				<p>{{productResult.product_description}}</p>
				<h2>Terms and conditions</h2>
				<p>{{productResult.terms_n_conditions}}</p>
				<hr>
				<p>By signing this document, the Policyholder expressly accepts the clauses limiting the rights of the Insured included in the attached General Conditions of the Policy.</p>
				<table>
					<thead>
					</thead>
					<tbody>
					<tr>
						<td>Underwriter: {{productResult.underwritter_name}}<br><br>
							Applicant's signature:<br><br><br>
							......................................................</td>
						<td><small>DATE: {{moment()|formatDate}}</small></td>
						<td></td>

					</tr>
					</tbody>
					<tfoot>
					<tr>
						<td></td>
						<td></td>

					</tr>
					</tfoot>
				</table>

				<div class="legalcopy flex mt-20">
					<p class="legal box grow mr-20 mt-0">
						<strong>HOW THE INSURED SHOULD APPLY FOR ASSISTANCE?<br></strong>Since the appearance of an event that could be included in any of the
						guarantees described previously, the beneficiary or any person acting in
						his place will necessarily contact, in the shortest possible time, in
						every case, the Alarm Centre mentioned below, which will be available
						to help any person 24h/24 7d/7.
					</p>

				</div>

			</div><!--End Invoice-->
		</div>
	</div>
</template>

<script>

	var moment=require('moment');

	export default {
		name: "life_policy_doc",
		data(){
			return{

				moment:moment,
				policy: {},
				token: 'token',
				id: '',
				covers:[],
				cover: '',
				result: [],
				productResult: [],
				products: [],
				date: ''

			}
		},
		methods: {

			//prints the displayed window
			print() {
				window.print()
			},

			//Get the specific policy details
			getPolicy(){

				this.axios.get(this.url + '/lifepolicies/'+this.$route.params.id, {headers: {'Content-Type': 'application/json',
						'Authorization': 'Bearer '+ this.token
					}}).then((response) => {
					this.policy=response.data.data;
				});
			},
			getDate(){
				this.date=moment();
			},

			//Get all the covers and store them in covers
			getCover(){

				this.axios.get(this.url +  '/pacovers', {headers: {'Content-Type': 'application/json',
						'Authorization': 'Bearer '+ this.token
					}}).then((response) => {
					this.covers=response.data.data;


					this.getSpecificCover();
				});
			},

			// Loop through the covers and get the cover that matches the specific cover name provided in the policy and store it in result
			getSpecificCover(){
				let tempCovers=this.covers; //All the covers
				var tempPolicy=this.policy.cover_name; //cover name in policy
				let tempCoverResult=[];
				console.log('Temp  policy: '+ tempPolicy);
				let specificCover=[];
				this.covers.forEach(function (cover){
					if (tempPolicy === cover.cover_name){
						specificCover.push(cover.cover_name);

					}else {
						console.log('No cover matches')
					}
					tempCoverResult = cover;

				});
				// let specificCover = tempCovers.filter(function (cover) {
				// 	return cover.cover_name == tempPolicy; //looking for a cover name that is same as cover name in policy
				// });
				this.result = tempCoverResult
				console.log("tempCoverResult")
				console.log(tempCoverResult)

			},

			//get the products all the products and store them in products object
			getProduct(){

				this.axios.get(this.url + '/products', {headers: {'Content-Type': 'application/json',
						'Authorization': 'Bearer '+ this.token
					}}).then((response) => {
					this.products=response.data.data;
					this.getSpecificProduct();

				});
			},

			//initializes and array and loops through to find the specific product that matches that in the policy and store it om productResult
			getSpecificProduct(){
				let tempProducts=this.products;
				let tempPolicy=this.policy.product_name;
				let tempProductResult=[];
				let specificProduct=[]
				this.products.forEach(function (product){
					console.log(product.product_name);
					if (tempPolicy === product.product_name){
						specificProduct.push(product.product_name);
					}else {
						console.log('No product matches')
					}
					tempProductResult = product;

				});
				this.productResult=tempProductResult;
				console.log("tempProductResult");
				console.log(this.productResult);
			}
		},

		created(){
			this.id=this.$route.params.id;
			this.token=this.$store.getters.token;
			this.url=this.$store.getters.url;
			this.getPolicy();
			this.getCover();
			this.getProduct();
			this.date=moment();


		}
	}
</script>

<style lang="scss">
	@import '../../assets/scss/_variables';

	.page-invoice {
		.toolbar {
			max-width: 794px;
			margin: 0 auto;
			text-align: right;
			margin-bottom: 20px;
		}

		.invoice {
			background: white;
			width: 100%;
			max-width: 1123px;
			min-height: 794px;
			margin: 0 auto;
			padding: 2em;
			box-sizing: border-box;
			box-shadow: 0px 8px 8px -8px rgba(0, 0, 0, 0.3);

			hr {
				border: 1px solid rgba(0, 0, 0, 0.05);
			}

			.invoice-top {
				overflow: hidden;
				margin-bottom: 30px;

				.logo {
					float: left;
					height: 60px;
					width: 60px;
					box-sizing: border-box;
					border-radius: 50%;
					overflow: hidden;
					background: rgba(0, 0, 0, 0.07);
					text-align: center;

					img {
						height: 80%;
						margin-top: 10%;
					}
				}
				.info {
					display: block;
					float:left;
					margin-left: 20px;
					margin-top: 5px;

					& > * {
						margin: 0;
					}
				}
				.title {
					float: right;

					& > * {
						margin: 0;
					}

					p {
						text-align: right;
					}
				}
			}

			.invoice-middle {
				overflow: hidden;
				margin-top: 30px;
				margin-bottom: 30px;

				.clientlogo {
					float: left;
					height: 60px;
					width: 60px;
					box-sizing: border-box;
					border-radius: 50%;
					overflow: hidden;
					background: grey;

					img {
						width: 100%;
					}
				}

				.info {
					display: block;
					float:left;
					margin-left: 20px;
					margin-top: 5px;

					& > * {
						margin: 0;
					}
				}




				.project {
					margin-left: 52%;

					& > * {
						margin: 0;
					}
				}
			}

			.invoice-bottom {
				table {
					width: 100%;
					border-collapse: collapse;

					th {
						text-align: right;
						padding: 20px;
						padding-bottom: 5px;
						opacity: .7;

						&:first-child {
							text-align: left;
							padding-left: 0px;
							width: 100%;
						}
						&:last-child {
							padding-right: 0px;
						}
					}

					td {
						text-align: right;
						padding: 20px;
						padding-bottom: 5px;
						border-bottom: 1px solid #EEE;

						&:first-child {
							text-align: left;
							padding-left: 0px;
							width: 100%;
						}
						&:last-child {
							padding-right: 0px;
						}
					}

					tfoot td {
						border: none;
						padding-top: 5px;
					}
				}
			}

			h1 { font-size: 1.5em; color: #222; }
			h2 { font-size: .9em; }
			h3 { font-size: 1.2em; font-weight: 300; line-height: 2em; }
			p  { font-size: .7em; color: #666; line-height: 1.2em; }
		}

	}


	@media screen and (max-width: 768px) {
		.page-invoice {
			.invoice {
				.invoice-middle {
					.project {
						display: block;
						width: 100%;
						clear: both;
						padding: 10px 0;
						margin: 0;
					}
				}
				.invoice-bottom {
					table {
						th {
							padding: 5px;
						}

						td {
							padding: 5px;
						}
					}
				}
			}
		}
	}

	@media print{
		.layout-container .container .footer ,
		.layout-container .container .header ,
		.layout-container .container .horizontal-nav ,
		.layout-container .footer ,
		.layout-container .layout-picker ,
		.layout-container .vertical-nav ,
		.layout-container .header {
			display:none;
		}

		.page-invoice {
			.toolbar {
				display: none;
			}

			.invoice {
				box-shadow: none;
				max-width: 100%;
				padding: 0;
			}
		}
	}
</style>