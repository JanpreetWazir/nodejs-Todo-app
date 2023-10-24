import { app } from "./app.js";

import { connectDB } from "./data/database.js";

connectDB();

const port = process.env.PORT || 4000;

app.listen(4000, () => {
    console.log(`Server is listening on port ${process.env.port} in ${process.env.NODE_ENV} mode`);
});