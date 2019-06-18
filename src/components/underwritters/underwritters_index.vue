<template>
    <div>
        <el-row id="space">
            <el-button  type="primary" v-on:click="addClicked" icon="el-icon-plus">Add New</el-button>
            <el-button type="warning" icon="el-icon-info" v-on:click="exportXlsx">Export Excel</el-button>
        </el-row>
        <div class=" table-box card-base card-shadow--medium">
            <el-table :data="tableData" height="475" width="100%">

                <el-table-column
                        prop="underwritter_id"
                        sortable
                        label="ID"
                        width="60"
                ></el-table-column>
                <el-table-column
                        prop="underwritter_name"
                        label="Underwriter name"
                        width="150"></el-table-column>
                <el-table-column
                        prop="underwritter_code"
                        label="Underwriter code"
                        width="150"></el-table-column>
                <el-table-column
                        prop="physical_location"
                        label="Physical loaction"
                        width="150"></el-table-column>
                <el-table-column
                        prop="postal_address"
                        label="Postal address"
                        width="150"></el-table-column>
                <el-table-column
                        prop="tell_no"
                        label="Tel no"
                        width="150"></el-table-column>
                <el-table-column
                        prop="email"
                        label="email"
                        width="180"></el-table-column>
                <el-table-column
                        prop="website"
                        label="Website"
                        width="150"></el-table-column>
                <el-table-column label="Operations" width="150">

                    <template slot-scope="scope">
                        <el-button size="mini" slot="reference" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>

<script>
    import XLSX from 'xlsx';

    export default {
        name: "underwrittters-index",
        data(){
            return {
                tableData: [],
                token:'',
                form:{},
                url: '',
                excelForm:[]
            }
        },
        methods:{

            getUnderwritter(){
             let url = this.url + '/underwritters';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.tableData=response.data.data;
                    this.excelForm = Object.values(this.tableData);

                });
            },
            exportXlsx(){
                var underwritterIdWs = XLSX.utils.json_to_sheet(this.excelForm);
                // Workbook
                var underwritterWb = XLSX.utils.book_new();
                //Add worksheet to workbook
                XLSX.utils.book_append_sheet(underwritterWb,underwritterIdWs);
                XLSX.writeFile(underwritterWb, 'Underwriters.xlsx');

            },

            addClicked(){
                this.$router.push('underwritters/add');
            },
            handleDelete(index, row) {

                let url = this.url + '/underwritters/' + row.underwritter_id;
               // let url = 'http://142.93.172.106:3002/api/currencies;
                this.axios.delete(url , {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response)=> {
                    this.message=response.data.message; this.delete();
                    this.tableData.splice(index,1);

                    this.getCurrency();
                });
            },
            handleEdit(index,row){
                this.form=row;
                this.id=this.form.underwritter_id;
                this.$router.push('/underwritters/edit/'+this.id);
            },

            delete() {
                this.$notify({
                    title: 'Deleted',
                    message: this.message,
                    type: 'Success'
                });
            },
        },
        created(){
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getUnderwritter();
        }
    }


</script>

<style scoped>
    #space{
        padding-bottom: 10px;
    }
</style>