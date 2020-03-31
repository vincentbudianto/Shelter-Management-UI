<template>
  <div class="register-container">
        <div class="register-box">
            <h4>
                Register an Account
            </h4>
            <div>
                <span>Username</span><br>
                <input type="text" id="username_placeholder" name="username" value="">
                <br>
                <span class="error-message" id="username_error"></span><br>
                <span>Email Address</span><br>
                <input type="text" id="email_placeholder" name="email" value="">
                <br>
                <span class="error-message" id="email_error"></span><br>
                <span>Phone Number</span><br>
                <input type="text" id="phone_number_placeholder" name="phone_number" value="">
                <span class="error-message" id="phone_error"></span><br>
                <span>Password</span><br>
                <input type="password" id="password_placeholder" name="password" value="">
                <span class="error-message" id="password_error"></span><br>
                <span>Confirm Password</span><br>
                <input type="password" id="cpassword_placeholder" name="confirm_password" value="">
                <br>
                <span class="error-message" id="cpassword_error"></span><br>
                <span>Profile Picture</span><br>
                <div class="upload-btn-wrapper">
                    <input type="file" id="real-upload-button" name="profile-picture"/>
                </div>
                <br><br>
                <input class="button" id="submit_button" type="submit" value="Register">
            </div> 

            <p>Already have account? <a :href="'/#/login'">Login here</a> </p>

        </div>
    </div>
</template>

<style scoped>
body {
    margin : 0;
    padding: 0;
    font-family: Quattrocento;
}

/* Login Page */

.register-container{
    max-width: 960px;
    margin: auto;
    background-color: white;
    padding-top: 8px;
}

.register-box{
    box-shadow: 0px 0px 5px 5px rgba(146, 69, 69, 0.2);
    padding: 24px;
}

.register-box h4{
    text-align: center; 
    font-weight: 600;
}
.register-box input{
    padding: 8px 12px;
    margin: 4px 0px;
    width: 90%;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.register-box input:focus{
    outline: 0;
}

.register-box span{
    font-size: 0.8em;
    font-weight: bold;
    color: grey;
}

.register-box .button{
    font-size: 0.8em;
    font-weight: bold;
    color: white;
    background-color: gray;
    border: 0.5px;
    width: 100%;
}

.register-box .button:active{
    font-size: 0.8em;
    font-weight: bold;
    color: white;
    background-color: gray;
    border: 0.5px;
    width: 100%;
}

.register-box p{
    font-size: 0.7em;
    font-weight: 700;
    text-align: center;
    padding: 8px 32px;
}

.register-box a{
    text-decoration: none;
    color : gray;
}

.upload-btn-wrapper{
    display: flex;
    font-family: Quattrocento;
}

.error-message{
    color: red!important;
    font-size: 0.6em!important;
}

</style>

<script>
</script>