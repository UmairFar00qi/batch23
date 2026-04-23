import express from "express"; 
import singup from "../controllers/singup.js";
import login from "../controllers/login.js";
import * as  userController from "../controllers/userController.js"


const router = express.Router();

router.get('/', (req, res) => {
   res.send("Hello World!");
}); 


// sinup route 
router.post('/singup', singup); 
// login route
router.post('/login', login);
// usercreate route 
router.post('/users', userController.createUser); 
router.get('/users', userController.getUser); 
router.get('/users/:id', userController.getUserById); 
router.delete('/users/:id', userController.deleteUser);


router.get("/test", (req, res) => {
   res.json({"message":  "backend is working fine"});
});


export default router;