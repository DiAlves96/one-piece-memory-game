import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Loading.css"

function Loading() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const state = location.state;

        const timer = setTimeout(() => {
            navigate("/game", { state });
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate, location.state]);

    return (
        <div className="loading-page">
            <div className="loading-content">
                <img
                    src={`${import.meta.env.BASE_URL}images/loading-luffy.gif`}
                    alt="loading luffy"
                />
                <img
                    src={`${import.meta.env.BASE_URL}images/Loading-gr.gif`}
                    alt="loading"
                />
            </div>
        </div>
    );
}

export default Loading;