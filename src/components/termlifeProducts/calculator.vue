<template>
	<div class="page-table scrollable">
		<el-row>
		<h1>Term Life Calculator</h1>	<h2>Selected product: {{product_name}}</h2>
		</el-row>
		<el-steps :active="active" align-center>
			<el-step title="Step 1" description="Choose a product"></el-step>
			<el-step title="Step 2" description="Customize policy details to your preference"></el-step>
			<el-step title="Step 3" description="Displays the target savings calculations"></el-step>
			<el-step title="Step 4" description="Payment Instructions"></el-step>
		</el-steps>
		<!--<el-button style="margin-top: 12px;" @click="next">Next step</el-button>-->
		<div v-if="active==1" style="align-content: center" class="center">
			<el-row>
				<h3>Please choose a product </h3>
				<el-dropdown @command="handleSelection" style="padding: 0px 10px 0px 10px">
			<el-button style="color: #1da1f2" plain>{{product_name}}<i class="el-icon-arrow-down el-icon--right"></i>
			</el-button>
			<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="Target savings">Target savings</el-dropdown-item>
						<el-dropdown-item  command="Flexi 3 Accumulation Plan">Flexi 3 Accumulation Plan </el-dropdown-item>
						<el-dropdown-item  command="Flexi 3 Insurance Plan">Flexi 3 Insurance Plan</el-dropdown-item>
						<el-dropdown-item  command="Masomo Plan">Masomo Plan</el-dropdown-item>
						<el-dropdown-item  command="VIP Multiplier">VIP-Multiplier</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<el-button :disabled="disabled" type="success" @click="next">NEXT<i class="el-icon-d-arrow-right el-icon-right"></i></el-button>
			</el-row>
		</div>

		<div v-if="active==2" style="align-content: center" class="center">
				<h3 class="animated fadeInDown">Fill the fields below:</h3>
				<div v-if="suffix==='/targetsavings'">
					<el-form ref="form" :rules="rules1" :model="form" label-width="150px" align-center>
				<el-form-item label="Monthly Premium" prop="monthly_premium" >
					<el-input placeholder="eg: 3000" v-model="form.monthly_premium"></el-input>
				</el-form-item>

				<el-form-item label="Age" prop="age" >
					<el-input placeholder="eg: 18" v-model="form.age"></el-input>
				</el-form-item>

				<el-form-item label="Term" prop="term">
					<el-input  placeholder="eg: 5" v-model="form.term"></el-input>
				</el-form-item>

				<el-form-item label="Rate" prop="rate">
					<el-input  type="integer" placeholder="eg: 5" v-model="form.interest_rate"></el-input>
				</el-form-item>

				<el-row>
					<el-button type="primary" @click="previous"><i class="el-icon-d-arrow-left el-icon-left"></i>PREVIOUS</el-button>
					<el-button type="success" @click="calculate('form')">NEXT<i class="el-icon-d-arrow-right el-icon-right"></i></el-button>
				</el-row>
					</el-form>
				</div>
				<div v-if="suffix==='/masomo'">
					<el-form ref="form" :rules="rules1" :model="form" label-width="150px" align-center>
					<el-form-item label="Monthly Premium" prop="monthly_premium" >
						<el-input placeholder="eg: 3000" v-model="form.monthly_premium"></el-input>
					</el-form-item>

					<el-form-item label="Term" prop="term">
						<el-input  placeholder="eg: 5" v-model="form.term"></el-input>
					</el-form-item>

					<el-form-item label="Rate" prop="rate">
						<el-input  type="integer" placeholder="eg: 5" v-model="form.interest_rate"></el-input>
					</el-form-item>

					<el-row>
						<el-button type="primary" @click="previous"><i class="el-icon-d-arrow-left el-icon-left"></i>PREVIOUS</el-button>
						<el-button type="success" @click="calculate('form')">NEXT<i class="el-icon-d-arrow-right el-icon-right"></i></el-button>
					</el-row>
					</el-form>
				</div>
				<div v-if="suffix==='/accumulationplan'">
					<el-form ref="form" :rules="rules1" :model="form" label-width="150px" align-center>

					<el-form-item label="Monthly Premium" prop="monthly_premium" >
						<el-input placeholder="eg: 3000" v-model="form.monthly_premium"></el-input>
					</el-form-item>

					<el-form-item label="Term" prop="term">
						<el-input  placeholder="eg: 5" v-model="form.term"></el-input>
					</el-form-item>

					<el-form-item label="Rate" prop="rate">
						<el-input  type="integer" placeholder="eg: 5" v-model="form.interest_rate"></el-input>
					</el-form-item>

					<el-row>
						<el-button type="primary" @click="previous"><i class="el-icon-d-arrow-left el-icon-left"></i>PREVIOUS</el-button>
						<el-button type="success" @click="calculate('form')">NEXT<i class="el-icon-d-arrow-right el-icon-right"></i></el-button>
					</el-row>
					</el-form>
				</div>
				<div v-if="suffix==='/insuranceplan'">
					<el-form ref="form" :rules="rules1" :model="form" label-width="150px" align-center>

					<el-form-item label="Monthly Premium" prop="monthly_premium" >
						<el-input placeholder="eg: 3000" v-model="form.monthly_premium"></el-input>
					</el-form-item>

					<el-form-item label="Term" prop="term">
						<el-input  placeholder="eg: 5" v-model="form.term"></el-input>
					</el-form-item>

					<el-form-item label="Rate" prop="rate">
						<el-input  type="integer" placeholder="eg: 5" v-model="form.interest_rate"></el-input>
					</el-form-item>

					<el-row>
						<el-button type="primary" @click="previous"><i class="el-icon-d-arrow-left el-icon-left"></i>PREVIOUS</el-button>
						<el-button type="success" @click="calculate('form')">NEXT<i class="el-icon-d-arrow-right el-icon-right"></i></el-button>
					</el-row>
					</el-form>
				</div>
				<div v-if="suffix==='/vip'">
					<el-form ref="form" :rules="rules1" :model="form" label-width="150px" align-center>

					<el-form-item label="Monthly Premium" prop="monthly_premium" >
						<el-input placeholder="eg: 3000" v-model="form.monthly_premium"></el-input>
					</el-form-item>

					<el-form-item label="Term" prop="term">
						<el-input  placeholder="eg: 5" v-model="form.term"></el-input>
					</el-form-item>

					<el-form-item label="Rate" prop="rate">
						<el-input  type="integer" placeholder="eg: 5" v-model="form.interest_rate"></el-input>
					</el-form-item>

					<el-row>
						<el-button type="primary" @click="previous"><i class="el-icon-d-arrow-left el-icon-left"></i>PREVIOUS</el-button>
						<el-button type="success" @click="calculate('form')">NEXT<i class="el-icon-d-arrow-right el-icon-right"></i></el-button>
					</el-row>

					</el-form>
				</div>
		</div>



		<div v-if="active==3">
			<div class="customCenter space center">
				<div style="padding-top: 25px"></div>
				<el-card class="box-card" shadow="always" align-center>
					<div slot="header" class="clearfix">
						<span class="animated fadeInDown"><strong>{{product_name}} Calculations</strong></span>
					</div>
					<div  class="text item">
						<p> <strong>Sum Assured:</strong> {{form2.sum_assured}}</p>
						<p> <strong>Natural Death:</strong> {{form2.natural_death}}</p>
						<p> <strong>Accidental Death:</strong>{{form2.accidental_death}}</p>
						<p> <strong>Critical Illness:</strong> {{form2.critical_illness}}</p>
						<p> <strong>Risk Premium:</strong> {{form2.risk_premium}}</p>
						<p><strong> Allocated Premium: </strong>{{form2.allocated_premium}}</p>
						<p> <strong>Projected Maturity:</strong> {{form2.projected_maturity}}</p>
					</div>
					<el-row>
						<el-button type="primary" @click="previous"><i class="el-icon-d-arrow-left el-icon-left"></i>PREVIOUS</el-button>
						<el-button type="success" @click="next">NEXT<i class="el-icon-d-arrow-right el-icon-right"></i></el-button>
					</el-row>
				</el-card>
			</div>
		</div>
		<div v-if="active==4">
			<el-card class="box-card" shadow="always" align-center>
				<div slot="header" class="clearfix">
					<span class="animated fadeInDown"><strong>Payments</strong></span>
				</div>
				<div  class="text item">

					<p> <strong>Monthly Premium:</strong>{{form.monthly_premium}}</p>
					<p> <strong>Term:</strong> {{form2.term}}</p>
					<p> <strong>Sum Assured:</strong> {{form2.sum_assured}}</p>
					<p> <strong>Projected Maturity:</strong> {{form2.projected_maturity}}</p>

				</div><br>
				<span class="animated fadeInDown"><strong>Payment Details</strong></span>
				<hr>
				<p>Choose Payment Method.<br> Please complete your payment within: 30 minutes. If you paid using credit card please note that your statement will list: Peach Payments</p>
			<el-row>
					<el-button type="primary" @click="previous"><i class="el-icon-d-arrow-left el-icon-left"></i>PREVIOUS</el-button>
					<el-button type="success" @click="next">PAY</el-button>
				</el-row>
			</el-card>
		</div>
		</div>
</template>

<script>
	export default {
		name: "flexi_target_savings",
		data(){
			return{
			active: 1,
				url:'',
				suffix:'',
				selected:true,
				disabled:true,
				product_name:'Products',
				products:{},
				form:{
					term_cap:10,
					risk_premium:10,
					maximum_term:20,
					minimum_term:5,
				},
				form2:{},

				rules1: {
					// monthly_premium: [
					// 	{required: true, message: 'Please enter the monthly premium', trigger: 'blur'},
					// 	// {min: 2000,  message: 'Minimum monthly premium is KES 2000', trigger: 'blur'}
					// ],
					// age: [
					// 	{required: true, message: 'Please enter an age', trigger: 'blur'},
					// 	// {min: 18,max:60, message: 'Age must be between 18 and 60', trigger: 'blur'}
					// ],
					// term: [
					// 	{required: true, message: 'Please enter the term', trigger: 'blur'},
					// 	// {min: 5, message: 'Minimum term is 5 years', trigger: 'blur'}
					// ]
				}
			}
		},
		created(){
			this.token=this.$store.getters.token;
			this.url=this.$store.getters.url;
		},
		methods: {
			next(){
				if (this.active++>3){
					this.active=1
				}
			},
			previous(){
				if (this.active>1)
				this.active--;
			},
			handleSelection(command){
				this.product_name=command;
				this.disabled=false;
				if(this.product_name === 'Target savings'){
					this.suffix='/targetsavings'
				}else if (this.product_name === 'Flexi 3 Accumulation Plan'){
					this.suffix='/accumulationplan'
				}else if (this.product_name === 'Flexi 3 Insurance Plan') {
					this.suffix='/insuranceplan'
				}else if (this.product_name === 'Masomo Plan') {
					this.suffix='/masomo'
				}else if (this.product_name ==='VIP Multiplier') {
					this.suffix='/vip'
				}
			},
			calculate(form){
				this.$refs[form].validate((valid) => {
					if (valid) {
						let url = this.url + this.suffix;
						this.axios.post(url, this.form, {headers: {'Content-Type': 'application/json',
								'Authorization': 'Bearer '+this.token
							}}).then((response)=> {
							if (response.status == 200){
								this.form2=response.data.data[0];
								this.form2.risk_premium=(parseInt(this.form2.natural_death)+parseInt(this.form2.accidental_death)+parseInt(this.form2.critical_illness));
								this.active++;
							}
							else if (response.status == 400){
								this.error();
							}
					})
				}
				})
			}
		}
	}
</script>

<style scoped>
	.space {
		padding-bottom: 35px;
	}
	.center {
		text-align: center;
	}
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 100%;
	}

</style>