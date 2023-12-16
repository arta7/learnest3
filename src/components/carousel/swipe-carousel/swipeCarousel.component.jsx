import React, { useState, useEffect } from 'react';

export const SwipSlideItem = (props) => {

    return (
        <div

            className='swip-slider  '
            style={{
                width: "100%"
            }}
        >
            {props.children}
        </div>
    )
}
const SwipeCarousel = (props) => {


    const [activeIndex, set_activeIndex] = useState();
    const initialTransform = "tanslateX(0px)";
    
    useEffect(() => {
        if (responseData?.data?.length > 0) {
            set_activeIndex(responseData?.data[0]);
        }
    }, [responseData]);

    const [isSwiping, setSwiping] = useState(false);
    const [swipingDir, set_swipingDir] = useState();
    const [swipStartPoint, set_swipStartPoint] = useState(0);
    const [transform, set_transform] = useState(initialTransform);


    const handleMouseMove = e => {
        if (isSwiping) {
            if (e.pageX > swipStartPoint) {
                set_swipingDir("RIGHT");
                // set_transform("translateX(100%)");
            }
            else {
                set_swipingDir("LEFT");
                // set_transform("translateX(-100%)");
            }



        }
    };
    const handleTouchMove = e => {
        if (e.cancelable) {
            e.preventDefault();
        }
        if (isSwiping) {
            if (e.pageX > swipStartPoint) {
                set_swipingDir("RIGHT");
                // set_transform("translateX(100%)");
            }
            else {
                set_swipingDir("LEFT");
                // set_transform("translateX(-100%)");
            }


        }
    };
    const handleMouseDown = e => {
        e.preventDefault();
        set_swipStartPoint(e.pageX);
        setSwiping(true);
    };

    const handleTochStart = e => {
        if (e.cancelable)
            e.preventDefault();

        set_swipStartPoint(e.pageX);
        setSwiping(true);

    };
    const handleTochEnd = e => {
        if (e.cancelable) {
            e.preventDefault();
        }

        let indexx = responseData?.data.indexOf(activeIndex);

        if (swipingDir === "RIGHT") {
            if (indexx === 0) return;
            set_transform("translateX(-" + ((indexx - 1) * 20) + "%)");
        }
        if (swipingDir === "LEFT") {

            if (indexx + 1 === responseData?.data?.length) return;
            set_transform("translateX(-" + ((indexx + 1) * 20) + "%)");
        }

        setTimeout(() => {
            if (e.pageX > swipStartPoint) {
                let index = responseData?.data.indexOf(activeIndex) - 1;

                set_activeIndex(responseData?.data[index]);
            }
            else {
                let index = responseData?.data.indexOf(activeIndex) + 1;

                set_activeIndex(responseData?.data[index]);
            }

            setSwiping(false);
            // set_transform(initialTransform);

        }, 500);
    };
    const handleMouseUp = e => {
        e?.preventDefault();

        let indexx = responseData?.data.indexOf(activeIndex);

        if (swipingDir === "RIGHT") {
            if (indexx === 0) return;
            set_transform("translateX(-" + ((indexx - 1) * 20) + "%)");
        }
        if (swipingDir === "LEFT") {

            if (indexx + 1 === responseData?.data?.length) return;
            set_transform("translateX(-" + ((indexx + 1) * 20) + "%)");
        }

        setTimeout(() => {
            if (e.pageX > swipStartPoint) {
                let index = responseData?.data.indexOf(activeIndex) - 1;

                set_activeIndex(responseData?.data[index]);
            }
            else {
                let index = responseData?.data.indexOf(activeIndex) + 1;

                set_activeIndex(responseData?.data[index]);
            }

            setSwiping(false);
            // set_transform(initialTransform);

        }, 500);
    };



    return (
        <section dir='ltr' className='m-0 p-0 '>
            <div
                className="swip-wrapper"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTochStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTochEnd}
                style={{
                    position: "relative",
                    width: "100%"
                }}
            >
                <div
                    style={{
                        transition: ".5s",
                        transform: transform,
                        position: "absolute",
                        top: "0",
                        width: (responseData?.data?.length) * 100 + "%"
                    }}
                    className='swip-container d-flex flex-row justify-content-start align-items-stretch m-0 p-0 overflow-hidden'>
                    {
                        props.children
                    }
                </div>
            </div>
        </section>
    );
}

export default SwipeCarousel;