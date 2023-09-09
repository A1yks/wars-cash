import mongoose from 'mongoose';

async function connect() {
    await mongoose.connect(process.env.DB_CONNECT);
}

export default connect;
