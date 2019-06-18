<template xmlns="http://www.w3.org/1999/html">
    <div class="page-table scrollable">

    <el-card class="box-card card-base" shadow="always">
        <div slot="header" class="clearfix">
            <span class="animated fadeInDown"><strong>Policy Details</strong></span>
        </div>
        <div  class="text item">
            <p> <strong>Policy ID:</strong>{{form.travel_policy_id}}</p>
            <p><strong> Policy no: </strong>{{form.policyNumber}}</p>
            <p> <strong>Ticket no:</strong> {{form.ticketNumber}}</p>
            <p> <strong>Client name:</strong> {{form.clientName}}</p>
            <p> <strong>ID no:</strong> {{form.idNumber}}</p>
            <p> <strong>Phone no:</strong> {{form.phoneNumber}}</p>
            <p> <strong>Email:</strong> {{form.emailAddress}}</p>
            <p> <strong>Travel From:</strong> {{form.travelFrom}}</p>
            <p> <strong>Travel to:</strong> {{form.travelTo}}</p>
            <p><strong> Departure date:</strong> {{form.departureDate}}</p>
            <p> <strong>Arrival date:</strong> {{form.arrivalDate}}</p>
            <p> <strong>Fleet no:</strong> {{form.fleetNo}}</p>
            <p> <strong>Beneficiary name:</strong> {{form.beneficiaryName}}</p>
            <p> <strong>Beneficiary mobile no:</strong> {{form.beneficiaryMobileNo}}</p>
            <p> <strong>Underwritten premium:</strong> {{form.underwrittenPremium}}</p>
            <p> <strong>Premium paid:</strong> {{form.premiumPaid}}</p>
            <p> <strong>Intermediary name:</strong> {{form.intermediaryName}}</p>
            <p> <strong>Cover:</strong> {{form.cover}}</p>
            <p> <strong>Activated on:</strong> {{form.activated_on}}</p>
        </div>
    </el-card></div>
</template>

<script>
    export default {
        name: "travel_policy",
        data(){
            return{
                id: '',
                form:{},
                token: '',
                message: '',
                url: ''
            }
        },
        methods: {
            getPolicy(){
                let url = this.url + '/travelpolicies/'+this.$route.params.id;
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.form=response.data.data;

                });
            }
        },

        created(){
            this.id=this.$route.params.id;
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getPolicy();
        }

    }
</script>

<style scoped>

</style>