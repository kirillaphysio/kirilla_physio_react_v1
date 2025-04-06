import React, {useCallback, useState} from "react";
import {faqs} from "./faqs";
import {nanoid} from "nanoid";
import {isMobile} from "react-device-detect";
import "./faq.scss"
import FaqItem from "./FaqItem";

export default () => {
  return (<div className="faq">
    {faqs.map((entry: any, index: number) => <FaqItem key={nanoid()} entry={entry} />)}
  </div>)
}