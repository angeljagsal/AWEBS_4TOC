function login(formData) {
    $.ajax({
        url: loginUser_route,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)
            saveLocalStorageValue("id_user", response.value.id_user);
            saveLocalStorageValue("name", response.value.name);
            saveLocalStorageValue("last_name", response.value.last_name);
            saveLocalStorageValue("email", response.value.email);
            saveLocalStorageValue("coins", response.value.coins);

            // console.log('ID de usuario:', getLocalStorageValue("id_user"));
            LoadPartialView('/user_profile', document.querySelector('.app'))
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
                saveLocalStorageValue("id_user", response.value.id_User);
                
                console.log('ID de usuario:', getLocalStorageValue("id_user"));
                LoadPartialView('/home', document.querySelector('.app'))
                
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(formData)
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function getUserData(id, func = null) {
    $.ajax({
        url: dataUser_route + id,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
        }
    });
}
