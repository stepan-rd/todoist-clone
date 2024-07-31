import { useNavigate } from "react-router-dom";

type Props = {};

export function ErrorPage({}: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen font-SFpro">
      <h1>404 not found</h1>
      <button onClick={() => navigate("/")}>Go back</button>
    </div>
  );
}
