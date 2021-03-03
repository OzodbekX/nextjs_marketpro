import Link from "next/link";

const OzonTravel = () => {
  return (
    <>
      <div className="ozontravel-container">
        <div>
          <Link href="/">
            <h1>Ozon.travel — авиабилеты по всему миру</h1>
          </Link>
        </div>
        <div className="travel-inputs">
          <input className="input-travel" type="text" placeholder="Откуда" />
          <input className="input-travel" type="text" placeholder="Куда" />
          <input type="date" name="" id="" placeholder="Когда" />
          <input type="text" />
          <input
            style={{ backgroundColor: "#005bff" }}
            className="travel-btn"
            type="submit"
            value="Найти"
          />
        </div>
        <div className="travel-link">
          <div>
            <Link href="">
              <svg
                data-v-414055a2=""
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path
                  data-v-414055a2=""
                  d="M10.8 14.195V15a5.4 5.4 0 
                0010.8 0l.002-8.004a3.601 3.601 0 10-2.402 0V15a3 3 0 01-6 0v-.805a3.596 
                3.596 0 002.402-3.394c0-1.528-.961-2.887-2.399-3.395v-.804a5.401 5.401
                0 10-10.8 0v8.003A3.597 3.597 0 00.05 18.61a3.605 3.605 0 003.55 2.993 
                3.605 3.605 0 003.551-2.993 3.605 3.605 0 00-2.351-4.004V6.602c0-1.66
                1.344-3 3-3s3 1.34 3 3v.8a3.601 3.601 0 000 6.793zM21.25 4.45a1.203 
                1.203 0 01-2.027-.531 1.201 1.201 0 012.012-1.152c.46.464.468 1.214.015 
                1.683zM2.754 17.152a1.198 1.198 0 111.695 1.695 1.198 1.198 0 01-1.683-.015
                1.197 1.197 0 01-.012-1.68zm8.047-6.351c0-.664.535-1.2 1.199-1.2s1.2.536 1.2
                1.2a1.2 1.2 0 01-2.4 0zm0 0"
                  fillRule="evenodd"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
          <div>
            <Link href="">
              <sub style={{ fontSize: "12px", paddingLeft: "5px" }}>
                Составить сложный маршрут
              </sub>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default OzonTravel;
