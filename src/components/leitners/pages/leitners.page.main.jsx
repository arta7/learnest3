import React, { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { leitners_apiCalls } from "../../../core/services/agent";
import { apiCaller, useApi } from "../../../core/custom-hooks/useApi";
import { parse } from "query-string";
import LeitnerItem from "../components/leitnerItem/leitnerItem.component";
import LeitnerSetLevel from "../components/leitner-setLevel/leitnerSetLevel.component";
import LeitnerShowLevel from "../components/leitner-showLevel/leitnerShowLevel.component";
import { useLoadingContext } from "../../../core/contexts/loading/loading";
import "swiper/css";

const Leitner = (props) => {
  const [swiper, setSwiper] = useState();
  const [allowSwipe, set_allowSwipe] = useState(false);
  // const { responseData, isLoading } = useApi({
  //   api: leitners_apiCalls.apiCall_getAll,
  //   apiArguments: parse(window.location.search)?.isVocab,
  //   toastMessage: true,
  //   onErrorMessage: "دریافت آیتم های لایتنر با خطا مواجه شد .",
  // });
  const [responseData, set_responseData] = useState();
  const [isLoading, set_isLoading] = useState(false);
  const [leitnerItems, set_leitnerItems] = useState([]);
  const { handleClose, handleOpen } = useLoadingContext();

  const [box0, set_box0] = useState(0);
  const [box1, set_box1] = useState(0);
  const [box2, set_box2] = useState(0);
  const [box3, set_box3] = useState(0);
  const [box4, set_box4] = useState(0);

  const [itemsEnded, set_itemsEnded] = useState(false);

  const [currentItem, set_currentItem] = useState();

  const getData = async () => {
    apiCaller({
      api: leitners_apiCalls.apiCall_getAll,
      apiArguments: parse(window.location.search)?.isVocab,
      toastMessage: true,
      onErrorMessage: "دریافت آیتم های لایتنر با خطا مواجه شد .",
      onStart: () => {
        set_isLoading(true);
      },
      onEnd: () => {
        set_isLoading(false);
      },
      onSuccess: (resp) => {
        set_responseData(resp.data);
      },
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (responseData?.data?.length > 0) {
      const itemsThatShouldBeStudied = responseData?.data?.filter(
        (item) => item?.shouldStudyToday
      );

      set_currentItem(itemsThatShouldBeStudied[0]);
      set_leitnerItems(itemsThatShouldBeStudied);

      let bx0 = box0;
      let bx1 = box1;
      let bx2 = box2;
      let bx3 = box3;
      let bx4 = box4;

      itemsThatShouldBeStudied?.forEach((item) => {
        switch (item.box) {
          case 0:
            bx0 += 1;
            break;
          case 1:
            bx1 += 1;
            break;
          case 2:
            bx2 += 1;
            break;
          case 3:
            bx3 += 1;
            break;
          case 4:
            bx4 += 1;
            break;
        }
      });

      set_box0(bx0);
      set_box1(bx1);
      set_box2(bx2);
      set_box3(bx3);
      set_box4(bx4);
    }
  }, [responseData]);

  const handleSlideToNext = () => {
    set_allowSwipe(true);
  };
  useEffect(() => {
    if (allowSwipe) {
      if (
        leitnerItems[swiper.activeIndex].id !==
        leitnerItems[leitnerItems.length - 1].id
      ) {
        set_currentItem(leitnerItems[swiper.activeIndex + 1]);
      }
      swiper.slideNext();
      set_allowSwipe(false);
    }
  }, [allowSwipe]);

  const updateLiernerItem = async () => {
    handleOpen();
    const { data, status } = await apiCaller({
      api: leitners_apiCalls.apiCall_updateleitners,
      toastMessage: true,
      onErrorMessage: "آپدیت لایتنر با خطا مواجه شد . لطفا دوبار امتحان کنید .",
      apiArguments: {
        isVocab: parse(window.location.search)?.isVocab,
        items: [
          {
            leitnerId: currentItem?.id,
            box: currentItem?.box,
            isDoneToday: true,
          },
        ],
      },
    });

    if (status === 200 && data) {
      handleSlideToNext();
    }
    handleClose();
  };
  const handleSetLevel = (level) => {
    if (itemsEnded) return;
    // console.log(currentItem);

    const index = swiper?.activeIndex;

    const clonedLietnerItems = JSON.parse(JSON.stringify(leitnerItems));

    // if (index === leitnerItems?.length - 1) {
    //   return;
    // }

    if (currentItem.box + level > 4) {
      clonedLietnerItems[index].box = 4;
    } else if (currentItem.box + level < 0) {
      clonedLietnerItems[index].box = 0;
    } else {
      clonedLietnerItems[index].box = clonedLietnerItems[index].box + level;
    }

    if (
      (currentItem.box === 4 && level > 0) ||
      (currentItem.box === 0 && level < 0)
    ) {
      // console.log(currentItem);
      set_leitnerItems(clonedLietnerItems);
      updateLiernerItem();
      return;
    }
    // update boxes
    let bx0 = box0;
    let bx1 = box1;
    let bx2 = box2;
    let bx3 = box3;
    let bx4 = box4;

    switch (currentItem.box) {
      case 0:
        bx0 -= 1;
        break;
      case 1:
        bx1 -= 1;
        break;
      case 2:
        bx2 -= 1;
        break;
      case 3:
        bx3 -= 1;
        break;
      case 4:
        bx4 -= 1;
        break;
    }

    switch (clonedLietnerItems[index].box) {
      case 0:
        bx0 += 1;
        break;
      case 1:
        bx1 += 1;
        break;
      case 2:
        bx2 += 1;
        break;
      case 3:
        bx3 += 1;
        break;
      case 4:
        bx4 += 1;
        break;
    }

    set_box0(bx0);
    set_box1(bx1);
    set_box2(bx2);
    set_box3(bx3);
    set_box4(bx4);

    // update lietnerItems
    set_leitnerItems(clonedLietnerItems);

    updateLiernerItem();

    if (index === leitnerItems?.length - 1) {
      set_itemsEnded(true);
    }
  };

  const handleDeleteItem = async () => {
    handleOpen();
    const { data, status } = await apiCaller({
      api: leitners_apiCalls.apiCall_updateleitners,
      apiArguments: {
        isVocab: parse(window.location.search)?.isVocab,
        items: [
          {
            leitnerId: currentItem?.id,
            box: 5,
            isDoneToday: true,
          },
        ],
      },
      toastMessage: true,
      onErrorMessage: "حذف لایتنر با خطا مواجه شد . لطفا دوبار امتحان کنید .",
      onSuccessMessage: "حذف لایتنر با موفقیت انجام شد .",
      onSuccess: () => {
        set_box0(0);
        set_box1(0);
        set_box2(0);
        set_box3(0);
        set_box4(0);
        set_responseData(null);
        getData();
      },
    });

    handleClose();
  };

  return (
    <section className="m-0 p-0 ">
      {/* Show Level */}
      {leitnerItems?.length > 0 && !itemsEnded && (
        <LeitnerShowLevel
          box0={box0}
          box1={box1}
          box2={box2}
          box3={box3}
          box4={box4}
          classes="mx-auto mb-3"
          currentItemBox={currentItem?.box + 1}
          isLoading={isLoading}
        />
      )}
      {/* Show Cards */}
      <Swiper
        dir="ltr"
        onSwiper={setSwiper}
        allowSlideNext={allowSwipe}
        allowSlidePrev={false}
      >
        {leitnerItems?.length > 0 &&
          !itemsEnded &&
          leitnerItems?.map((item) => (
            <SwiperSlide key={item?.id}>
              <div className="py-3 pb-4 d-flex flex-row justify-content-center align-items-center">
                <LeitnerItem onDelete={handleDeleteItem} {...item} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Set Level */}
      {leitnerItems?.length > 0 && !itemsEnded && (
        <LeitnerSetLevel
          classes=" bg-white mt-3 "
          activeIndex={currentItem}
          onSetLevel={handleSetLevel}
        />
      )}

      {leitnerItems?.length > 0 && itemsEnded && (
        <div
          style={{
            height: "50vh",
          }}
          className="m-0 p-0 fs-5 w-100 text-success d-flex flex-column justify-content-center align-items-center"
        >
          لایتنر ها به پایان رسید.
        </div>
      )}

      {!isLoading && leitnerItems?.length === 0 && (
        <div
          style={{
            height: "50vh",
          }}
          className="m-0 p-0 fs-5 w-100 d-flex flex-column justify-content-center align-items-center"
        >
          لایتنری برای امروز موجود نیست.
        </div>
      )}
    </section>
  );
};

export default Leitner;
