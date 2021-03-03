import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserLanguage } from "../../redux/selectors/user";
import Link from "next/link";
import { strings } from "../../locales/strings";
import { makeFirstCapital } from "../../utils";

const Sidebar = ({ title, items, href, fontSize, index, language }) => {
  const [isHidden, showAll] = useState(true);
  const [hidden, hideAll] = useState("hidden");

  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  return (
    <>
      <ul className={index ? "mt-5" : ""}>
        <li
          className={`${
            fontSize !== "small"
              ? fontSize !== "medium"
                ? ""
                : "text-base"
              : "text-sm"
          }`}
        >
          {href ? (
            <Link href={href}>
              <a className="text-customDarkBlue font-bold mt-0.5 text-customBlue1-hover">
                {title}
              </a>
            </Link>
          ) : (
            <p className="text-customDarkBlue font-bold mt-0.5">{title}</p>
          )}
        </li>
        {items.map((item, index) => (
          <li
            key={index}
            className={`mt-1 ${
              fontSize !== "small"
                ? fontSize !== "medium"
                  ? ""
                  : "text-base"
                : "text-sm"
            }`}
          >
            <Link href={item.href}>
              <a
                className={`text-customLightBlack mt-0.5 text-customBlue1-hover ${
                  index > 3 ? hidden : ""
                }`}
              >
                {item.title}
              </a>
            </Link>
          </li>
        ))}
        {items.length > 4 ? (
          <li
            className={`mt-3 ${
              fontSize !== "small"
                ? fontSize !== "medium"
                  ? ""
                  : "text-base"
                : "text-sm"
            }`}
          >
            <span
              className="text-customBlue1 mt-0.5 cursor-pointer"
              onClick={() => {
                showAll(!isHidden);
                isHidden ? hideAll("") : hideAll("hidden");
              }}
            >
              {makeFirstCapital(isHidden ? strings.showAll : strings.hideAll)}
            </span>
          </li>
        ) : null}
      </ul>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  language: selectUserLanguage,
});

export default connect(mapStateToProps)(Sidebar);
