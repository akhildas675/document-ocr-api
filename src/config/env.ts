import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development","production","test"]).default("development"),
  PORT:z.coerce.number().min(1).max(65535).default(3000),
  CLIENT_URL:z.string().url().default("http://localhost:5173")

});

const parsedEnv = envSchema.safeParse(process.env);

if(!parsedEnv.success){
  console.error("Invalid enviornment variables",
    z.treeifyError(parsedEnv.error)
  )

  process.exit(1)

}

export const env = parsedEnv.data