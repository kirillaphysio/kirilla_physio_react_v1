import React from "react";
import {faqs} from "./faqs";
import {nanoid} from "nanoid";
import "./faq.scss"
import FaqItem from "./FaqItem";

const Faq = () => {
  return (<div className="faq">
    {faqs.map((entry: any, index: number) => <FaqItem key={nanoid()} entry={entry} />)}
  </div>)
}

export default Faq;