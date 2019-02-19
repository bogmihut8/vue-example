<template>
  <div id="profile-card" class="profile-card">
    <el-row>
      <el-col :span="12">
          <div class="grid-content image-container">
              <i class="el-icon-circle-close-outline" @click="logout()"></i>
            <span class="user-type">Pro</span>  
          </div>
      </el-col>
      <el-col :span="12">
          <div class="grid-content info-container">
             <p class="name-text">{{ profile.name }}</p>
             <p class="smaller-text email-text">{{ profile.username }}</p>
             <p class="smaller-text email-text">{{ profile.email }}</p>
             <br>
             <p class="phone-text"><b>Phone nr:</b> {{ profile.phone }}</p>
             <p class="address-text"><b>Address:</b> {{ profile.address.street }}, {{ profile.address.city }} {{ profile.address.zipcode }}</p>
             
             <p class="phone-text"><b>Company:</b> {{ profile.company.name }}</p>
             <p class="address-text smaller-text">"{{ profile.company.catchPhrase }}"</p>
             
             <router-link tag="a" to='/posts'>
                 <el-button class="see-more">Info</el-button>
             </router-link>
             <router-link tag="a" to='/admin'>
                 <el-button type="primary" class="see-more">Admin options</el-button>
             </router-link>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
  props: {
    'userId': {
      type: String
    }
  },
  data () {
    return {
        profile: {
            email: "",
            name: "",
            phone: "",
            username: "",
            website: "",
            company: {
                name: "",
                catchPhrase: ""
            },
            address: {
                street: "",
                city: "",
                zipcode: ""
            }
        }
    }
  },
  created(){
      this.fetchData();
  },
  methods: {
    fetchData() {
        const userRequest = new Request('https://jsonplaceholder.typicode.com/users?id=' + this.userId)
      
        fetch(userRequest)
            .then((response) => { return response.json() })
            .then((data) => {
                this.profile.email = data[0].email;
                this.profile.name = data[0].name;
                this.profile.phone = data[0].phone;
                this.profile.username = data[0].username;
                this.profile.website = data[0].website;
                
                this.profile.company.name = data[0].company.name;
                this.profile.company.catchPhrase = data[0].company.catchPhrase;
                
                this.profile.address.street = data[0].address.street;
                this.profile.address.city = data[0].address.city;
                this.profile.address.zipcode = data[0].address.zipcode;
            }).catch( error => { console.log(error); });    
    },
    logout() {
        localStorage.clear("logged_id");
        this.$router.push({ name: 'Login'})
    }
  }
}
</script>

<style scoped>
.profile-card {
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
    text-align: center;
}
.profile-card .image-container{
    background-image: url("https://images.pexels.com/photos/59196/pexels-photo-59196.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
    background-size: cover;
    background-repeat: no-repeat;
    height: 280px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    position: relative;
}
.profile-card .image-container .user-type {
    position: absolute;
    width: 60px;
    font-size: 12px;
    background: rgba(255,255,255,0.6);
    right: 15px;
    top: 15px;
    border-radius: 10px;
    padding: 3px 0;
}
.profile-card .image-container .el-icon-circle-close-outline{
    position: absolute;
    left: 15px;
    top: 15px;
    font-size: 20px;
    cursor: pointer;
}
.profile-card .info-container {
    padding:10px;
    font-size:14px;
}
.profile-card .info-container .see-more{
    margin-top:10px;
}
.name-text{
    font-weight: bold;
    margin-bottom:0;
}
.email-text{
    margin-bottom:20px;
    margin-top:0;
    margin-bottom:0;
}
.phone-text {
    margin-bottom: 0;
}
.address-text {
    margin-top:0;
}
.smaller-text{
    font-size:12px;
}
</style>
