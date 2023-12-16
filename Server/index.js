const { PORT, app, mongoose, DATA } = require('./app');

// Database connection.... 
const dataConnect = async () => {
    try {
        await mongoose.connect(DATA);
        console.log('Database Connection Successful');
    } catch (err) {
        console.error(err.message);
    }
};

// Running server.....
app.listen(PORT, async () => {
    try {
        console.log(`Server running successfully on http://localhost:${PORT}`);
        await dataConnect();
    } catch (error) {
        console.error(error.message);
    }
});

"hsdfalkjh"
