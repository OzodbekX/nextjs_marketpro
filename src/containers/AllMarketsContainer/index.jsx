import Market from "../../components/Market";
import { strings } from "../../locales/strings";
import { makeFirstCapital } from "../../utils";
import { useRouter } from "next/router";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const AllMarketsContainer = ({ items, count }) => {
  const router = useRouter();

  const xsm = useMediaQuery(420);

  return (
    <>
      <div className={"mt-12 flex flex-row items-center mb-6"}>
        <div className="cursor-pointer text-2xl font-bold text-customDarkBlue text-customBlue2-hover">
          {makeFirstCapital(strings.allMarket)}
        </div>
        {!router.asPath.includes("seller") ? (
          <div
            className={
              "mt-2 ml-2 cursor-pointer text-sm font-medium text-customBlue1"
            }
            onClick={() => router.push("/seller")}
          >
            {makeFirstCapital(strings.seeAll)}
          </div>
        ) : null}
      </div>
      <div
        className={`grid gap-6 m-auto ${
          xsm ? "grid-cols-1" : "grid-cols-2"
        } sm:grid-cols-2 lg:grid-cols-4`}
      >
        {items.map((item, index) =>
          count ? (
            index < count && (
              <div
                onClick={() => router.push(`/seller/${item.slug}`)}
                key={index}
              >
                <Market {...item} />
              </div>
            )
          ) : (
            <div
              onClick={() => router.push(`/seller/${item.slug}`)}
              key={index}
            >
              <Market {...item} />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default AllMarketsContainer;
