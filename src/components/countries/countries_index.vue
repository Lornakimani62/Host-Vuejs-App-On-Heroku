<template>
    <div>

        <el-row id="space">
            <el-button  type="primary" v-on:click="addClicked" icon="el-icon-plus">Add New</el-button>
            <el-button type="warning" icon="el-icon-info" v-on:click="exportXlsx">Export Excel</el-button>
        </el-row>

        <!--Displays countries details in a table-->
        <div class=" table-box card-base card-shadow--medium">
            <el-table :data="tableData.filter(data => !search || data.country_name.toLowerCase().includes(search.toLowerCase()))" height="475" width="100%">
                    <el-table-column
                        prop="country_id"
                        sortable
                        label="ID"
                        width="60"
                ></el-table-column>
                <el-table-column
                        prop="country_code"
                        label="Country Code"
                        width="150"></el-table-column>
                <el-table-column
                        prop="country_name"
                        label="Country Name"
                        width="150"></el-table-column>
                <el-table-column
                        align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input
                                v-model="search"
                                size="mini"
                                placeholder="Type to search"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                </el-table-column>
                <!--<el-table-column label="Operations" width="150">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button size="mini" slot="reference" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>-->
                        <!--<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
        </div>
    </div>
</template>

<script>
    import XLSX from 'xlsx';
    export default {
        name: "countries_index",
        data(){
            return {
                tableData: [],
                token:'',
                form:{},
                url: '',
                search: '',
                excelForm:[]
            }
        },

        methods:{
            // Gets countries details from the db and assigns it to the tableData object
            getCountries(){
                let url = this.url + '/countries';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.tableData=response.data.data;
                    this.checkStatus(response);
                    this.excelForm = Object.values(this.tableData);

                })
                    .catch(err =>{
                        this.$router.push('login');
                    });
        },
            // Invoked by clicking the delete button, to delete the specific row form the db and splicing it form the displayed table
            handleDelete(index, row) {

                let url = this.url+'/countries/' + row.country_id;
                this.axios.delete(url , {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response)=> {
                    this.message=response.data.message;
                    this.delete();
                    this.tableData.splice(index,1);
                    this.getCountries();
                });
            },
            // Invoked by clicking the edit button and assigns the country id to an id object which is appended to the routers route to open the edit form
            handleEdit(index,row){
                this.form=row;
                this.id=this.form.country_id;
                this.$router.push('/countries/edit/'+this.id);
            },
            addClicked(){
                this.$router.push('countries/add');
            },
            exportXlsx(){
                var countryIddWs = XLSX.utils.json_to_sheet(this.excelForm);
                // Workbook
                var countryWb = XLSX.utils.book_new();
                //Add worksheet to workbook
                XLSX.utils.book_append_sheet(countryWb,countryIddWs);
                XLSX.writeFile(countryWb, 'Countries.xlsx');
            },

            //Delete notification
            delete() {
                this.$notify({
                    title: 'Deleted',
                    message: 'Entry Deleted',
                    type: 'Success'
                });
            },
            checkStatus(res){
                if (res.status == 500 || this.$store.getters.token == ''){
                    this.$store.commit('setLogout');
                }
            }
        },
        // Assigns the token object with the stored token. Also get the countries from the db
        created(){
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
             this.getCountries();

        }
    }


</script>

<style scoped>
.table-box{

}
    .card-base{

    }
#space{
    padding-bottom: 10px;
}
</style>