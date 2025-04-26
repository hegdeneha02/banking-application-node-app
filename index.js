const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();


const app = express();
connectDB();

app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/accounts', require('./routes/account.routes'));
app.use('/api/transactions', require('./routes/transaction.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/otp', require('./routes/otp.routes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
