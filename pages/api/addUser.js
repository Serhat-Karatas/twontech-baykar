import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const filePath = path.join(process.cwd(), "data.json");
    const { name, password } = req.body;

    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "Kullanıcı adı ve parola gerekli!" });
    }

    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const existingUser = jsonData.users.find((user) => user.name === name);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Bu kullanıcı adı zaten kayıtlı!" });
    }

    const newUser = {
      id: Math.floor(Math.random() * 100),
      name,
      password,
      income: [],
      expenses: [],
      categories: [],
      limits: {
        Food: 1000,
        Rent: 4000,
        Utilities: 500,
        Transportation: 300,
        Entertainment: 500,
      },
      darkMode: false,
    };

    jsonData.users.push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    return res.status(201).json({
      message: "Kullanıcı başarıyla eklendi!",
      id: newUser.id,
      name: newUser.name,
    });
  } else {
    return res
      .status(405)
      .json({ message: "Yalnızca POST istekleri desteklenir." });
  }
}
