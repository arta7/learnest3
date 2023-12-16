import React, { useState, useEffect } from "react";
import DetailCardItem from "./components/DetailCardItem";

const CourseDetailCards = (props) => {
  const [vocabularies, set_vocabularies] = useState([]);
  const [grammar, set_grammar] = useState([]);
  const [speaking, set_speaking] = useState([]);
  const [listening, set_listening] = useState([]);
  const [conversation, set_conversation] = useState([]);
  const [reading, set_reading] = useState([]);
  const [faq, set_faq] = useState([]);

  useEffect(() => {
    if (props?.sessionsData?.sessionParts?.length > 0) {
      seprateSessions();
    }
  }, [props?.sessionsData]);

  const seprateSessions = () => {
    const vocabs = [];
    const gramm = [];
    const speakin = [];
    const listenin = [];
    const conversatio = [];
    const readin = [];
    const faqs = [];

    props?.sessionsData?.sessionParts?.forEach((it) => {
      if (it?.type === 0) {
        vocabs.push(it);
      }
      if (it?.type === 1) {
        gramm.push(it);
      }
      if (it?.type === 2) {
        speakin.push(it);
      }
      if (it?.type === 3) {
        listenin.push(it);
      }
      if (it?.type === 4) {
        conversatio.push(it);
      }
      if (it?.type === 5) {
        readin.push(it);
      }
      if (it?.type === 6) {
        faqs.push(it);
      }
    });

    set_vocabularies(vocabs);
    set_grammar(gramm);
    set_speaking(speakin);
    set_listening(listenin);
    set_conversation(conversatio);
    set_reading(readin);
    set_faq(faqs);
  };

  // console.log(grammar); ==> hasLesson
  // console.log("faq", faq);

  const getTitle = (type) => {
    if (type === 0) {
      return "Vocabularies";
    }
    if (type === 1) {
      return "grammars";
    }
    if (type === 2) {
      return "speakings";
    }
    if (type === 3) {
      return "listenings";
    }
    if (type === 4) {
      return "conversations";
    }
    if (type === 5) {
      return "readings";
    }
    if (type === 6) {
      return "faq";
    }
  };

  return (
    <>
      <section className="w-100 d-flex justify-content-center align-items-center mt-2 ">
        <div
          dir="ltr"
          className="w-100 d-flex flex-wrap justify-content-between align-items-center"
        >
          {props?.sessionsData?.sessionParts?.length > 0 &&
            props?.sessionsData?.sessionParts?.map((item, index) => (
              <DetailCardItem
                key={item?.id}
                data={[item]}
                title={getTitle(item?.type)}
                cardIndex={index}
              />
            ))}
          {/* {vocabularies?.length >= 1 && (
            <DetailCardItem data={vocabularies} title="Vocabularies" />
          )}
          {grammar?.length >= 1 && (
            <DetailCardItem data={grammar} title="grammars" />
          )}
          {speaking?.length >= 1 && (
            <DetailCardItem data={speaking} title="speakings" />
          )}
          {listening?.length >= 1 && (
            <DetailCardItem data={listening} title="listenings" />
          )}
          {conversation?.length >= 1 && (
            <DetailCardItem data={conversation} title="conversations" />
          )}
          {reading?.length >= 1 && (
            <DetailCardItem data={reading} title="readings" />
          )}
          {faq?.length >= 1 && <DetailCardItem data={faq} title="faq" />} */}
        </div>
      </section>
    </>
  );
};

export default CourseDetailCards;
