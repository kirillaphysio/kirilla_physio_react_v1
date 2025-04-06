import React from "react";
import {isMobile} from "react-device-detect";
import "./faq.scss"
import { useCollapse } from "react-collapsed";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

export default (props: any) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return <div className={`faq-item ${isMobile ? "mobile" : "desktop"}`}>
    <h5 {...getToggleProps()}><FontAwesomeIcon className={isExpanded ? "expanded" : "collapsed"} icon={faChevronDown} />{props.entry.question}</h5>
    <section {...getCollapseProps()}>{props.entry.answer}</section>
  </div>
}