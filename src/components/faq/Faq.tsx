import React, {useCallback, useState} from "react";
import {faqs} from "./faqs";
import {nanoid} from "nanoid";
import {isMobile} from "react-device-detect";
import "./faq.scss"
import { CCollapse, CCard, CCardBody } from '@coreui/react'

export default () => {
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);

  const toggleOpened = useCallback((index: number) => {
    if (openedIndex !== index) setOpenedIndex(index);
    else setOpenedIndex(null);
  }, [openedIndex]);

  return (<div className="faq">
    {faqs.map((entry: any, index: number) => <div key={nanoid()} className={`faq-item ${isMobile ? "mobile" : "desktop"} ${index === openedIndex ? "active" : ""}`}>
      <h5 onClick={() => toggleOpened(index)}>{entry.question}</h5>
      <CCollapse visible={index === openedIndex}>
        <CCard className="mt-3">
          <CCardBody>
            {entry.answer}
          </CCardBody>
        </CCard>
      </CCollapse>

    </div>)}
  </div>)
}