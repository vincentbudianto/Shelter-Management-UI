<template>
  <div class="input-victim-container">
        <div class="input-victim-box">
            <h4>
                Input Victim
            </h4>
            <div>
                <span>NIK</span><br>
                <input type="text" id="nik_placeholder" name="nik" value="">
                <br>
                <span>No. KK</span><br>
                <input type="text" id="nokk_placeholder" name="nokk" value="">
                <br>
                <span>Nama</span><br>
                <input type="text" id="nama_placeholder" name="nama" value="">
                <br>
                <span>Umur</span><br>
                <input type="text" id="umur_placeholder" name="umur" value="">
                <br>
                <span>ID Shelter</span><br>
                <input type="text" id="idshelter_placeholder" name="idshelter" value="">
                <br>
                <span>Foto</span><br>
                <div class="upload-btn-wrapper">
                    <input type="file" id="real-upload-button" name="foto"/>
                </div>
                <br><br>
                <input class="button" id="submit_button" type="submit" value="Submit">
            </div> 
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

.input-victim-container{
    max-width: 960px;
    margin: auto;
    background-color: white;
    padding-top: 8px;
}

.input-victim-box{
    padding: 24px;
}

.input-victim-box h4{
    text-align: center; 
    font-weight: 600;
}
.input-victim-box input{
    padding: 8px 12px;
    margin: 4px 0px;
    width: 90%;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.input-victim-box input:focus{
    outline: 0;
}

.input-victim-box span{
    font-size: 0.8em;
    font-weight: bold;
    color: grey;
}

.input-victim-box .button{
    font-size: 0.8em;
    font-weight: bold;
    color: white;
    background-color: gray;
    border: 0.5px;
    width: 100%;
}

.input-victim-box .button:active{
    font-size: 0.8em;
    font-weight: bold;
    color: white;
    background-color: gray;
    border: 0.5px;
    width: 100%;
}

.input-victim-box p{
    font-size: 0.7em;
    font-weight: 700;
    text-align: center;
    padding: 8px 32px;
}

.input-victim-box a{
    text-decoration: none;
    color : gray;
}

.upload-btn-wrapper{
    display: flex;
    font-family: Quattrocento;
}

</style>

<script>
</script>