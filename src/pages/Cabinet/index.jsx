import { useMediaQuery } from "../../hooks/useMediaQuery";
import { IoIosArrowForward } from "react-icons/io";

const Business = () => {
  const md = useMediaQuery(768);
  return (
    <div>
      {/* header */}
      <div
        className="bg-no-repeat bg-cover bg-right"
        style={{
          background: `url(
            "/header.png"
          )`,
        }}
      >
        <div className="w-full md:w-1/2 py-14 sm:py-24">
          <h1 className="text-2xl sm:text-5xl text-customDarkBlue font-bold">
            Развивайте бизнес и зарабатывайте вместе с нами
          </h1>
          <p className="text sm:text-2xl text-customDarkBlue mt-4">
            Приглашаем к сотрудничеству предпринимателей, чтобы делать лучший
            e‑commerce в Узбекистане.
          </p>
          <button className="bg-customBlue4 shadow-lg hover:bg-opacity-90 focus:outline-none rounded text-white py-2 sm:py-5 px-4 sm:px-10 mt-8 mx-auto">
            загистрироваться
          </button>
        </div>
      </div>

      {/* hidden */}
      {/* header-bottom */}
      <div className="flex flex-wrap mt-12 hidden">
        <div className="w-full sm:w-1/2 mt-4 md:w-1/4 md:mt-0 text-xl text-center md:text-left font-bold pr-4">
          БОЛЕЕ <span className="text-customPink text-4xl">9 лет</span> <br />{" "}
          НА РЫНКЕ УЗБЕКИСТАНА
        </div>
        <div className="w-full sm:w-1/2 mt-4 md:w-1/4 md:mt-0 text-xl text-center md:text-left font-bold pr-4">
          БОЛЕЕ <span className="text-customPink text-4xl">378168</span> <br />{" "}
          ТОВАРОВ И УСЛУГ
        </div>
        <div className="w-full sm:w-1/2 mt-4 md:w-1/4 md:mt-0 text-xl text-center md:text-left font-bold pr-4">
          БОЛЕЕ <span className="text-customPink text-4xl">21537</span> <br />{" "}
          АКТИВНЫХ КОМПАНИЙ
        </div>
        <div className="w-full sm:w-1/2 mt-4 md:w-1/4 md:mt-0 text-xl text-center md:text-left font-bold pr-4">
          БОЛЕЕ <span className="text-customPink text-4xl">20</span> <br />{" "}
          КАТЕГОРИИ ТОВАРОВ
        </div>
      </div>

      {/* help */}
      <div>
        <div className="text-2xl sm:text-4xl font-semibold text-customDarkBlue mt-14">
          Мы поможем
        </div>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 md:w-1/3 flex items-center text sm:text-xl mt-6 sm:mt-11">
            <div className="bg-black h-px w-8 mr-5" />
            Найти новых клиентов и рынки сбыта
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 flex items-center text sm:text-xl mt-6 sm:mt-11">
            <div className="bg-black h-px w-8 mr-5" />
            Увеличить объем продаж и прибыль
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 flex items-center text sm:text-xl mt-6 sm:mt-11">
            <div className="bg-black h-px w-8 mr-5" />
            Уменьшить расходы на рекламу, логистику и персонал
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 flex items-center text sm:text-xl mt-6 sm:mt-11">
            <div className="bg-black h-px w-8 mr-5" />
            Увеличить количество торговых точек
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 flex items-center text sm:text-xl mt-6 sm:mt-11">
            <div className="bg-black h-px w-8 mr-5" />
            Автоматизировать процесс торговли и складского учета
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 flex items-center text sm:text-xl mt-6 sm:mt-11">
            <div className="bg-black h-px w-8 mr-5" />
            Получать стабильный и дополнительный доход
          </div>
        </div>
      </div>

      {/* sell items */}
      <div>
        <div className="relative flex items-end">
          <img src="/1.png" alt="" />
          <div className="absolute bottom-5 text-2xl sm:text-5xl font-semibold text-customDarkBlue mt-14">
            Продавайте товары
          </div>
        </div>
        <div className="text-lg text-customDarkBlue mt-11">
          Торговая платформа будет осуществлять свою деятельность по всему
          Узбекистану и охватит рынок с объемом в 18 млн. потенциальных
          потребителей. Таким образом без расходов на рекламу и прочих расходов
          у Вас появится возможность увеличивать свою прибыль и ассортимент
          товаров своего торгового заведения.
        </div>
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div className="col-span-2 lg:col-span-1 flex flex-col justify-between border-4 border-customBlue2 p-6 cursor-pointer group">
            <div>
              <div className="text-lg sm:text-3xl mb-4 h-20">
                Продавайте свои товары на маркетплейсе
              </div>
              <div>
                <div className="w-full flex items-center text-customGreyText mt-2">
                  <div className="bg-customGreyText h-px w-5 mr-3" />
                  Площадка с гибкими схемами работы
                </div>
                <div className="w-full flex items-center text-customGreyText mt-2">
                  <div className="bg-customGreyText h-px w-5 mr-3" />
                  Продажи по всей стране
                </div>
                <div className="w-full flex items-center text-customGreyText mt-2">
                  <div className="bg-customGreyText h-px w-5 mr-3" />
                  Простое подключение
                </div>
                <div className="w-full flex items-center text-customGreyText mt-2">
                  <div className="bg-customGreyText h-px w-5 mr-3" />
                  Подробные отчёты и аналитика по вашим продажам
                </div>
                <div className="w-full flex items-center text-customGreyText mt-2">
                  <div className="bg-customGreyText h-px w-5 mr-3" />
                  Финансовая поддержка для развития бизнеса продавцов
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-5">
              <div className="text-customPink text-md sm:text-xl group-hover:underline">
                Подробнее про маркетплейс
              </div>
              <div className="flex items-center">
                <div className="text-2xl">
                  <IoIosArrowForward className="text-customGreyText transition duration-300 transform" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1 flex flex-col justify-between border-4 border-customBlue2 p-6 cursor-pointer group">
            <div>
              <div className="text-lg sm:text-3xl mb-4 h-20">
                Станьте поставщиком товаров
              </div>
              <div>
                <div className="w-full flex items-center text-customGreyText mt-2">
                  <div className="bg-customGreyText h-px w-5 mr-3" />
                  Площадка с гибкими схемами работы
                </div>
                <div className="w-full flex items-center text-customGreyText mt-2">
                  <div className="bg-customGreyText h-px w-5 mr-3" />
                  Продажи по всей стране
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-5">
              <div className="text-customPink text-md sm:text-xl group-hover:underline">
                Подробнее про маркетплейс
              </div>
              <IoIosArrowForward className="text-2xl text-customGreyText group-hover:text-customPink" />
            </div>
          </div>

          <div className="col-span-2 flex flex-col justify-between border-4 border-customBlue2 p-6 cursor-pointer group">
            <div>
              <div className="text-lg sm:text-3xl mb-4 h-20">
                Помогайте развивать продажи другим продавцам
              </div>
              <div>
                <div className="w-full flex items-center text-customGreyText mt-2">
                  <div className="bg-customGreyText h-px w-5 mr-3" />
                  Привлекайте новых продавцов
                </div>
                <div className="w-full flex items-center text-customGreyText mt-2">
                  <div className="bg-customGreyText h-px w-5 mr-3" />
                  Продажи Помогайте с контентом
                </div>
                <div className="w-full flex items-center text-customGreyText mt-2">
                  <div className="bg-customGreyText h-px w-5 mr-3" />
                  Продажи Помогайте с логистикой
                </div>
                <div className="w-full flex items-center text-customGreyText mt-2">
                  <div className="bg-customGreyText h-px w-5 mr-3" />
                  Продажи Помогайте с обучением
                </div>
                <div className="w-full flex items-center text-customGreyText mt-2">
                  <div className="bg-customGreyText h-px w-5 mr-3" />
                  Продажи Помогайте с техническими решениями
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-5">
              <div className="text-customPink text-md sm:text-xl group-hover:underline">
                Подробнее про маркетплейс
              </div>
              <IoIosArrowForward className="text-2xl text-customGreyText group-hover:text-customPink" />
            </div>
          </div>
        </div>
      </div>

      {/* cityMag */}
      <div className="py-14">
        <img className="mx-auto" src="/cityMag.png" alt="" />
      </div>

      {/* sell items 2 */}
      <div className="pb-8">
        <div className="relative flex items-end">
          <img src="/2.png" alt="" />
          <div className="absolute bottom-5 text-2xl sm:text-5xl font-semibold text-customDarkBlue mt-14">
            Продавайте товары
          </div>
        </div>
        {/* <div className="text-2xl sm:text-5xl font-semibold text-customDarkBlue">
          Продавайте товары
        </div> */}
        <div className="text-lg text-customDarkBlue mt-11">
          Мы поможем открыть пункт выдачи заказов с нуля или развить
          существующее торговое заведение. Поддерживаем на всех этапах запуска —
          от поиска финансирования через банки партнеры. Делаем так, чтобы
          предпринимателям было выгодно — гарантируем повышенный доход в течение
          3 первых месяцев после начала торговли на нашей платформе,
          обеспечиваем стабильный поток клиентов и рост прибыли.
        </div>
      </div>

      {/* footer banner */}
      <div
        className="bg-no-repeat bg-cover bg-center pt-40 pb-16 md:pt-80 md:pb-32 px-4"
        style={{
          background: `url(
            "/footerBanner.png"
          )`,
        }}
      >
        <div className="text-2xl sm:text-5xl font-semibold text-customDarkBlue">
          Больше заказов - больше доход!
        </div>
        <div className="flex mt-5">
          <div className="text-lg sm:text-2xl text-customDarkBlue hover:underline">
            Подробнее про маркетплейс
          </div>
          <IoIosArrowForward className="text-2xl text-customGreyText ml-4" />
        </div>
      </div>

      {/*  */}
      <div className="mt-8">
        <div className="w-full flex flex-col justify-between border-4 border-customBlue2 p-6 cursor-pointer group mt-8">
          <div>
            <div className="text-lg sm:text-3xl mb-4">
              Пакет «Максимум бренда»
            </div>
            <div>
              <div className="w-full flex items-center text-customGreyText mt-2">
                <div className="bg-customGreyText h-px w-5 mr-3" />
                Откройте пункт выдачи заказов от 30 кв. м с наружной вывеской в
                стиле Mpalce.
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-5">
            <div className="text-customPink text-md sm:text-xl group-hover:underline">
              Подробнее
            </div>
            <IoIosArrowForward className="text-2xl text-customGreyText group-hover:text-customPink" />
          </div>
        </div>
        {/*  */}
        <div className="w-full flex flex-col justify-between border-4 border-customBlue2 p-6 cursor-pointer group mt-8">
          <div>
            <div className="text-lg sm:text-3xl mb-4">
              Доставляйте заказы в качестве курьера
            </div>
          </div>
          <div className="flex justify-between items-center mt-5">
            <div className="text-customPink text-md sm:text-xl group-hover:underline">
              Подробнее про маркетплейс
            </div>
            <IoIosArrowForward className="text-2xl text-customGreyText group-hover:text-customPink" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
