const express = require('express');
const mongoose = require('mongoose');


const app = express();

const port = 4000;

mongoose.connect("mongodb+srv://admin:admin123@sandbox.y0vqcrf.mongodb.net/an22_sample_database?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

// notification if connection to db is success or failed:
let db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection Error."));
db.once('open', () => console.log("Connected to MongoDB."));

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes)


app.listen(port, () => console.log(`Server is running at port ${port}`))