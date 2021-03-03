import { strings } from "../../locales/strings";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import DefaultButton from "../../components/common/DefaultButton";

const Login = () => {
  return (
    <>
      <div className={"flex flex-col justify-between bg-customGrey h-full "}>
        {/* <div className={"p-4 border-b border-customGreyBottom"}>
          <div className="mb-5">
            <div className={"mb-2.5 text-2xl text-customDarkBlue font-bold"}>
              {strings.promoCode}
            </div>
            <div className="flex">
              <input
                placeholder="введите промокод"
                className="w-full py-1.5 px-2.5 focus:outline-none focus:ring-2 focus:ring-customBlue-400 focus:border-transparent rounded-sm"
                type="text"
              />
              <div className="ml-1.5 p-1 text-3xl text-white rounded-sm flex justify-center items-center cursor-pointer bg-customBlue1 bg-customBlue2-hover">
                <AiOutlineArrowRight />
              </div>
            </div>
          </div>
          <div className="text-sm text-customBlue1 text-customBlue2-hover">
            <Link href="/">
              <a>{strings.allDiscountsAnd}</a>
            </Link>
          </div>
        </div> */}

        <div className={"p-4"}>
          <div className="mb-5">
            <div className={"mb-2.5 text-2xl text-customDarkBlue font-bold"}>
              {strings.login}
            </div>
            <div className="text-sm w-full">{strings.loginToBuy}</div>
          </div>
          <div className="text-sm text-customBlue1 text-customBlue2-hover">
            <DefaultButton
              text={"Вход или регистрация"}
              textColor={"white"}
              bgColor={"customBlue1"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
