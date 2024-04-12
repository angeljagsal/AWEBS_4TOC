//Declare environment
const local_server = "https://localhost:44316/api/";
const public_server = "https://triviaapp.bsite.net/";

const env = public_server;

//Users API
const loginUser_route = env + "Users/login"
const dataUser_route = env + "Users/"
const signupUser_route = env + "Users/signup"
const postUser_route = env + "Users/"
const getScoreboard = env + "Scoreboard"
