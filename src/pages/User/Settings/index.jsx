import React from "react";

import { strings } from "../../../locales/strings";
import { makeFirstCapital } from "../../../utils";

let text =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor exercitationem iure itaque aliquam debitis dolores ipsam odio asperiores. Fuga adipisci est quas in magni rerum repellendus, voluptatem odit quidem molestias accusamus? Obcaecati totam cum provident facilis aspernatur, doloremque mollitia, sit officiis enim nam quae recusandae repudiandae similique earum esse tenetur.";

const UserSettingsPage = () => {
  return (
    <div>
      <div>{makeFirstCapital(strings.greeting)}</div>
      <p className="bg-blue-300">{text}</p>
      <p>{text}</p>
      <p>{text}</p>
    </div>
  );
};

export default UserSettingsPage;
