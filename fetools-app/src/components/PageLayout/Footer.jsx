import { Link } from "react-router-dom";
import Icon from "../Icon";
import logo from "../../assets/devexToolsLogoWhite.svg";

export default function Footer() {
    return (
        <footer className="flex flex-col justify-between bg-[#2c2c2c] [&_a]:underline [&_a:hover]:text-white py-4 px-8 text-white max-sm:gap-8 max-sm:p-4 sm:gap-4 sm:p-8 xl:px-16">
            <div className="flex justify-between">
                <Link to="/">
                    <img
                        src={logo}
                        alt="devex.tools"
                        className="w-[200px] h-[31px]"
                    />
                </Link>

                <div className="flex h-8 w-8 items-center justify-center rounded-r-[.5rem] rounded-bl-[.5rem] bg-white text-primary">
                    <Icon
                        name="keyboard_arrow_up"
                        className="cursor-pointer"
                        onClick={goTopPage}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div
                    style={{ textWrap: "balance" }}
                    className="max-w-[48rem] xl:max-w-[60%] text-center xl:-mt-[3.5rem]"
                >
                    <p className="mb-3">
                        Made by{" "}
                        <a href="https://github.com/amansinghgill">
                            @amansinghgill
                        </a>
                        ,{" "}
                        <a href="https://github.com/david-nyc-pm">
                            @david-nyc-pm
                        </a>
                        , <a href="https://github.com/Greimil">@Greimil</a>,{" "}
                        <a href="https://github.com/imadrig">@imadrig</a>,{" "}
                        <a href="https://github.com/joekotvas">@joekotvas</a>,{" "}
                        <a href="https://github.com/olegklyufinskyy">
                            @olegklyufinskyy
                        </a>
                        , &amp;{" "}
                        <a href="https://github.com/Stevensauro">
                            @Stevensauro
                        </a>
                        . Facilitated by <a href="https://chingu.io/">Chingu</a>
                        .
                    </p>
                    <p>
                        <strong>Devex.tools</strong> is open source! Find us on{" "}
                        <a href="https://github.com/chingu-voyages/v47-tier2-team-17/">
                            GitHub
                        </a>
                        .
                    </p>
                </div>
            </div>
        </footer>
    );
}

function goTopPage() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}
