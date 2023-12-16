import { Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import FreeSlider from "../../../components/freeSlider/freeSlider.component";
import { useApi } from "../../../core/custom-hooks/useApi";
import { extra_apiCalls } from "../../../core/services/agent";
import ExtraType1 from "./components/extraType1/extraType1.component";
import ExtraType2 from "./components/extraType2/extraType2.component";
import gemIcon from "../../../assets/img/icons/jem.png";

const ExtraSkeleton = ({ type = 1, title }) => {
  const renderSkeletonItem = ({ type }) => {
    if (type === 1) {
      return (
        <div
          style={{
            boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
            width: "300px",
            height: "187px",
          }}
          className="m-0 p-2 box-rounded-1 d-flex flex-column justify-content-start align-items-stretch"
        >
          <div className="m-0 p-0 mb-2 d-flex justify-content-center align-items-center">
            <Skeleton
              className=" "
              variant="rectangular"
              width={40}
              height={20}
              style={{
                borderRadius: ".3rem",
              }}
            />
            <img
              style={{
                width: "30px",
                height: "30px",
              }}
              alt="..."
              src={gemIcon}
              className="mx-1 noselect"
            />
          </div>
          <Skeleton
            className="my-2 align-self-center"
            variant="rectangular"
            width={270}
            height={120}
            style={{
              borderRadius: ".8rem",
            }}
          />
          <div className=" m-0 p-0 mt-auto d-flex flex-row justify-content-between align-items-baseline">
            <Skeleton
              className=" "
              variant="rectangular"
              width={70}
              height={20}
              style={{
                borderRadius: ".3rem",
              }}
            />
            <span
              className="m-0 p-0 bg-main-color-1 p-1 "
              style={{
                borderRadius: ".3rem",
              }}
            >
              <Skeleton
                className=" "
                variant="rectangular"
                width={50}
                height={20}
                style={{
                  borderRadius: ".3rem",
                }}
              />
            </span>
          </div>
        </div>
      );
    }
    if (type === 2) {
      return (
        <div
          dir="rtl"
          style={{
            boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
            width: "350px",
            height: "127px",
          }}
          className="m-0 m-0 p-0 shadow box-rounded-1 cursor-pointer d-flex flex-row justify-content-start align-items-stretch"
        >
          <div className="m-0 p-2 col-2 d-flex flex-column justify-content-center align-items-center">
            <div className="m-0 ps-2 p-0 d-flex justify-content-center align-items-center">
              <Skeleton
                className=" "
                variant="rectangular"
                width={20}
                height={20}
                style={{
                  borderRadius: ".3rem",
                }}
              />
              <img
                style={{
                  width: "30px",
                  height: "30px",
                }}
                alt="..."
                src={gemIcon}
                className="mx-1 noselect"
              />
            </div>
          </div>
          <div className="m-0 p-2 col-4 d-flex flex-column justify-content-center align-items-center">
            <Skeleton
              variant="rectangular"
              className="box-rounded-1 align-self-center noselect"
              width={76}
              height={76}
            />
          </div>
          <div className="m-0 p-0 pt-2 col-6 d-flex flex-column justify-content-center align-items-center">
            <Skeleton
              className="align-self-end me-2"
              variant="rectangular"
              width={100}
              height={20}
              style={{
                borderRadius: ".3rem",
              }}
            />
            <span
              style={{ borderRadius: "0 .5rem", width: "80px" }}
              className={
                " bg-main-color-1 align-self-end mt-auto p-1 d-flex flex-row justify-content-center align-items-center"
              }
            >
              <Skeleton
                className=""
                variant="rectangular"
                width={80}
                height={20}
              />
            </span>
          </div>
        </div>
      );
    }

    return <></>;
  };

  return (
    <div className="m-0 mb-3 p-0 d-flex flex-column justify-content-start align-items-stretch">
      <h3 dir="rtl">{title}</h3>
      <FreeSlider>
        {renderSkeletonItem({ type })}
        {renderSkeletonItem({ type })}
        {renderSkeletonItem({ type })}
      </FreeSlider>
    </div>
  );
};

const ExtraSection = ({ type, className, data, title, item: Item }) => {
  return (
    <section
      className={
        className +
        " m-0 mb-3 d-flex flex-column justify-content-center align-items-stretch"
      }
    >
      <h3 dir="rtl">{title}</h3>
      <FreeSlider>
        {type !== "crossword" &&
          data?.length > 0 &&
          data?.map((item) => <Item type={type} key={item.id} {...item} />)}
        {type === "crossword" &&
          data?.length > 0 &&
          data?.map((item, index) => (
            <Item
              type={type}
              key={item.id}
              allTabelsIds={data.map((item) => parseInt(item.id))}
              {...item}
            />
          ))}
      </FreeSlider>
    </section>
  );
};

const ExtraIndexPage = (props) => {
  const { responseData: extraResp, isLoading } = useApi({
    api: extra_apiCalls.apiCall_getAll,
  });
  const [extraData, set_extraData] = useState();

  useEffect(() => {
    if (extraResp?.data) {
      set_extraData(extraResp?.data);
    }
  }, [extraResp]);

  return (
    <section className="m-0 p-3 tiny-scrollbar w-100">
      {!extraResp && (
        <div className="w-100 m-0 p-0 d-flex flex-column justify-content-start align-items-stretch">
          <ExtraSkeleton type={1} title="ویدیو های how to" />
          <ExtraSkeleton type={1} title={"موزیک ویدیو "} />
          <ExtraSkeleton type={1} title={"پادکست"} />
          <ExtraSkeleton type={2} title="مجله" />
          <ExtraSkeleton type={2} title={"لغات تصویری"} />
          <ExtraSkeleton type={1} title={"ویدیو های آموزشی"} />
        </div>
      )}
      {extraResp && (
        <>
          <ExtraSection
            className="my-3"
            title={"ویدیوهای how to"}
            data={extraData?.educationalVideo}
            item={ExtraType1}
            type="educationalVideo"
          />
          <ExtraSection
            className="my-4"
            title={"داستان صوتی"}
            data={extraData?.audioStory}
            item={ExtraType1}
            type="audioStory"
          />
          <ExtraSection
            className="my-4"
            title={"موزیک ویدیو "}
            data={extraData?.musicVideo}
            item={ExtraType1}
            type="musicVideo"
          />
          <ExtraSection
            className="my-4"
            title={"پادکست"}
            data={extraData?.podcast}
            item={ExtraType1}
            type="podcast"
          />
          <ExtraSection
            className="my-4"
            title={"مجله"}
            data={extraData?.magazine}
            item={ExtraType2}
            type="magazine"
          />
          <ExtraSection
            className="my-4"
            title={"لغات تصویری"}
            data={extraData?.photoDictionary}
            item={ExtraType2}
            type="vocab"
          />
          <ExtraSection
            className="my-4"
            title={"ویدیو های آموزشی"}
            data={extraData?.videoClip}
            item={ExtraType1}
            type="videoClip"
          />
          <ExtraSection
            type="crossword"
            className="my-4 mb-6"
            title={"جدول"}
            data={extraData?.crossWord}
            item={ExtraType1}
          />
        </>
      )}
    </section>
  );
};

export default ExtraIndexPage;
