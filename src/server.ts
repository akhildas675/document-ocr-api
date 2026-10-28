import { env } from "process";
import app from "./app.js";

const port = env.PORT

app.listen(port,()=>{
  console.log(`Server running is ${port}`)
});

