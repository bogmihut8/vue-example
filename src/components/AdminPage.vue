<template>
  <div id="admin-page">
    <el-row>
        <el-col :span="16" :offset="4">
            <div class="header-actions">
              <el-button class="back-button" icon="el-icon-arrow-left" @click="goBack()">Previous Page</el-button>
              <el-button type="primary" class="add-button" icon="el-icon-plus" @click="showDialog()">Add user</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%" row-key='id'>
              <el-table-column
                prop="id"
                label="Id"
                width="40">
              </el-table-column>
              
              <el-table-column
                prop="name"
                label="Name">
              </el-table-column>
              
              <el-table-column
                prop="email"
                label="Email">
              </el-table-column>
              
              <el-table-column
                prop="address.street"
                label="Address">
              </el-table-column>
              
              <el-table-column label="Operations">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="fillForm(scope.row)"><i class="el-icon-edit"></i>&nbsp;Edit</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="deleteUser(scope.row.id)"><i class="el-icon-delete"></i>&nbsp;Delete</el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    
    <el-dialog
      title="Add new user"
      :visible.sync="addDialogVisible"
      width="30%">
      <el-form label-width="100px" :model="form" ref="addForm">
        <el-form-item label="Name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="form.street"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitForm('addForm')">Add</el-button>
      </span>
    </el-dialog>
    
    <el-dialog
      title="Edit user"
      :visible.sync="editDialogVisible"
      width="30%">
      <el-form label-width="100px" :model="form" ref="editUser">
        <el-form-item label="Name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="form.street"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitEditForm(editedId)">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  data () {
    return {
      tableData: [],
      addDialogVisible: false,
      editDialogVisible: false,
      editedId: '',
      form: {
        name: '',
        email: '',
        street: ''
      }
    }
  },
  
  created(){
    this.fetchData();
  },
  
  beforeMount() {
    const loggedId = localStorage.getItem("logged_id");
    if(!loggedId) {
      this.$router.push({ name: 'Login' })
    }
  },
  
  methods: {
    fetchData() {
        const userRequest = new Request('https://jsonplaceholder.typicode.com/users')
        fetch(userRequest)
            .then((response) => { return response.json() })
            .then((data) => {
                this.tableData = data;
            }).catch( error => { console.log(error); });    
    },
    
    goBack(){
      this.$router.go(-1);
    },
    
    showDialog(){
      this.addDialogVisible = true;
      this.resetForm();
    },
    
    submitForm(){
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
          name: this.form.name,
          email: this.form.email,
          address: {
            street: this.form.street
          }
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(json => {
        this.tableData = [...this.tableData, json];
        this.addDialogVisible = false;
      }).catch( error => { console.log(error); });    
    },
    
    resetForm() {
      this.form.name = '';
      this.form.email = '';
      this.form.street = '';
    },
    
    deleteUser(id){
      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          fetch('https://jsonplaceholder.typicode.com/users/' + id, {
            method: 'delete'
          })
          .then(response => response.json())
          .then(() => {
            this.$message({
              type: 'success',
              message: 'Delete completed'
            });
            this.tableData = this.tableData.filter(e => e.id !== id)
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });
    },
    
    fillForm(user){
      this.editDialogVisible = true;
      this.form.name = user.name;
      this.form.email = user.email;
      this.form.street = user.address.street;
      this.editedId = user.id;
    },
    
    submitEditForm(editedId){
      fetch('https://jsonplaceholder.typicode.com/users/' + editedId, {
        method: 'PUT',
        body: JSON.stringify({
          name: this.form.name,
          email: this.form.email,
          address: {
            street: this.form.street
          }
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(json => {
        this.editDialogVisible = false;
      }).catch( error => { console.log(error); });  
    }
  }
}
</script>

<style scoped>
  #admin-page{
    padding-top:20px;
    padding-bottom:20px;
  }
  .photo {
    margin-bottom:20px;
  }
  .photo img{
    width: 100%;
  }
  .card{
    background-color:#fefefe;
    border-radius:5px;
  }
  .title {
      white-space: nowrap; 
      overflow: hidden;
      text-overflow: ellipsis; 
  }
  .back-button{
    margin-bottom:20px;
  }
  .add-button{
    float:right;
  }
</style>
