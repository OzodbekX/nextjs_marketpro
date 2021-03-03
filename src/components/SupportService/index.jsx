import { AiOutlineClose } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { RiPhoneFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { strings } from "../../locales/strings";

const SupportService = ({ setSupportService }) => {
  return (
    <div className="absolute md:fixed top-0 left-0 z-50 bg-black bg-opacity-50 z-40 w-screen h-screen flex flex-row justify-around items-start">
      <div className="relative bg-white w-full lg:w-8/12 xl:w-8/12 mt-0 md:mt-16 px-4 py-8 flex flex-wrap">
        {/* close-icon */}
        <AiOutlineClose
          onClick={() => setSupportService(false)}
          className="absolute top-4 right-4 bg-gray-200 bg-opacity-0 rounded-full p-1 cursor-pointer transition duration-400 hover:bg-opacity-100 text-3xl"
        />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* left */}
          <div className="col-span-1">
            <div className="flex items-center mb-2">
              <MdLocationOn className="text-2xl text-customDarkBlue2 mr-2" />
              <div className="text text-customDarkBlue2 capitalize">
                {strings.address}: Beruni Ave, Tashkent, Uzbekistan
              </div>
            </div>
            <div className="flex items-center mb-2">
              <RiPhoneFill className="text-2xl text-customDarkBlue2 mr-2" />
              <div className="text text-customDarkBlue2 capitalize">
                {strings.phone}: (8 378) 150-8-150, (8 590) 351-66-67
              </div>
            </div>
            <div className="flex items-center mb-2">
              <IoMdMail className="text-2xl text-customDarkBlue2 mr-2" />
              <div className="text text-customDarkBlue2 capitalize">
                {strings.mail}: cityMag@gmail.com
              </div>
            </div>
            {/* map */}
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5991.872936444506!2d69.21905332698361!3d41.33199484376622!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd7e4152cf179f0bf!2sTinchlik!5e0!3m2!1sen!2s!4v1614246992441!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
          {/* right */}
          <div className="col-span-1 order-first md:order-last">
            <div className="text-2xl text-customDarkBlue font-bold mb-2">
              {strings.supportService}
            </div>
            <div className="">
              <label
                htmlFor="name"
                className="text-customDarkBlue text-sm capitalize"
              >
                {strings.name}
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-border-customGrey focus:outline-none rounded py-1 px-3 mb-2"
              />
              <label
                htmlFor="tel"
                className="text-customDarkBlue text-sm capitalize"
              >
                {strings.phone}
              </label>
              <input
                type="tel"
                id="tel"
                className="w-full border border-border-customGrey focus:outline-none rounded py-1 px-3 mb-2"
              />
              <label
                htmlFor="mail"
                className="text-customDarkBlue text-sm capitalize"
              >
                {strings.mail}
              </label>
              <input
                type="email"
                id="mail"
                className="w-full border border-border-customGrey focus:outline-none rounded py-1 px-3 mb-2"
              />
              <label
                htmlFor="message"
                className="text-customDarkBlue text-sm capitalize"
              >
                {strings.message}
              </label>
              <textarea
                className="w-full border border-border-customGrey focus:outline-none rounded py-1 px-3 mb-2"
                name="message"
                id="message"
                cols="8"
                rows="8"
              ></textarea>
              <button className="bg-customBlue1 bg-customBlue2-hover text-white px-4 py-2 rounded focus:outline-none">
                {strings.send}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportService;
