const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./db/db.js");
const dotenv = require("dotenv").config();

const authRoutes = require("./routes/auth/authRoutes.js");
const generalRoutes=require("./routes/generals/generalsRoutes.js");

const userRoutes=require("./routes/user/userRoutes.js");
const GetCandidatesApplications=require("./routes/admin/candidateApplicationRoutes.js");

const placeorder=require('./routes/placeorder/placeorder1.js');
const Inputinventory=require('./routes/Inputinventory/Inputinventory.js');

const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5001;

connectToDatabase();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes); 
app.use('/api/generals',generalRoutes);

app.use('/api/admin/candidate-application',GetCandidatesApplications);

app.use('/api/user',userRoutes);


app.use('/api/order',placeorder);
app.use('/api/Inputinventory',Inputinventory);

app.use(bodyParser.json());

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
