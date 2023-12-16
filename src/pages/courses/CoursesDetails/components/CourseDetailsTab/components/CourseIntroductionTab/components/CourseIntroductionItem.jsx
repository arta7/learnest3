import React from "react";
import parse from "html-react-parser";

import defImg from "../../../../../../../../assets/img/babak-images/english-image.png";
import "./style/style.css";
import { fileBaseUrl } from "../../../../../../../../core/services/baseUrl";

const CourseIntroductionItem = (props) => {
  const data = props.data;

  return (
    <div className="p-0 m-0 d-flex flex-column w-100 my-2 rounded">
      {props?.data?.videoUrl && (
        <div className="m-0 my-3 p-0">
          <video controls className="w-100">
            <source src={fileBaseUrl + props?.data?.videoUrl} />
          </video>
        </div>
      )}
      <div className="m-0 p-0">
        {parse(
          data?.description?.toString()?.replaceAll("<p>", '<p dir="auto">') ||
            ""
        )}
      </div>
      {/* <div>
        <ul className="badge-holder">
          {data?.tags !== null ? (
            data?.tags.map((it) => {
              <>
                <li className="adults">بزرگسالان</li>
              </>;
            })
          ) : (
            <>
              <li className="adults">بزرگسالان</li>
              <li className="childs">کودکان</li>
            </>
          )}
        </ul>
      </div> */}
    </div>
  );
};

export default CourseIntroductionItem;
