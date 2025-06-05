require("mongoose")
.connect(process.env.DB_KEY)
.then(() => {
    console.log("Data Base Is Connected");
}).catch((error) => {
    console.log(error);
    
});

