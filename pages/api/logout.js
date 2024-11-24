export default function handler(req, res) {
  res.setHeader("Set-Cookie", "currentUser=; Max-Age=0; Path=/");
  res.status(200).json({ message: "Logout successful" });
}
