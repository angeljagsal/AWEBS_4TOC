function login(formData) {
    $.ajax({
        url: loginUser_route,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)
            saveLocalStorageValue("id_user", response.value.Id_User);

            console.log('ID de usuario:', getLocalStorageValue("id_user"));
            LoadPartialView('/home', document.querySelector('.app'))
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
        }
    });        
}

function signup(formData) {
    $.ajax({
        url: signupUser_route,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)
            
            if (response.Success) {
                saveLocalStorageValue("id_user", response.value.Id_User);
                
                console.log('ID de usuario:', getLocalStorageValue("id_user"));
                loadPartialView('user/user_profile', appRender)
                
                getUserData(parseInt(response.value.Id_User));
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
        }
    });        
}
