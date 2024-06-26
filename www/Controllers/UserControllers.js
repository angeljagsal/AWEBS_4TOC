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
            saveLocalStorageValue("password", response.value.password);
            // saveLocalStorageValue("score", response.score);

            var scoreFromResponse = response.value.score;
            if (scoreFromResponse !== undefined && !isNaN(scoreFromResponse)) {
                saveLocalStorageValue("score", scoreFromResponse);
            } else {
                saveLocalStorageValue("score", 0);
            }

            // console.log('ID de usuario:', getLocalStorageValue("id_user"));
            LoadPartialView('/user_profile', document.querySelector('.app'))
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function logout() {
    removeLocalStorageValue("id_user")
    removeLocalStorageValue("name")
    removeLocalStorageValue("last_name")
    removeLocalStorageValue("email")
    removeLocalStorageValue("coins")
    removeLocalStorageValue("password")
    removeLocalStorageValue("score")
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

function editUser(formData) {
    $.ajax({
        url: postUser_route + getLocalStorageValue("id_user"),
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)

            getUserData(getLocalStorageValue("id_user"), "edit");
        },
        error: function(jqXHR, textStatus, errorThrown) {
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
