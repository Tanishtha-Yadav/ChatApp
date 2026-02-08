import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiChatAiLine } from "react-icons/ri";

const Navbar = () => {
  const [theme, setTheme] = useState("");
  const navigate = useNavigate();

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
    localStorage.setItem("chatKaroTheme", event.target.value);
    document.documentElement.setAttribute("data-theme", event.target.value);
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("chatKaroTheme");
    document.documentElement.setAttribute("data-theme", currentTheme);
    setTheme(currentTheme);
  }, []);

  return (
    <>
      <div className="bg-primary flex justify-between px-5 py-2 font-bold items-center">
        <div className="flex items-center gap-2 text-base-content">
          <span className="text-2xl"><RiChatAiLine/></span>
          <h1 className="text-2xl font-extrabold">ChatNest</h1>
        </div>
        <div className="flex gap-3">
          <span className="hover:text-primary-content cursor-pointer">Home</span>
          <span className="hover:text-primary-content cursor-pointer">About</span>
          <span className="hover:text-primary-content cursor-pointer">Contact</span>
        </div>

        <div className="flex gap-3">
          <button onClick={()=> navigate("/login")} className="btn btn-secondary">Login</button>
          <button onClick={()=> navigate("/register")} className="btn btn-secondary">Register</button>

          <select
            name="theme"
            id="theme"
            className="select"
            onChange={handleThemeChange}
            value={theme}
          >
            <option value="">Default</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="claude">Claude</option>
            <option value="spotify">Spotify</option>
            <option value="vscode">VSCode</option>
            <option value="black">Black</option>
            <option value="corporate">Corporate</option>
            <option value="ghibli">Ghibli</option>
            <option value="gourmet">Gourmet</option>
            <option value="luxury">Luxury</option>
            <option value="mintlify">Mintlify</option>
            <option value="pastel">Pastel</option>
            <option value="perplexity">Perplexity</option>
            <option value="shadcn">Shadcn</option>
            <option value="slack">Slack</option>
            <option value="soft">Soft</option>
            <option value="valorant">Valorant</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Navbar;