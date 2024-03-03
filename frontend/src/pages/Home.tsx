import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import image from "../assets/pexels-juan-pablo-serrano-arenas-877971.jpg";

export const Home: React.FC = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const userDetails = localStorage.getItem("userDetails");

  let keywords = useRef<HTMLInputElement>(null).current?.value;

  const navigate = useNavigate();

  const toggleSignUp = () => {
    if (userDetails !== null) {
      toast("Get Started...");
      navigate("/library");
    } else {
      setShowSignUp(!showSignUp);
    }
  };

  return (
    <div
      className="fixed w-screen h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex h-screen items-center justify-center bg-black/70">
        <div className="text-center">
          <h1 className="text-4xl bg-clip-text text-transparent bg-white font-bold sm:text-6xl">
            E-Book Vault
          </h1>
          <p className="mt-6 text-white leading-8">
            Unlock the world of knowledge with E-Book Vault, your digital
            library on the go!
          </p>

          <p className="mt-6 text-lg leading-8 cursor-pointer">
            <a className="text-indigo-300" onClick={toggleSignUp}>
              <u>Get started</u>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
