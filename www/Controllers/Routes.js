//Declare environment
const local_server = "https://localhost:44316/api/"; //Write localhost and port
const public_server = ""; //Write WEB API public address
const local_sources = ""; //Write App local resources

const env = local_server; //Select your environment (local or public server)

//Users API
const loginUser_route = env + "Users/login"
// const signupUser_route = env + "Users/signup"
// const editProfileFile_route = env + "Users/putProfileFile/"
// const allUsers_route = env + "Users"
// const postUser_route = env + "Users/"
// const dataUser_route = env + "Users/"
// const totalUser_route = env + "Users/GetTotalUsers"
