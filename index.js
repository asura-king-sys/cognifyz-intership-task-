import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); 

let users = []; 


app.get("/", (req, res) => {
    res.render("form.ejs");
});


app.post("/submit-form", (req, res) => {
    const { userName, userAge, membership, password } = req.body;

    
    if (!userName || !userAge || password.length < 8) {
        return res.status(400).json({ success: false, message: "Invalid Data" });
    }

    const newUser = { 
        id: Date.now(), 
        name: userName, 
        age: userAge, 
        tier: membership 
    };
    
    users.push(newUser);
    console.log("Current Users:", users);

    
    res.json({ success: true, user: newUser });
});

app.listen(port, () => {
    console.log(`Task 4 Server running at http://localhost:${port}`);
});