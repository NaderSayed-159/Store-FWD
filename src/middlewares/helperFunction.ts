import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const hashingPass = (password: string) => {
  const hashedPassword = bcrypt.hashSync(
    (password + process.env.BCRYPT_PASSWORD) as string,
    parseInt(process.env.SALT_ROUNDS as string)
  );

  return hashedPassword;
};

export const generteUpdateQuerey = (data: [], table: string, id: String) => {
  data.forEach((el) => {
    if (Object.keys(el).includes("password")) {
      throw new Error(`You can't update password `);
    }
  });

  let updateQuerey: string = `UPDATE ${table} SET `;
  data.forEach((el, index) => {
    if (data.length < 2 && data.length > 0) {
      for (const [key, value] of Object.entries(el)) {
        if (typeof value == "string") {
          updateQuerey += `${key}='${value}' `;
        } else {
          updateQuerey += `${key}=${value} `;
        }
      }
    } else if (data.length > 1) {
      if (index != data.length - 1) {
        for (const [key, value] of Object.entries(el)) {
          if (typeof value == "string") {
            updateQuerey += `${key}='${value}', `;
          } else {
            updateQuerey += `${key}=${value}, `;
          }
        }
      } else {
        for (const [key, value] of Object.entries(el)) {
          if (typeof value == "string") {
            updateQuerey += `${key}='${value}' `;
          } else {
            updateQuerey += `${key}=${value} `;
          }
        }
      }
    }
  });
  updateQuerey += `WHERE id=${id}`;
  return updateQuerey;
};
