<template>
  <div class="login">
    <el-row>
      <el-col v-loading="loggingIn" :span="12" :offset="6" class="content"><div class="grid-content bg-purple-light">
        <img src="https://raw.githubusercontent.com/fscheck/FsCheck/master/docs/files/img/logo.png" width="100px">
        <el-form :model="login" status-icon ref="loginFormRef" class="loginForm">
          <el-form-item prop="user">
            <el-input v-model="login.user" placeholder="Username"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password" v-model="login.pass" placeholder="Password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="button">
            <el-button type="primary" @click="submit()">Submit</el-button>
          </el-form-item>
        </el-form>
        <el-alert
          :title="error"
          type="error"
          v-if="error"
          :closable="false"
          center
          show-icon>
          
        </el-alert>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      login: {
        user:'Shanna@melissa.tv',
        pass: ''
      },
      loggingIn: false,
      error: ''
    }
  },
  beforeMount() {
    const loggedId = localStorage.getItem("logged_id");
    if(loggedId) {
      this.$router.push({ name: 'Profile', params: { userId: loggedId }})
    }
  },
  methods: {
    submit() {
      this.loggingIn = true;
      const login = {
        user: this.login.user,
        pass: this.login.pass
      };
      const userRequest = new Request('https://jsonplaceholder.typicode.com/users?email=' + login.user)
      
      this.loggingIn = true;
      
      fetch(userRequest)
        .then((response) => { return response.json() })
        .then((data) => {
          this.loggingIn = false;
          if(data.length < 1 || login.user !== data[0].email) {
            this.error="There is no user with this email!"
          }
          else {
            this.error="";
            this.$router.push({ name: 'Profile', params: { userId: data[0].id }})
            localStorage.setItem('logged_id', data[0].id)
          }
        }).catch( error => { console.log(error); });
        
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
    border-radius: 8px;
  }
  .login{
    padding-top:60px;
    height:100%;
    background-size:cover;
    background-image: url("https://images.pexels.com/photos/411595/pexels-photo-411595.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  }
  .login .content {
    margin-top:60px;
  }
  .login .loginForm{
    padding:0 60px;
  }
  .bg-purple-light {
    background: rgba(229,233,242, 0.8);
    padding: 20px;
  }
  .button {
    text-align: center;
  }
  .content img {
    display:block;
    margin:0 auto;
    margin-bottom: 20px;
  }
</style>
