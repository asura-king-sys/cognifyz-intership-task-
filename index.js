import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const users = []; 

app.get("/", (req, res) => {
    res.render("form.ejs", { error: null });
});


app.post("/submit-form", (req, res) => {
    const { userName, userAge, membership } = req.body;

    
    if (!userName || userName.trim().length < 3) {
        return res.render("form.ejs", { error: "Server says: Name is too short!" });
    }

   
    const ageNum = parseInt(userAge);
    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
        return res.render("form.ejs", { error: "Server says: Invalid Age!" });
    }

   
    if (!membership) {
        return res.render("form.ejs", { error: "Server says: Please select a membership type!" });
    }

    
    const newUser = {
        id: Date.now(), 
        name: userName,
        age: ageNum,
        tier: membership
    };

    users.push(newUser);
    
    
    console.log("Current Users in Memory:", users);

    
    res.render("result.ejs", { 
        name: userName, 
        allUsers: users 
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});